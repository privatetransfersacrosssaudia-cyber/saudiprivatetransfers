import { ExternalLinkIcon, PhoneIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "cn";
import type { BorderFaq, BorderGuide } from "@/lib/content/border/types";
import type { Bilingual, Locale } from "@/lib/i18n/config";

/**
 * The remaining set pieces of a border guide: the crossing timeline, the costs
 * table, the FAQ and the list of authorities.
 *
 * All four follow the same rule as the prose sections — nothing is shown as a
 * status badge, and where something could not be confirmed it is said in a
 * sentence instead.
 */

// --- Crossing process ---------------------------------------------------------

export interface TimelineStep {
  title: Bilingual<string>;
  body: Bilingual<string>;
  /**
   * True when the step is a general description of how a road border works
   * rather than a procedure published by either authority. Rendered as a note
   * on the step, not as a badge.
   */
  unconfirmed?: boolean;
}

const timelineCopy = {
  unconfirmed: {
    en: "The authorities do not publish a step-by-step passenger procedure, so this describes what a road crossing generally involves rather than a confirmed official process.",
    ar: "لا تنشر الجهات إجراءً تفصيليًا للمسافرين، ولذلك يصف هذا ما ينطوي عليه العبور البري عمومًا لا إجراءً رسميًا مؤكَّدًا.",
  },
} as const;

export function BorderProcessTimeline({
  locale,
  heading,
  intro,
  steps,
  className,
}: {
  locale: Locale;
  heading: Bilingual<string>;
  intro: Bilingual<string>;
  steps: TimelineStep[];
  className?: string;
}) {
  const anyUnconfirmed = steps.some((step) => step.unconfirmed);

  return (
    <div className={className}>
      <h2 className="text-h3 text-balance text-ink">{heading[locale]}</h2>
      <p className="mt-4 text-lg leading-relaxed text-ink/80">
        {intro[locale]}
      </p>

      <ol className="mt-8 flex flex-col">
        {steps.map((step, index) => (
          <li
            key={step.title.en}
            className="relative flex gap-5 pb-8 last:pb-0"
          >
            {/* The spine, drawn between markers rather than behind them. */}
            {index < steps.length - 1 ? (
              <span
                aria-hidden
                className="absolute start-[1.1rem] top-9 bottom-0 w-px bg-border"
              />
            ) : null}

            <span
              aria-hidden
              className="numeric relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-palm text-sm font-semibold text-white"
            >
              {index + 1}
            </span>

            <div className="min-w-0 pt-1">
              <h3 className="font-semibold text-ink">{step.title[locale]}</h3>
              <p className="mt-1.5 leading-relaxed text-ink/75">
                {step.body[locale]}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {anyUnconfirmed ? (
        <p className="mt-2 rounded-xl bg-muted/50 p-4 text-sm leading-relaxed text-ink/70">
          {timelineCopy.unconfirmed[locale]}
        </p>
      ) : null}
    </div>
  );
}

// --- Costs --------------------------------------------------------------------

export interface CostRow {
  item: Bilingual<string>;
  amount: Bilingual<string>;
  /** How well the figure is established, used to group rather than to badge. */
  basis: "official" | "reported" | "unknown";
  detail: Bilingual<string>;
}

const costCopy = {
  official: {
    en: "Published by the authority",
    ar: "منشور من الجهة الرسمية",
  },
  reported: {
    en: "Reported by news outlets, not published by the authority",
    ar: "ورد في منافذ إخبارية ولم تنشره الجهة الرسمية",
  },
  unknown: {
    en: "No figure published anywhere we could reach",
    ar: "لا يوجد رقم منشور في أي مصدر أمكننا الوصول إليه",
  },
  item: { en: "Charge", ar: "الرسم" },
  amount: { en: "Amount", ar: "المبلغ" },
  notes: { en: "Notes", ar: "ملاحظات" },
} as const;

const basisOrder = ["official", "reported", "unknown"] as const;

/**
 * Costs, grouped by how well each figure is established.
 *
 * Grouping does the work a status column would have done, without putting a
 * label beside every number: a reader can see at a glance that the toll sits
 * in a different group from the discount, and the group heading says why in
 * plain words.
 */
export function TravelCostTable({
  locale,
  heading,
  intro,
  rows,
  className,
}: {
  locale: Locale;
  heading: Bilingual<string>;
  intro: Bilingual<string>;
  rows: CostRow[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="text-h3 text-balance text-ink">{heading[locale]}</h2>
      <p className="mt-4 text-lg leading-relaxed text-ink/80">
        {intro[locale]}
      </p>

      <div className="mt-7 flex flex-col gap-7">
        {basisOrder.map((basis) => {
          const group = rows.filter((row) => row.basis === basis);
          if (group.length === 0) return null;

          return (
            <div key={basis}>
              <h3 className="text-sm font-semibold text-ink">
                {costCopy[basis][locale]}
              </h3>
              <div className="mt-3 overflow-x-auto rounded-xl border border-border">
                <table className="w-full min-w-[34rem] text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/40 text-start text-muted-foreground">
                      <th scope="col" className="px-4 py-2.5 text-start font-medium">
                        {costCopy.item[locale]}
                      </th>
                      <th scope="col" className="px-4 py-2.5 text-start font-medium">
                        {costCopy.amount[locale]}
                      </th>
                      <th scope="col" className="px-4 py-2.5 text-start font-medium">
                        {costCopy.notes[locale]}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.map((row) => (
                      <tr
                        key={row.item.en}
                        className="border-b border-border bg-card align-top last:border-0"
                      >
                        <td className="px-4 py-3 font-medium text-ink">
                          {row.item[locale]}
                        </td>
                        <td className="numeric px-4 py-3 whitespace-nowrap text-ink">
                          {row.amount[locale]}
                        </td>
                        <td className="px-4 py-3 leading-relaxed text-ink/70">
                          {row.detail[locale]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- FAQ ----------------------------------------------------------------------

/**
 * The questions, as an accordion.
 *
 * `hiddenUntilFound` keeps every answer in the HTML, so search engines read
 * them and the browser's own find-in-page can open a collapsed one. Status is
 * carried in the wording of the answers themselves — several of them begin by
 * saying plainly that the thing could not be confirmed.
 */
export function GuideFaq({
  locale,
  heading,
  faqs,
  className,
}: {
  locale: Locale;
  heading: Bilingual<string>;
  faqs: BorderFaq[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="text-h3 text-balance text-ink">{heading[locale]}</h2>
      <Accordion className="mt-6 divide-y divide-border border-y border-border">
        {faqs.map((faq) => (
          <AccordionItem key={faq.question.en} value={faq.question.en}>
            <AccordionTrigger className="text-start text-base font-semibold text-ink">
              {faq.question[locale]}
            </AccordionTrigger>
            <AccordionContent>
              <p className="leading-relaxed text-ink/80">
                {faq.answer[locale]}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

// --- Official resources -------------------------------------------------------

export function OfficialResources({
  locale,
  heading,
  intro,
  authorities,
  className,
}: {
  locale: Locale;
  heading: Bilingual<string>;
  intro: Bilingual<string>;
  authorities: BorderGuide["authorities"];
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="text-h3 text-balance text-ink">{heading[locale]}</h2>
      <p className="mt-4 text-lg leading-relaxed text-ink/80">
        {intro[locale]}
      </p>

      <ul className="mt-7 grid gap-3 sm:grid-cols-2">
        {authorities.map((authority) => (
          <li
            key={authority.name.en}
            className={cn(
              "flex flex-col gap-2 rounded-xl border border-border bg-card p-5"
            )}
          >
            <p className="font-semibold text-ink">{authority.name[locale]}</p>
            <p className="text-sm leading-relaxed text-ink/70">
              {authority.role[locale]}
            </p>
            <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-2 text-sm">
              {authority.url ? (
                <a
                  href={authority.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-palm underline-offset-4 hover:underline"
                >
                  {authority.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  <ExternalLinkIcon aria-hidden className="size-3.5 shrink-0" />
                </a>
              ) : null}
              {authority.phone ? (
                <span
                  dir="ltr"
                  className="numeric inline-flex items-center gap-1.5 text-ink/80"
                >
                  <PhoneIcon aria-hidden className="size-3.5" />
                  {authority.phone}
                </span>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
