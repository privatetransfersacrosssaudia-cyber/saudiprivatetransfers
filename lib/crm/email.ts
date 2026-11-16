import "server-only";

import type { Locale } from "@/lib/i18n/config";
import { site } from "@/lib/site";

import { emailConfig } from "./config";
import { db } from "./supabase";
import type { Invoice, Lead, Quotation } from "./types";

/**
 * Transactional email.
 *
 * Sent over Resend's REST API with `fetch` rather than through its SDK. The
 * SDK's only job here would be one POST, and it has a trap worth avoiding: it
 * resolves with `{ data, error }` instead of rejecting, so a provider error
 * passes for success unless the caller remembers to inspect `error`. Calling
 * the API directly makes the status code the thing we check, and leaves the
 * provider swappable — `send()` is the only function that knows which service
 * this is.
 *
 * The API key is read from the environment inside this server-only module, so
 * it cannot reach a client bundle.
 *
 * Every send is written to `email_logs`, including failures and sends skipped
 * because email is not configured. A silent failure is the one outcome that
 * must not be possible: "the customer says they never got it" has to be
 * answerable from the lead's own screen.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export type SendOutcome =
  | { status: "sent"; providerId: string | null }
  | { status: "skipped"; reason: string }
  | { status: "failed"; error: string };

interface SendArgs {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
  /** Which template this was, for the log. */
  template: string;
  /** Attaches the log entry to a lead when there is one. */
  leadId?: string | null;
}

function recipients(to: string | string[]): string[] {
  return (Array.isArray(to) ? to : [to]).map((value) => value.trim()).filter(Boolean);
}

/**
 * Sends one email and records the outcome.
 *
 * Never throws. Callers decide what a failure means for them — a lead must
 * still be saved when its notification cannot be sent, while an operator
 * pressing "send" deserves to be told it did not work. Both read the returned
 * status rather than relying on an exception.
 */
export async function send(args: SendArgs): Promise<SendOutcome> {
  const config = emailConfig();
  const to = recipients(args.to);

  if (to.length === 0) {
    const outcome: SendOutcome = { status: "skipped", reason: "No recipient address." };
    await logEmail(args, outcome, "");
    return outcome;
  }

  if (!config.configured) {
    const outcome: SendOutcome = {
      status: "skipped",
      reason: "Email is not configured (RESEND_API_KEY and CRM_EMAIL_FROM).",
    };
    await logEmail(args, outcome, to.join(", "));
    return outcome;
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to,
        subject: args.subject,
        html: args.html,
        ...(args.replyTo || config.replyTo
          ? { reply_to: args.replyTo ?? config.replyTo }
          : {}),
      }),
      // A provider that stops answering must not hold the request open.
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      // The provider's message names the cause — most often an unverified
      // sending domain — so it is worth keeping in the log for the operator.
      const detail = await response.text().catch(() => "");
      const outcome: SendOutcome = {
        status: "failed",
        error: `Provider responded ${response.status}. ${detail.slice(0, 500)}`.trim(),
      };
      await logEmail(args, outcome, to.join(", "));
      return outcome;
    }

    const payload = (await response.json().catch(() => null)) as { id?: string } | null;
    const outcome: SendOutcome = { status: "sent", providerId: payload?.id ?? null };
    await logEmail(args, outcome, to.join(", "));
    return outcome;
  } catch (error) {
    const outcome: SendOutcome = {
      status: "failed",
      error: error instanceof Error ? error.message : "Unknown send error.",
    };
    await logEmail(args, outcome, to.join(", "));
    return outcome;
  }
}

