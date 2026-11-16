"use client";

import { useActionState } from "react";
import { AlertTriangleIcon, CheckCircle2Icon, Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { decideOnQuotation } from "@/app/admin/_actions/documents";
import { idleAction } from "@/lib/crm/action-state";
import type { Locale } from "@/lib/i18n/config";

/**
 * Accept or decline, on the customer's own copy of a quotation.
 *
 * Two submit buttons in one form, distinguished by their `value`, so this
 * works without JavaScript. The server decides what the decision means — and
 * only acts on a quotation that is still awaiting one, so re-opening an old
 * link and pressing again cannot overturn a decision already recorded.
 */
export function QuoteDecision({
  token,
  locale,
  settled,
}: {
  token: string;
  locale: Locale;
  /** The status already recorded, when the customer has answered before. */
  settled: "Accepted" | "Declined" | null;
}) {
  const [state, formAction, pending] = useActionState(
    decideOnQuotation,
    idleAction
  );

  const t = (en: string, ar: string) => (locale === "ar" ? ar : en);

  if (settled) {
    return (
      <div className="rounded-xl border border-border bg-muted/60 p-4">
        <p className="flex items-start gap-2 text-sm text-ink">
          <CheckCircle2Icon aria-hidden className="mt-0.5 size-4 shrink-0 text-palm" />
          <span>
            {settled === "Accepted"
              ? t(
                  "You accepted this quotation. Our team will be in touch to confirm the details.",
                  "لقد قبلت عرض السعر هذا. سيتواصل معك فريقنا لتأكيد التفاصيل."
                )
              : t(
                  "You declined this quotation. If that was a mistake, reply to the email and we will re-issue it.",
                  "لقد رفضت عرض السعر هذا. إذا كان ذلك عن طريق الخطأ، يُرجى الرد على الرسالة وسنعيد إصداره."
                )}
          </span>
        </p>
      </div>
    );
  }

  if (state.message) {
    return (
      <div
        role="status"
        className={
          state.ok
            ? "rounded-xl border border-palm/30 bg-palm-soft p-4"
            : "rounded-xl border border-destructive/30 bg-destructive/5 p-4"
        }
      >
        <p className="flex items-start gap-2 text-sm text-ink">
          {state.ok ? (
            <CheckCircle2Icon aria-hidden className="mt-0.5 size-4 shrink-0 text-palm" />
          ) : (
            <AlertTriangleIcon
              aria-hidden
              className="mt-0.5 size-4 shrink-0 text-destructive"
            />
          )}
          <span>{state.message}</span>
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="rounded-xl border border-border bg-muted/40 p-4">
      <input type="hidden" name="token" value={token} />
      <p className="mb-3 text-sm text-ink">
        {t(
          "Happy with this quotation? Let us know and we will arrange the vehicle.",
          "هل عرض السعر مناسب؟ أخبرنا وسنقوم بترتيب المركبة."
        )}
      </p>
      <div className="flex flex-wrap gap-3">
        <Button
          type="submit"
          name="decision"
          value="accept"
          size="lg"
          disabled={pending}
          className="h-10"
        >
          {pending ? (
            <Loader2Icon aria-hidden className="size-4 animate-spin" />
          ) : null}
          {t("Accept this quotation", "قبول عرض السعر")}
        </Button>
        <Button
          type="submit"
          name="decision"
          value="decline"
          size="lg"
          variant="outline"
          disabled={pending}
          className="h-10"
        >
          {t("Decline", "رفض")}
        </Button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        {t(
          "Accepting records your decision with our team. It does not take a payment.",
          "القبول يسجل قرارك لدى فريقنا، ولا يتم أي دفع في هذه الخطوة."
        )}
      </p>
    </form>
  );
}
