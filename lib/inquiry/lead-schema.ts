import { z } from "zod";

/**
 * The canonical lead contract.
 *
 * This is the single definition of a lead's shape for this project: the quote
 * form fills it, the Server Action validates against it, and
 * `lib/crm/leads.ts` stores it in this project's own `public.leads` table.
 *
 * The field set is inherited unchanged from the original quote form, so the
 * form, its validation and the stored shape are all exactly as they were.
 * What is gone is the arrangement that once kept this file in step with
 * another repository's copy and posted each lead to that site's intake
 * endpoint — this project now owns the schema and the table. There is no
 * second copy to synchronise with: change this file and run the matching
 * migration in `supabase/schema.sql`.
 */

/** Trim strings, convert "" to undefined, and cap length to sanitize input. */
const str = (max = 500) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

/**
 * Validation for the public lead/quote forms. Phone is required (every form
 * collects a WhatsApp number); everything else is optional.
 */
export const leadSchema = z.object({
  fullName: str(120),
  email: z.string().trim().email().max(160).optional().or(z.literal("").transform(() => undefined)),
  phone: z.string().trim().min(5, "A valid phone/WhatsApp number is required").max(40),
  pickupLocation: str(200),
  dropoffLocation: str(200),
  date: str(40),
  time: str(40),
  passengers: str(20),
  luggage: str(20),
  vehicleType: str(60),
  flightNumber: str(40),
  message: str(2000),
  sourcePage: str(300),
  serviceType: str(120),
  // Multi-touch lead attribution
  firstLandingPage: str(300),
  firstReferrer: str(300),
  firstUtmSource: str(100),
  firstUtmMedium: str(100),
  firstUtmCampaign: str(100),
  landingPage: str(300),
  referrer: str(300),
  utmSource: str(100),
  utmMedium: str(100),
  utmCampaign: str(100),
  gclid: str(100),
  searchSource: str(100),
});

export type LeadFormInput = z.infer<typeof leadSchema>;

/** Canonical lead keys, in schema order. */
export const LEAD_KEYS = Object.keys(leadSchema.shape) as (keyof LeadFormInput)[];