/** Writes the log row. Swallows its own errors so logging cannot break sending. */
async function logEmail(
  args: SendArgs,
  outcome: SendOutcome,
  sentTo: string
): Promise<void> {
  try {
    await db()
      .from("email_logs")
      .insert({
        lead_id: args.leadId ?? null,
        template: args.template,
        subject: args.subject,
        sent_to: sentTo || "(none)",
        // The rendered HTML is kept so a dispute can be settled by looking at
        // what was actually sent, not at what the template produces today.
        body: args.html.slice(0, 100_000),
        status: outcome.status,
        provider_id: outcome.status === "sent" ? outcome.providerId : null,
        error:
          outcome.status === "failed"
            ? outcome.error
            : outcome.status === "skipped"
              ? outcome.reason
              : null,
      });
  } catch {
    // Deliberately quiet: there is nowhere better to put this, and a failed
    // log must not turn a sent email into a reported failure.
  }
}

// --- Rendering --------------------------------------------------------------

const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Escapes a value for HTML. Every interpolated value goes through this. */
function esc(value: unknown): string {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ESCAPES[character]);
}

type Copy = Record<Locale, string>;

const t = (copy: Copy, locale: Locale) => copy[locale];

/**
 * The email wrapper.
 *
 * Table-based with inline styles, because mail clients remain hostile to
 * anything else. Two details earn their place: a `viewport` meta, without
 * which mobile clients render at desktop width and force pinch-zoom, and
 * `dir="rtl"` plus `text-align:right` for Arabic, so an Arabic enquiry is
 * answered in a correctly laid-out Arabic email rather than reversed text in a
 * left-aligned frame.
 *
 * Colours are literal hex rather than the site's `oklch` tokens: mail clients
 * do not support `oklch`, and a colour no client can parse is a colour that
 * does not render. They are the brand palette converted, not a second palette.
 */
function shell({
  title,
  locale,
  body,
  preheader,
}: {
  title: string;
  locale: Locale;
  body: string;
  preheader?: string;
}): string {
  const rtl = locale === "ar";
  const align = rtl ? "right" : "left";
  const font = rtl
    ? "'Segoe UI', Tahoma, Arial, sans-serif"
    : "'Segoe UI', Arial, Helvetica, sans-serif";

  return `<!DOCTYPE html>
<html lang="${locale}" dir="${rtl ? "rtl" : "ltr"}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(title)}</title>
<style>
  @media only screen and (max-width: 600px) {
    .wrap { width: 100% !important; border-radius: 0 !important; }
    .pad { padding: 20px !important; }
    .rows td { display: block !important; width: 100% !important; padding: 2px 0 !important; }
    .rows .key { color: #6b7280 !important; font-size: 12px !important; padding-top: 10px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#f4f1ea;font-family:${font};text-align:${align}">
${
  preheader
    ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</div>`
    : ""
}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f1ea;padding:24px 12px">
  <tr><td align="center">
    <table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e4ded1">
      <tr>
        <td style="background:#1d4034;padding:22px 28px" align="${align}">
          <div style="font-size:18px;font-weight:700;color:#ffffff;letter-spacing:0.2px">${esc(site.name)}</div>
          <div style="font-size:12px;color:#c9a227;padding-top:4px">${esc(
            t(
              {
                en: "Private transfers across Saudi Arabia",
                ar: "نقل خاص في جميع أنحاء المملكة العربية السعودية",
              },
              locale
            )
          )}</div>
        </td>
      </tr>
      <tr>
        <td class="pad" style="padding:28px" align="${align}">
          <h1 style="margin:0 0 14px;font-size:20px;line-height:1.35;color:#16271f;font-weight:700">${esc(title)}</h1>
          ${body}
        </td>
      </tr>
      <tr>
        <td style="padding:16px 28px;background:#f4f1ea;color:#6b7280;font-size:12px;line-height:1.6" align="${align}">
          ${esc(site.name)}${site.url && !site.url.includes("localhost") ? ` &middot; ${esc(site.url.replace(/^https?:\/\//, ""))}` : ""}
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

const paragraph = (text: string, align: string) =>
  `<p style="margin:0 0 14px;color:#374151;font-size:15px;line-height:1.65;text-align:${align}">${esc(text)}</p>`;

