import { cn } from "cn";

import { formatMoney } from "@/components/crm/primitives";
import type { LineItem } from "@/lib/crm/types";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n/config";

/**
 * The customer-facing document: a quotation or an invoice, as the person who
 * received the link sees it.
 *
 * Laid out in the document's own language, so an Arabic quotation reads
 * right-to-left throughout rather than as Arabic text in a left-to-right
 * frame. Logical CSS properties (`text-start`, `ms-`, `border-s`) do that work
 * without a second stylesheet.
 *
 * It is designed to print. The browser's own "Save as PDF" produces vector
 * text at any size, which is both sharper and smaller than a rasterised
 * screenshot, and it needs no PDF library in the bundle.
 */

type Copy = Record<Locale, string>;
const t = (copy: Copy, locale: Locale) => copy[locale];

export interface DocumentViewProps {
  kind: "quotation" | "invoice";
  number: string;
  locale: Locale;
  issuedOn: string;
  validUntil?: string | null;
  statusLabel: string;
  client: {
    name: string | null;
    email: string | null;
    phone: string | null;
  };
  journey: {
    serviceType: string | null;
    pickupLocation: string | null;
    dropoffLocation: string | null;
    date: string | null;
    time: string | null;
    passengers?: string | null;
    luggage?: string | null;
    vehicleType?: string | null;
    flightNumber?: string | null;
  };
  lineItems: LineItem[];
  currency: string;
  totalAmount: number;
  terms?: {
    paymentTerms?: string | null;
    cancellationPolicy?: string | null;
    specialRequests?: string | null;
  };
  notes?: string | null;
  children?: React.ReactNode;
}

