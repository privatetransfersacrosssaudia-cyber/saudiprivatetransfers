"use client";

import * as React from "react";
import { ChevronDownIcon, PrinterIcon, RotateCcwIcon } from "lucide-react";

import { cn } from "cn";
import type { Checklist, Requirement } from "@/lib/content/border/types";
import type { Locale } from "@/lib/i18n/config";

/**
 * A departure checklist the traveller can tick off.
 *
 * Ticks persist per checklist, so closing the tab the night before departure
 * does not lose the work — but nothing depends on that: the list renders
 * complete and usable when storage is unavailable, as it is in a private
 * window and during thumbnail capture.
 *
 * Every row used to carry two badges, one for how strongly the document was
 * required and one for how well that requirement was evidenced. That was two
 * pieces of jargon per line on a list someone reads while packing. Now the
 * requirement is shown once, quietly, and only where it is not the default;
 * the evidence behind it lives in a disclosure under the row, so it is one
 * click away rather than in the way.
 */

/** Shared, stable empty value: a new object each call would loop the store. */
const EMPTY: Record<string, boolean> = Object.freeze({});

/**
 * A tiny external store over one localStorage key.
 *
 * `getSnapshot` must return the *same* object until the data actually changes,
 * or React re-renders forever — hence the cached parse keyed on the raw
 * string. Every access is wrapped: in a private window, with site data
 * blocked, or during a thumbnail capture, `localStorage` throws on access
 * rather than returning null, and the checklist has to keep working.
 */
function createTickStore(key: string) {
  let lastRaw: string | null = null;
  let cached: Record<string, boolean> = EMPTY;
  const listeners = new Set<() => void>();

  const readRaw = (): string | null => {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  };

  const notify = () => {
    for (const listener of listeners) listener();
  };

  return {
    subscribe(listener: () => void) {
      listeners.add(listener);
      // Keeps two tabs of the same checklist in step.
      window.addEventListener("storage", listener);
      return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", listener);
      };
    },
    getSnapshot(): Record<string, boolean> {
      const raw = readRaw();
      if (raw !== lastRaw) {
        lastRaw = raw;
        try {
          cached = raw ? (JSON.parse(raw) as Record<string, boolean>) : EMPTY;
        } catch {
          // Corrupt or hand-edited value: treat as nothing ticked.
          cached = EMPTY;
        }
      }
      return cached;
    },
    /** The server has no ticks, so the first paint shows none. */
    getServerSnapshot(): Record<string, boolean> {
      return EMPTY;
    },
    set(next: Record<string, boolean>) {
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // Persistence failed, but the tick must still register for this
        // session, so the cache is updated regardless.
      }
      lastRaw = JSON.stringify(next);
      cached = next;
      notify();
    },
  };
}

const requirementLabels: Record<Requirement, { en: string; ar: string }> = {
  mandatory: { en: "Always needed", ar: "مطلوب دائمًا" },
  conditional: { en: "In some cases", ar: "في بعض الحالات" },
  recommended: { en: "Worth having", ar: "يُستحسن اصطحابه" },
  notApplicable: { en: "Not applicable", ar: "لا ينطبق" },
};

const copy = {
  print: { en: "Print", ar: "طباعة" },
  reset: { en: "Clear", ar: "مسح" },
  ready: { en: "ready", ar: "جاهز" },
  why: { en: "Where this comes from", ar: "مصدر هذا الاشتراط" },
  checked: { en: "checked", ar: "فُحص" },
  disclaimer: {
    en: "This list covers what we were able to source. It is not a complete legal or immigration checklist — confirm your own case with the authorities listed on this page before you travel.",
    ar: "تغطي هذه القائمة ما أمكننا توثيقه. وهي ليست قائمة قانونية أو هجرية كاملة — تحقق من حالتك مع الجهات المذكورة في هذه الصفحة قبل السفر.",
  },
} as const;