/** A two-column detail table. Rows with no value are dropped, not left blank. */
function detailRows(rows: [string, string | null | undefined][], locale: Locale): string {
  const align = locale === "ar" ? "right" : "left";
  const cells = rows
    .filter(([, value]) => Boolean(value && String(value).trim()))
    .map(
      ([key, value]) =>
        `<tr>
          <td class="key" style="padding:7px 0;color:#6b7280;font-size:13px;vertical-align:top;width:38%;text-align:${align}">${esc(key)}</td>
          <td style="padding:7px 0;color:#16271f;font-size:14px;font-weight:600;word-break:break-word;text-align:${align}">${esc(value)}</td>
        </tr>`
    )
    .join("");

  if (!cells) return "";
  return `<table role="presentation" class="rows" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;border-top:1px solid #e9e4d8;margin:4px 0 8px">${cells}</table>`;
}

function referenceBadge(reference: string, locale: Locale): string {
  const label = t({ en: "Your reference", ar: "الرقم المرجعي" }, locale);
  return `<div style="margin:0 0 18px;padding:12px 16px;background:#f1f6f3;border-radius:10px">
    <div style="font-size:12px;color:#4b6b5c">${esc(label)}</div>
    <div style="font-size:18px;font-weight:700;color:#1d4034;letter-spacing:1px;direction:ltr;unicode-bidi:embed">${esc(reference)}</div>
  </div>`;
}

