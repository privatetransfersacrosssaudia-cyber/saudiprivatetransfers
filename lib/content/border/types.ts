import type { Bilingual } from "@/lib/i18n/config";

/**
 * The evidence model for border-crossing content.
 *
 * Every factual claim on a border page carries its own status and its own
 * sources. That is the whole point of this type: visa and border rules are
 * high-stakes, they change, and a page that mixes a confirmed government rule
 * with a figure from a travel blog — in the same typeface, with no distinction
 * — is worse than useless to someone standing at a checkpoint.
 *
 * Status is per claim, never per page. A guide is expected to carry verified,
 * reported and unverified facts side by side.
 */

export type SourceKind =
  /** A government authority, operator or official portal. */
  | "official"
  /** A news organisation reporting on an official change. */
  | "news"
  /** Anything else — blogs, forums, operators' marketing. Never sufficient alone. */
  | "secondary";

export interface Source {
  /** The publisher, as a reader would recognise it. */
  name: string;
  url: string;
  kind: SourceKind;
  /**
   * ISO date this source was last read and the claim checked against it.
   * Rendered on the page, because a visa rule without a date is a rumour.
   */
  checked: string;
  /** Publication date, where the source carries one. Required for news. */
  published?: string;
}

export type ClaimStatus =
  /** Stated on an accessible official source. Publishable as fact. */
  | "verified"
  /**
   * Reported consistently by news or secondary sources, with no official
   * confirmation available. Publishable only when labelled as reported, never
   * as a price, total or structured-data value.
   */
  | "reported"
  /**
   * No accessible source answers this. The page says so and points at the
   * authority. Never guessed at.
   */
  | "unverified"
  /** Sources disagree. Both readings are shown; neither is presented as true. */
  | "conflicting";

export interface Claim {
  /** What is being asserted, in both languages. */
  text: Bilingual<string>;
  status: ClaimStatus;
  sources: Source[];
  /**
   * For `unverified`: exactly what the traveller should confirm, and where.
   * For `conflicting`: what the disagreement is.
   * Required for both, because "we don't know" is only useful with a next step.
   */
  note?: Bilingual<string>;
}

/**
 * How strongly a document is required.
 *
 * Deliberately four values rather than a checkbox: telling a traveller that an
 * International Driving Permit is mandatory when it is situational wastes a
 * trip to the licensing office, and telling them it is optional when it is
 * mandatory strands them at a border.
 */
export type Requirement =
  | "mandatory"
  | "conditional"
  | "recommended"
  | "notApplicable";

export interface ChecklistItem {
  id: string;
  label: Bilingual<string>;
  requirement: Requirement;
  /** The circumstance that makes a `conditional` item apply. */
  appliesWhen?: Bilingual<string>;
  /** Evidence for the requirement itself, not for the document. */
  status: ClaimStatus;
  sources: Source[];
  note?: Bilingual<string>;
}

export interface Checklist {
  id: string;
  title: Bilingual<string>;
  intro: Bilingual<string>;
  items: ChecklistItem[];
}

/** One step of the crossing, in order. */
export interface ProcedureStep {
  title: Bilingual<string>;
  body: Bilingual<string>;
  status: ClaimStatus;
  sources: Source[];
}

export interface BorderFaq {
  question: Bilingual<string>;
  answer: Bilingual<string>;
  status: ClaimStatus;
  sources: Source[];
}

export interface BorderGuide {
  /** Route key this guide is published at. */
  routeKey: string;
  title: Bilingual<string>;
  metaTitle: Bilingual<string>;
  metaDescription: Bilingual<string>;
  /** The opening statement of what this page is and is not. */
  standfirst: Bilingual<string>;
  /** ISO date of the most recent verification pass across the whole guide. */
  lastVerified: string;
  /**
   * The service position, restated on every border page. This site publishes
   * travel information; it does not offer cross-border transport, and two
   * existing pages say so. Keeping it in the data rather than the template
   * means it cannot be dropped by a layout change.
   */
  serviceNotice: Bilingual<string>;
  sections: BorderSection[];
  checklists: Checklist[];
  procedure?: {
    title: Bilingual<string>;
    intro: Bilingual<string>;
    steps: ProcedureStep[];
  };
  faqs: BorderFaq[];
  /** Every official authority a reader may need to contact directly. */
  authorities: {
    name: Bilingual<string>;
    role: Bilingual<string>;
    url?: string;
    phone?: string;
  }[];
}

export interface BorderSection {
  heading: Bilingual<string>;
  /** Prose that needs no individual sourcing — framing, not fact. */
  intro?: Bilingual<string>;
  claims: Claim[];
}

/** Count of each status, for the summary strip at the top of a guide. */
export function countStatuses(guide: BorderGuide): Record<ClaimStatus, number> {
  const counts: Record<ClaimStatus, number> = {
    verified: 0,
    reported: 0,
    unverified: 0,
    conflicting: 0,
  };

  const tally = (status: ClaimStatus) => {
    counts[status] += 1;
  };

  for (const section of guide.sections) {
    for (const claim of section.claims) tally(claim.status);
  }
  for (const checklist of guide.checklists) {
    for (const item of checklist.items) tally(item.status);
  }
  for (const step of guide.procedure?.steps ?? []) tally(step.status);
  for (const faq of guide.faqs) tally(faq.status);

  return counts;
}
