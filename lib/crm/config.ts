import "server-only";

import { site } from "@/lib/site";

/**
 * Every piece of CRM configuration, read in one place.
 *
 * Nothing here is `NEXT_PUBLIC_`, so none of it can reach a browser bundle.
 * Each getter reports whether its service is configured rather than throwing on
 * import, so the site keeps building and serving when the CRM is not wired up
 * yet — a page then says so plainly instead of returning a 500.
 */

/** The CRM's URL namespace. One constant so links and the proxy cannot drift. */
export const CRM_BASE = "/admin";

export const SESSION_COOKIE = "pts_crm_session";

/** Seven days, matching the cookie's own max-age. */
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function trimmed(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

// --- Database ---------------------------------------------------------------

export function supabaseConfig() {
  const url = trimmed("SUPABASE_URL");
  const serviceRoleKey = trimmed("SUPABASE_SERVICE_ROLE_KEY");
  return { url, serviceRoleKey, configured: Boolean(url && serviceRoleKey) };
}

export const isDatabaseConfigured = () => supabaseConfig().configured;

// --- Sessions ---------------------------------------------------------------

/**
 * The session signing secret. There is deliberately no development fallback:
 * a hardcoded default would mean an unconfigured deployment signs sessions
 * with a value published in this repository, and anyone could mint one. A
 * missing secret makes login unavailable, which is the safe failure.
 */
export function sessionSecret(): string | undefined {
  const secret = trimmed("CRM_SESSION_SECRET");
  if (!secret) return undefined;
  // 32 bytes is the floor for HS256 to be worth the name.
  if (secret.length < 32) return undefined;
  return secret;
}

export const isSessionConfigured = () => Boolean(sessionSecret());

// --- Email ------------------------------------------------------------------

export function emailConfig() {
  const apiKey = trimmed("RESEND_API_KEY");
  /**
   * The sender address. It must be on a domain verified with the email
   * provider — an unverified sender is rejected outright, and a mailbox that
   * merely exists is not the same as a verified sending domain. See
   * docs/crm/environment.md.
   */
  const from = trimmed("CRM_EMAIL_FROM");
  /** Where new-enquiry notifications go. May be a comma-separated list. */
  const notifyRaw = trimmed("CRM_EMAIL_NOTIFY");
  const notify = notifyRaw
    ? notifyRaw.split(",").map((address) => address.trim()).filter(Boolean)
    : [];
  /**
   * Where customer replies go.
   *
   * `CRM_EMAIL_FROM` is a sending address on the verified domain, and a
   * verified sending domain is not the same thing as a mailbox somebody
   * reads — replies to `bookings@` go nowhere unless that mailbox exists.
   * Several customer-facing templates invite a reply, and the enquiry
   * acknowledgement asks for one in as many words, so an absent Reply-To
   * loses real messages silently: the customer sees their reply send, and
   * nobody ever receives it.
   *
   * It therefore falls back to the address the site already publishes as its
   * contact, rather than to nothing. `CRM_EMAIL_REPLY_TO` still overrides it,
   * which is what to set once a monitored mailbox exists on the domain.
   *
   * Team notifications are unaffected. Those pass their own Reply-To — the
   * customer's address — at the call site, and an explicit one wins in
   * `send()`.
   */
  const replyTo = trimmed("CRM_EMAIL_REPLY_TO") ?? site.contact.email ?? undefined;

  return {
    apiKey,
    from,
    notify,
    replyTo,
    configured: Boolean(apiKey && from),
  };
}

export const isEmailConfigured = () => emailConfig().configured;

// --- Readiness --------------------------------------------------------------

export type ReadinessItem = {
  label: string;
  ok: boolean;
  /** The environment variables this depends on, for the settings screen. */
  vars: string[];
  /** Why it matters, in one sentence. */
  note: string;
};

export function readiness(): ReadinessItem[] {
  const email = emailConfig();
  return [
    {
      label: "Database",
      ok: isDatabaseConfigured(),
      vars: ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"],
      note: "Without it, enquiries cannot be stored and no screen here can load.",
    },
    {
      label: "Sessions",
      ok: isSessionConfigured(),
      vars: ["CRM_SESSION_SECRET"],
      note: "A secret of at least 32 characters. Without it, nobody can sign in.",
    },
    {
      label: "Email sending",
      ok: email.configured,
      vars: ["RESEND_API_KEY", "CRM_EMAIL_FROM"],
      note: "The sender's domain must be verified with the provider first.",
    },
    {
      label: "Customer replies",
      ok: Boolean(email.replyTo),
      vars: ["CRM_EMAIL_REPLY_TO"],
      note: email.replyTo
        ? `Replies to customer emails go to ${email.replyTo}, not to the sending address.`
        : "Nowhere to reply to: the sending address has no mailbox behind it.",
    },
    {
      label: "Enquiry notifications",
      ok: email.notify.length > 0,
      vars: ["CRM_EMAIL_NOTIFY"],
      note: "Who gets told when a new enquiry arrives. Enquiries still save without it.",
    },
    {
      label: "Public site URL",
      ok: Boolean(trimmed("NEXT_PUBLIC_SITE_URL")),
      vars: ["NEXT_PUBLIC_SITE_URL"],
      note: "Used for links inside emails and customer-facing documents.",
    },
  ];
}