function money(amount: number, currency: string): string {
  return `${currency} ${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

// --- Journey fields, in the reader's language ------------------------------

function journeyRows(
  lead: Pick<
    Lead,
    | "serviceType"
    | "pickupLocation"
    | "dropoffLocation"
    | "date"
    | "time"
    | "passengers"
    | "luggage"
    | "vehicleType"
    | "flightNumber"
    | "message"
  >,
  locale: Locale
): [string, string | null | undefined][] {
  const label = (en: string, ar: string) => t({ en, ar }, locale);
  return [
    [label("Service", "الخدمة"), lead.serviceType],
    [label("Pick-up", "نقطة الانطلاق"), lead.pickupLocation],
    [label("Destination", "الوجهة"), lead.dropoffLocation],
    [label("Date", "التاريخ"), lead.date],
    [label("Time", "الوقت"), lead.time],
    [label("Passengers", "عدد المسافرين"), lead.passengers],
    [label("Luggage", "عدد الحقائب"), lead.luggage],
    [label("Vehicle", "نوع المركبة"), lead.vehicleType],
    [label("Flight number", "رقم الرحلة"), lead.flightNumber],
    [label("Notes", "ملاحظات"), lead.message],
  ];
}

// --- Templates --------------------------------------------------------------

/**
 * The internal notification for a new enquiry.
 *
 * Always in English regardless of the enquiry's language: it goes to the team,
 * not the customer. The enquiry's own language is stated as a field so whoever
 * picks it up knows which language to reply in.
 */
export function newEnquiryForTeam(lead: Lead): { subject: string; html: string } {
  const subject = `New enquiry ${lead.reference} — ${lead.pickupLocation ?? "?"} to ${lead.dropoffLocation ?? "?"}`;

  const body = [
    paragraph(
      `A new enquiry arrived on ${new Date(lead.createdAt).toUTCString()}.`,
      "left"
    ),
    referenceBadge(lead.reference, "en"),
    detailRows(
      [
        ["Name", lead.fullName],
        ["Email", lead.email],
        ["Phone / WhatsApp", lead.phone],
        ["Language", lead.locale === "ar" ? "Arabic — reply in Arabic" : "English"],
        ...journeyRows(lead, "en"),
        ["Submitted from", lead.sourcePage],
        ["Source", lead.source],
      ],
      "en"
    ),
    paragraph("Open the enquiry in the CRM to reply, assign it or add a note.", "left"),
  ].join("");

  return { subject, html: shell({ title: "New enquiry received", locale: "en", body }) };
}

/**
 * The customer's acknowledgement.
 *
 * Written in the language the enquiry was made in. It confirms what we
 * received and commits to nothing we cannot keep: no price, no vehicle, no
 * response time, and no claim that the journey is booked.
 */
export function enquiryAcknowledgement(lead: Lead): { subject: string; html: string } {
  const locale = lead.locale;
  const align = locale === "ar" ? "right" : "left";

  const subject = t(
    {
      en: `We have your enquiry — ${lead.reference}`,
      ar: `استلمنا طلبك — ${lead.reference}`,
    },
    locale
  );

  const greeting = lead.fullName
    ? t(
        { en: `Dear ${lead.fullName},`, ar: `عزيزنا ${lead.fullName}،` },
        locale
      )
    : t({ en: "Hello,", ar: "مرحبًا،" }, locale);

  const body = [
    paragraph(greeting, align),
    paragraph(
      t(
        {
          en: "Thank you for contacting us. Your journey details have reached our team and we will come back to you with availability and a quotation.",
          ar: "شكرًا لتواصلك معنا. وصلت تفاصيل رحلتك إلى فريقنا، وسنعاود الاتصال بك بشأن التوافر وعرض السعر.",
        },
        locale
      ),
      align
    ),
    referenceBadge(lead.reference, locale),
    paragraph(
      t(
        { en: "Here is what you sent us:", ar: "هذه هي التفاصيل التي أرسلتها لنا:" },
        locale
      ),
      align
    ),
    // The internal source page and attribution are not shown to the customer.
    detailRows(journeyRows(lead, locale), locale),
    paragraph(
      t(
        {
          en: "If anything above is wrong, reply to this email with the correction and quote your reference.",
          ar: "إذا كان أي مما ورد أعلاه غير صحيح، فيُرجى الرد على هذه الرسالة بالتصحيح مع ذكر رقمك المرجعي.",
        },
        locale
      ),
      align
    ),
    paragraph(
      t(
        {
          en: "This message confirms that we received your enquiry. It is not a booking confirmation.",
          ar: "تؤكد هذه الرسالة استلامنا لطلبك، وهي ليست تأكيدًا للحجز.",
        },
        locale
      ),
      align
    ),
  ].join("");

  return {
    subject,
    html: shell({
      title: t(
        { en: "We received your enquiry", ar: "لقد استلمنا طلبك" },
        locale
      ),
      locale,
      body,
      preheader: t(
        { en: `Reference ${lead.reference}`, ar: `الرقم المرجعي ${lead.reference}` },
        locale
      ),
    }),
  };
}

/** A message an operator typed in the CRM. Plain text, newlines preserved. */
export function customMessage(
  subject: string,
  message: string,
  locale: Locale,
  reference?: string
): string {
  const align = locale === "ar" ? "right" : "left";
  const body = [
    reference ? referenceBadge(reference, locale) : "",
    `<div style="color:#374151;font-size:15px;line-height:1.7;text-align:${align}">${esc(
      message
    ).replace(/\n/g, "<br />")}</div>`,
  ].join("");

  return shell({ title: subject, locale, body });
}

function lineItemsTable(
  items: { description: string; amount: number }[],
  currency: string,
  total: number,
  locale: Locale
): string {
  const align = locale === "ar" ? "right" : "left";
  const opposite = locale === "ar" ? "left" : "right";
  const header = t({ en: "Description", ar: "الوصف" }, locale);
  const amountLabel = t({ en: "Amount", ar: "المبلغ" }, locale);
  const totalLabel = t({ en: "Total", ar: "الإجمالي" }, locale);

  const rows = items
    .map(
      (item) =>
        `<tr>
          <td style="padding:9px 0;border-top:1px solid #e9e4d8;color:#16271f;font-size:14px;text-align:${align}">${esc(item.description)}</td>
          <td style="padding:9px 0;border-top:1px solid #e9e4d8;color:#16271f;font-size:14px;font-weight:600;white-space:nowrap;text-align:${opposite}">${esc(
            money(Number(item.amount) || 0, currency)
          )}</td>
        </tr>`
    )
    .join("");

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;margin:8px 0 16px">
    <tr>
      <td style="padding:0 0 6px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.4px;text-align:${align}">${esc(header)}</td>
      <td style="padding:0 0 6px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.4px;text-align:${opposite}">${esc(amountLabel)}</td>
    </tr>
    ${rows}
    <tr>
      <td style="padding:12px 0 0;border-top:2px solid #1d4034;color:#16271f;font-size:15px;font-weight:700;text-align:${align}">${esc(totalLabel)}</td>
      <td style="padding:12px 0 0;border-top:2px solid #1d4034;color:#1d4034;font-size:17px;font-weight:700;white-space:nowrap;text-align:${opposite}">${esc(
        money(total, currency)
      )}</td>
    </tr>
  </table>`;
}