export function DocumentChecklist({
  checklist,
  locale,
}: {
  checklist: Checklist;
  locale: Locale;
}) {
  const store = React.useMemo(
    () => createTickStore(`pts-checklist-${checklist.id}`),
    [checklist.id]
  );

  /**
   * localStorage is an external store that genuinely differs between server
   * and client, which is what `useSyncExternalStore` is for. The server
   * snapshot keeps the first paint identical to the server's HTML, so nothing
   * mismatches on hydration.
   */
  const ticked = React.useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  );

  const toggle = (id: string) => store.set({ ...ticked, [id]: !ticked[id] });
  const reset = () => store.set({});

  const countable = checklist.items.filter(
    (item) => item.requirement !== "notApplicable"
  );
  const done = countable.filter((item) => ticked[item.id]).length;
  const pct = countable.length ? Math.round((done / countable.length) * 100) : 0;

  return (
    <section className="rounded-2xl border border-border bg-card print:break-inside-avoid print:border-0">
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border p-5 sm:p-6">
        <div className="min-w-0">
          <h3 className="font-heading text-xl text-ink">
            {checklist.title[locale]}
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink/70">
            {checklist.intro[locale]}
          </p>
        </div>

        <div className="flex shrink-0 gap-2 print:hidden">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-sm font-medium text-ink/80 transition-colors hover:bg-muted hover:text-ink"
          >
            <RotateCcwIcon aria-hidden className="size-3.5" />
            {copy.reset[locale]}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-sm font-medium text-ink/80 transition-colors hover:bg-muted hover:text-ink"
          >
            <PrinterIcon aria-hidden className="size-3.5" />
            {copy.print[locale]}
          </button>
        </div>
      </header>

      {/* Progress. A thin rule rather than a dashboard gauge. */}
      <div className="flex items-center gap-3 px-5 pt-4 sm:px-6 print:hidden">
        <div
          className="h-1 flex-1 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={done}
          aria-valuemin={0}
          aria-valuemax={countable.length}
        >
          <div
            className="h-full rounded-full bg-palm transition-[width] duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="numeric shrink-0 text-xs text-muted-foreground">
          {done}/{countable.length} {copy.ready[locale]}
        </span>
      </div>

      <ul className="divide-y divide-border px-5 sm:px-6">
        {checklist.items.map((item) => {
          const isTicked = Boolean(ticked[item.id]);
          const inapplicable = item.requirement === "notApplicable";
          const inputId = `${checklist.id}-${item.id}`;

          return (
            <li key={item.id} className="py-4 print:break-inside-avoid">
              <div className="flex items-start gap-3.5">
                <input
                  type="checkbox"
                  id={inputId}
                  checked={isTicked}
                  disabled={inapplicable}
                  onChange={() => toggle(item.id)}
                  /* 20px box with padding around it clears the 44px touch
                     target without making the tick itself look oversized. */
                  className="mt-0.5 size-5 shrink-0 cursor-pointer accent-palm disabled:cursor-default disabled:opacity-40"
                />

                <div className="min-w-0 flex-1">
                  <label
                    htmlFor={inputId}
                    className={cn(
                      "block cursor-pointer font-medium transition-colors",
                      isTicked ? "text-ink/55 line-through" : "text-ink",
                      inapplicable && "cursor-default text-muted-foreground"
                    )}
                  >
                    {item.label[locale]}
                  </label>

                  {/* The requirement, stated once, in words. Only shown when
                      it is not simply "always needed" — the default case
                      needs no label at all. */}
                  {item.requirement !== "mandatory" ? (
                    <p className="mt-1 text-sm text-ink/70">
                      <span className="font-medium text-brass-deep">
                        {requirementLabels[item.requirement][locale]}
                      </span>
                      {item.appliesWhen ? (
                        <>
                          {" — "}
                          {item.appliesWhen[locale]}
                        </>
                      ) : null}
                    </p>
                  ) : item.appliesWhen ? (
                    <p className="mt-1 text-sm text-ink/70">
                      {item.appliesWhen[locale]}
                    </p>
                  ) : null}

                  {/* Evidence, folded away. Present for anyone who wants to
                      check, invisible to anyone who just wants to pack. */}
                  {item.note || item.sources.length > 0 ? (
                    <details className="group mt-2">
                      <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-ink [&::-webkit-details-marker]:hidden">
                        {copy.why[locale]}
                        <ChevronDownIcon
                          aria-hidden
                          className="size-3 transition-transform group-open:rotate-180"
                        />
                      </summary>
                      <div className="mt-2 border-s-2 border-border ps-3 text-sm">
                        {item.note ? (
                          <p className="leading-relaxed text-ink/70">
                            {item.note[locale]}
                          </p>
                        ) : null}
                        {item.sources.length > 0 ? (
                          <ul className="mt-1.5 flex flex-col gap-1">
                            {item.sources.map((source) => (
                              <li key={source.url} className="text-xs">
                                <a
                                  href={source.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-palm underline-offset-4 hover:underline"
                                >
                                  {source.name}
                                </a>
                                <span className="numeric ms-2 text-muted-foreground">
                                  {copy.checked[locale]} {source.checked}
                                </span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </details>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="border-t border-border px-5 py-4 text-sm leading-relaxed text-ink/70 sm:px-6">
        {copy.disclaimer[locale]}
      </p>
    </section>
  );
}