export function DocumentView(props: DocumentViewProps) {
  const { locale, kind } = props;
  const rtl = locale === "ar";

  const title = t(
    kind === "quotation"
      ? { en: "Quotation", ar: "عرض سعر" }
      : { en: "Invoice", ar: "فاتورة" },
    locale
  );

  const label = (en: string, ar: string) => t({ en, ar }, locale);

  // Typed as tuples before filtering: `Array.prototype.filter` widens a tuple
  // to a plain array, so the annotation has to sit on the literal.
  const allJourneyRows: [string, string | null | undefined][] = [
    [label("Service", "الخدمة"), props.journey.serviceType],
    [label("Pick-up", "نقطة الانطلاق"), props.journey.pickupLocation],
    [label("Destination", "الوجهة"), props.journey.dropoffLocation],
    [label("Date", "التاريخ"), props.journey.date],
    [label("Time", "الوقت"), props.journey.time],
    [label("Passengers", "عدد المسافرين"), props.journey.passengers],
    [label("Luggage", "عدد الحقائب"), props.journey.luggage],
    [label("Vehicle", "نوع المركبة"), props.journey.vehicleType],
    [label("Flight number", "رقم الرحلة"), props.journey.flightNumber],
  ];

  const journeyRows = allJourneyRows.filter(([, value]) =>
    Boolean(value && String(value).trim())
  );

  return (
    <div
      lang={locale}
      dir={rtl ? "rtl" : "ltr"}
      className={cn("mx-auto w-full max-w-3xl px-4 py-10", rtl && "font-sans")}
    >
      <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm print:rounded-none print:border-0 print:shadow-none">
        <header className="bg-palm-deep px-6 py-6 text-white sm:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-heading text-xl leading-tight">{site.name}</p>
              <p className="mt-0.5 text-xs text-brass">
                {label(
                  "Private transfers across Saudi Arabia",
                  "نقل خاص في جميع أنحاء المملكة العربية السعودية"
                )}
              </p>
            </div>
            <div className="text-start sm:text-end">
              <p className="font-heading text-lg">{title}</p>
              <p className="font-mono text-sm text-white/80">{props.number}</p>
            </div>
          </div>
        </header>

        <div className="space-y-7 px-6 py-7 sm:px-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {label("Prepared for", "مُعد لـ")}
              </p>
              <p className="mt-1 font-medium text-ink">
                {props.client.name || label("Customer", "العميل")}
              </p>
              {props.client.email ? (
                <p className="text-sm text-muted-foreground">{props.client.email}</p>
              ) : null}
              {props.client.phone ? (
                <p className="numeric text-sm text-muted-foreground" dir="ltr">
                  {props.client.phone}
                </p>
              ) : null}
            </div>
            <div className="text-start sm:text-end">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                {label("Issued", "تاريخ الإصدار")}
              </p>
              <p className="mt-1 text-ink tabular-nums">{props.issuedOn}</p>
              {props.validUntil ? (
                <>
                  <p className="mt-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    {label("Valid until", "صالح حتى")}
                  </p>
                  <p className="mt-1 text-ink tabular-nums">{props.validUntil}</p>
                </>
              ) : null}
              <p className="mt-3 inline-flex rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                {props.statusLabel}
              </p>
            </div>
          </div>

          {journeyRows.length > 0 ? (
            <section>
              <h2 className="mb-2 font-heading text-base text-ink">
                {label("Your journey", "تفاصيل رحلتك")}
              </h2>
              <dl className="grid gap-x-8 gap-y-2.5 border-t border-border pt-3 sm:grid-cols-2">
                {journeyRows.map(([key, value]) => (
                  <div key={key} className="flex justify-between gap-4 text-sm">
                    <dt className="text-muted-foreground">{key}</dt>
                    <dd className="text-end font-medium text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

          <section>
            <h2 className="mb-2 font-heading text-base text-ink">
              {label("Charges", "التكاليف")}
            </h2>
            <table className="w-full border-t border-border text-sm">
              <thead>
                <tr className="text-muted-foreground">
                  <th scope="col" className="py-2 text-start font-medium">
                    {label("Description", "الوصف")}
                  </th>
                  <th scope="col" className="py-2 text-end font-medium">
                    {label("Amount", "المبلغ")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {props.lineItems.map((item, index) => (
                  <tr key={index} className="border-t border-border">
                    <td className="py-2.5 text-ink">
                      {item.description}
                      {item.vehicleType ? (
                        <span className="ms-2 text-xs text-muted-foreground">
                          {item.vehicleType}
                        </span>
                      ) : null}
                    </td>
                    <td className="numeric py-2.5 text-end whitespace-nowrap text-ink tabular-nums">
                      {formatMoney(item.amount, props.currency)}
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-palm">
                  <td className="pt-3 font-semibold text-ink">
                    {label("Total", "الإجمالي")}
                  </td>
                  <td className="numeric pt-3 text-end font-heading text-xl whitespace-nowrap text-palm tabular-nums">
                    {formatMoney(props.totalAmount, props.currency)}
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          {props.terms?.specialRequests ? (
            <Section title={label("Special requests", "طلبات خاصة")}>
              {props.terms.specialRequests}
            </Section>
          ) : null}
          {props.terms?.paymentTerms ? (
            <Section title={label("Payment terms", "شروط الدفع")}>
              {props.terms.paymentTerms}
            </Section>
          ) : null}
          {props.terms?.cancellationPolicy ? (
            <Section title={label("Cancellation", "سياسة الإلغاء")}>
              {props.terms.cancellationPolicy}
            </Section>
          ) : null}
          {props.notes ? (
            <Section title={label("Notes", "ملاحظات")}>{props.notes}</Section>
          ) : null}

          {props.children}
        </div>

        <footer className="border-t border-border bg-muted/50 px-6 py-4 text-xs text-muted-foreground sm:px-8">
          <p>
            {label(
              "This document was issued by",
              "صدر هذا المستند من"
            )}{" "}
            {site.name}.{" "}
            {label(
              "If anything here is wrong, reply to the email that brought you this link.",
              "إذا كان أي شيء هنا غير صحيح، يُرجى الرد على الرسالة التي وصلك منها هذا الرابط."
            )}
          </p>
        </footer>
      </article>

      <p className="mt-4 text-center text-xs text-muted-foreground print:hidden">
        {label(
          "To save a copy, use your browser's print option and choose “Save as PDF”.",
          "لحفظ نسخة، استخدم خيار الطباعة في متصفحك واختر “حفظ بصيغة PDF”."
        )}
      </p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-1.5 font-heading text-base text-ink">{title}</h2>
      <p className="text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
        {children}
      </p>
    </section>
  );
}