function button(label: string, href: string, align: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:6px 0 18px"><tr><td align="${align}" bgcolor="#1d4034" style="border-radius:10px">
    <a href="${esc(href)}" style="display:inline-block;padding:12px 22px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:10px">${esc(label)}</a>
  </td></tr></table>`;
}

export function quotationReady(
  quotation: Quotation,
  viewUrl: string
): { subject: string; html: string } {
  const locale = quotation.locale;
  const align = locale === "ar" ? "right" : "left";

  const subject = t(
    {
      en: `Your quotation ${quotation.quoteNumber}`,
      ar: `عرض السعر الخاص بك ${quotation.quoteNumber}`,
    },
    locale
  );

  const body = [
    paragraph(
      quotation.clientName
        ? t(
            { en: `Dear ${quotation.clientName},`, ar: `عزيزنا ${quotation.clientName}،` },
            locale
          )
        : t({ en: "Hello,", ar: "مرحبًا،" }, locale),
      align
    ),
    paragraph(
      t(
        {
          en: "Your quotation for the journey below is ready. You can review it and accept or decline it online.",
          ar: "عرض السعر للرحلة الموضحة أدناه جاهز. يمكنك مراجعته وقبوله أو رفضه عبر الإنترنت.",
        },
        locale
      ),
      align
    ),
    detailRows(journeyRows({ ...quotation, message: quotation.specialRequests }, locale), locale),
    lineItemsTable(quotation.lineItems, quotation.currency, quotation.totalAmount, locale),
    button(t({ en: "View quotation", ar: "عرض السعر" }, locale), viewUrl, align),
    quotation.validUntil
      ? paragraph(
          t(
            {
              en: `This quotation is valid until ${quotation.validUntil}.`,
              ar: `هذا العرض صالح حتى ${quotation.validUntil}.`,
            },
            locale
          ),
          align
        )
      : "",
    quotation.paymentTerms ? paragraph(quotation.paymentTerms, align) : "",
    quotation.cancellationPolicy ? paragraph(quotation.cancellationPolicy, align) : "",
  ].join("");

  return {
    subject,
    html: shell({
      title: t({ en: "Your quotation is ready", ar: "عرض السعر جاهز" }, locale),
      locale,
      body,
    }),
  };
}

export function invoiceReady(
  invoice: Invoice,
  viewUrl: string
): { subject: string; html: string } {
  const locale = invoice.locale;
  const align = locale === "ar" ? "right" : "left";

  const subject = t(
    {
      en: `Your invoice ${invoice.invoiceNumber}`,
      ar: `فاتورتك ${invoice.invoiceNumber}`,
    },
    locale
  );

  const body = [
    paragraph(
      invoice.clientName
        ? t({ en: `Dear ${invoice.clientName},`, ar: `عزيزنا ${invoice.clientName}،` }, locale)
        : t({ en: "Hello,", ar: "مرحبًا،" }, locale),
      align
    ),
    paragraph(
      t(
        {
          en: "Please find your invoice for the journey below.",
          ar: "تجد أدناه فاتورتك الخاصة بالرحلة.",
        },
        locale
      ),
      align
    ),
    detailRows(
      journeyRows(
        {
          serviceType: invoice.serviceType,
          pickupLocation: invoice.pickupLocation,
          dropoffLocation: invoice.dropoffLocation,
          date: invoice.date,
          time: invoice.time,
          passengers: null,
          luggage: null,
          vehicleType: null,
          flightNumber: null,
          message: null,
        },
        locale
      ),
      locale
    ),
    lineItemsTable(invoice.lineItems, invoice.currency, invoice.totalAmount, locale),
    button(t({ en: "View invoice", ar: "عرض الفاتورة" }, locale), viewUrl, align),
    invoice.notes ? paragraph(invoice.notes, align) : "",
  ].join("");

  return {
    subject,
    html: shell({
      title: t({ en: "Your invoice", ar: "فاتورتك" }, locale),
      locale,
      body,
    }),
  };
}

/** Told to the team when a customer accepts or declines a quotation. */
export function quotationDecisionForTeam(
  quotation: Quotation,
  decision: "Accepted" | "Declined"
): { subject: string; html: string } {
  const accepted = decision === "Accepted";
  const subject = `Quotation ${quotation.quoteNumber} ${accepted ? "accepted" : "declined"}`;

  const body = [
    paragraph(
      `${quotation.clientName ?? "The customer"} ${
        accepted ? "accepted" : "declined"
      } quotation ${quotation.quoteNumber}.`,
      "left"
    ),
    detailRows(
      [
        ["Customer", quotation.clientName],
        ["Email", quotation.clientEmail],
        ["Phone", quotation.clientPhone],
        ["Pick-up", quotation.pickupLocation],
        ["Destination", quotation.dropoffLocation],
        ["Date", quotation.date],
        ["Time", quotation.time],
        ["Total", money(quotation.totalAmount, quotation.currency)],
      ],
      "en"
    ),
    paragraph(
      accepted
        ? "Confirm the vehicle and driver, then send a booking confirmation."
        : "No action is required unless you want to follow up.",
      "left"
    ),
  ].join("");

  return {
    subject,
    html: shell({
      title: accepted ? "Quotation accepted" : "Quotation declined",
      locale: "en",
      body,
    }),
  };
}

/**
 * The booking confirmation.
 *
 * The only template that tells a customer their journey is confirmed, so it is
 * sent by hand from the CRM rather than by any automatic trigger. It states
 * only what the operator has entered — no invented driver details, vehicle
 * assignment or meeting point.
 */
export function bookingConfirmation(
  quotation: Quotation,
  extra: { meetingInstructions?: string | null } = {}
): { subject: string; html: string } {
  const locale = quotation.locale;
  const align = locale === "ar" ? "right" : "left";

  const subject = t(
    {
      en: `Booking confirmed — ${quotation.quoteNumber}`,
      ar: `تم تأكيد الحجز — ${quotation.quoteNumber}`,
    },
    locale
  );

  const body = [
    paragraph(
      quotation.clientName
        ? t({ en: `Dear ${quotation.clientName},`, ar: `عزيزنا ${quotation.clientName}،` }, locale)
        : t({ en: "Hello,", ar: "مرحبًا،" }, locale),
      align
    ),
    paragraph(
      t(
        {
          en: "Your transfer is confirmed. The details we hold are below — please check them and tell us straight away if anything needs changing.",
          ar: "تم تأكيد رحلتك. التفاصيل المسجلة لدينا موضحة أدناه — يُرجى مراجعتها وإبلاغنا فورًا إذا كان أي منها يحتاج إلى تعديل.",
        },
        locale
      ),
      align
    ),
    detailRows(
      journeyRows({ ...quotation, message: quotation.specialRequests }, locale),
      locale
    ),
    extra.meetingInstructions ? paragraph(extra.meetingInstructions, align) : "",
    lineItemsTable(quotation.lineItems, quotation.currency, quotation.totalAmount, locale),
    quotation.cancellationPolicy ? paragraph(quotation.cancellationPolicy, align) : "",
  ].join("");

  return {
    subject,
    html: shell({
      title: t({ en: "Your booking is confirmed", ar: "تم تأكيد حجزك" }, locale),
      locale,
      body,
    }),
  };
}
