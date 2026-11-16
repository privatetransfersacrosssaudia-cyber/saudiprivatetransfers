"use client";

import { useActionState, useState } from "react";
import {
  AlertTriangleIcon,
  CheckIcon,
  CopyIcon,
  Loader2Icon,
  SendIcon,
  Trash2Icon,
} from "lucide-react";

import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  changeInvoicePaymentStatus,
  changeQuotationStatus,
  removeInvoice,
  removeQuotation,
  sendBookingConfirmation,
  sendInvoice,
  sendQuotation,
} from "@/app/admin/_actions/documents";
import { idleAction, type ActionState } from "@/lib/crm/action-state";
import {
  PAYMENT_STATUSES,
  QUOTE_STATUSES,
  type PaymentStatus,
  type QuoteStatus,
} from "@/lib/crm/types";

function Result({ state }: { state: ActionState }) {
  if (!state.message) return null;
  return (
    <p
      role="status"
      className={cn(
        "mt-2 flex items-start gap-1.5 text-sm",
        state.ok ? "text-palm" : "text-destructive"
      )}
    >
      {state.ok ? (
        <CheckIcon aria-hidden className="mt-0.5 size-3.5 shrink-0" />
      ) : (
        <AlertTriangleIcon aria-hidden className="mt-0.5 size-3.5 shrink-0" />
      )}
      <span>{state.message}</span>
    </p>
  );
}

const selectClass =
  "h-9 rounded-lg border border-input bg-transparent px-2.5 text-sm text-ink outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export function QuotationStatusControl({
  quotationId,
  status,
}: {
  quotationId: string;
  status: QuoteStatus;
}) {
  const [state, formAction, pending] = useActionState(
    changeQuotationStatus,
    idleAction
  );
  return (
    <form action={formAction}>
      <input type="hidden" name="quotationId" value={quotationId} />
      <div className="flex items-center gap-2">
        <label htmlFor={`qs-${quotationId}`} className="sr-only">
          Quotation status
        </label>
        <select
          id={`qs-${quotationId}`}
          name="status"
          defaultValue={status}
          className={selectClass}
        >
          {QUOTE_STATUSES.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <Button type="submit" size="sm" variant="outline" disabled={pending}>
          {pending ? <Loader2Icon aria-hidden className="size-3.5 animate-spin" /> : null}
          Update
        </Button>
      </div>
      <Result state={state} />
    </form>
  );
}

export function InvoiceStatusControl({
  invoiceId,
  status,
}: {
  invoiceId: string;
  status: PaymentStatus;
}) {
  const [state, formAction, pending] = useActionState(
    changeInvoicePaymentStatus,
    idleAction
  );
  return (
    <form action={formAction}>
      <input type="hidden" name="invoiceId" value={invoiceId} />
      <div className="flex items-center gap-2">
        <label htmlFor={`is-${invoiceId}`} className="sr-only">
          Payment status
        </label>
        <select
          id={`is-${invoiceId}`}
          name="paymentStatus"
          defaultValue={status}
          className={selectClass}
        >
          {PAYMENT_STATUSES.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <Button type="submit" size="sm" variant="outline" disabled={pending}>
          {pending ? <Loader2Icon aria-hidden className="size-3.5 animate-spin" /> : null}
          Update
        </Button>
      </div>
      <Result state={state} />
    </form>
  );
}

export function SendDocumentButton({
  kind,
  id,
  to,
  emailConfigured,
}: {
  kind: "quotation" | "invoice";
  id: string;
  to: string | null;
  emailConfigured: boolean;
}) {
  const [state, formAction, pending] = useActionState(
    kind === "quotation" ? sendQuotation : sendInvoice,
    idleAction
  );

  if (!to) {
    return (
      <p className="text-sm text-muted-foreground">
        No customer email address on this {kind}, so there is nothing to send to.
      </p>
    );
  }

  return (
    <form action={formAction}>
      <input
        type="hidden"
        name={kind === "quotation" ? "quotationId" : "invoiceId"}
        value={id}
      />
      <p className="mb-2 text-sm text-muted-foreground">
        Emails the {kind} to <span className="font-medium text-ink">{to}</span> with
        a private link.
        {kind === "quotation"
          ? " The status only moves to Sent if the provider accepts it."
          : ""}
      </p>
      <Button type="submit" disabled={pending || !emailConfigured}>
        {pending ? (
          <Loader2Icon aria-hidden className="size-3.5 animate-spin" />
        ) : (
          <SendIcon aria-hidden className="size-3.5" />
        )}
        Send {kind}
      </Button>
      {!emailConfigured ? (
        <p className="mt-2 text-sm text-destructive">
          Email is not configured, so this cannot send yet.
        </p>
      ) : null}
      <Result state={state} />
    </form>
  );
}

/**
 * The booking confirmation.
 *
 * Separated from "send quotation" and never automatic, because this is the
 * message that tells a customer their transfer is arranged. It should be sent
 * when a vehicle actually exists, not when a quotation was accepted.
 */
export function SendConfirmationForm({
  quotationId,
  to,
  emailConfigured,
}: {
  quotationId: string;
  to: string | null;
  emailConfigured: boolean;
}) {
  const [state, formAction, pending] = useActionState(
    sendBookingConfirmation,
    idleAction
  );

  if (!to) return null;

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="quotationId" value={quotationId} />
      <p className="text-sm text-muted-foreground">
        Confirms the booking to <span className="font-medium text-ink">{to}</span> and
        sets the enquiry to Confirmed. Send this only once a vehicle is actually
        arranged — it contains nothing beyond what you enter here and what is
        already on the quotation.
      </p>
      <div>
        <label
          htmlFor={`meet-${quotationId}`}
          className="mb-1 block text-xs font-medium tracking-wide text-muted-foreground uppercase"
        >
          Meeting instructions (optional)
        </label>
        <Textarea
          id={`meet-${quotationId}`}
          name="meetingInstructions"
          rows={3}
          placeholder="Where to meet the driver, and how they will make contact."
        />
      </div>
      <Button type="submit" disabled={pending || !emailConfigured}>
        {pending ? (
          <Loader2Icon aria-hidden className="size-3.5 animate-spin" />
        ) : (
          <SendIcon aria-hidden className="size-3.5" />
        )}
        Send booking confirmation
      </Button>
      <Result state={state} />
    </form>
  );
}

export function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          // Clipboard access can be refused; the link is shown in full beside
          // this button, so there is always a way to copy it by hand.
          setCopied(false);
        }
      }}
    >
      {copied ? (
        <CheckIcon aria-hidden className="size-3.5" />
      ) : (
        <CopyIcon aria-hidden className="size-3.5" />
      )}
      {copied ? "Copied" : "Copy link"}
    </Button>
  );
}

export function DeleteDocumentButton({
  kind,
  id,
  number,
}: {
  kind: "quotation" | "invoice";
  id: string;
  number: string;
}) {
  return (
    <form
      action={kind === "quotation" ? removeQuotation : removeInvoice}
      onSubmit={(event) => {
        if (
          !window.confirm(
            `Delete ${kind} ${number}? This cannot be undone. Any link already sent to the customer will stop working.`
          )
        ) {
          event.preventDefault();
        }
      }}
    >
      <input
        type="hidden"
        name={kind === "quotation" ? "quotationId" : "invoiceId"}
        value={id}
      />
      <Button type="submit" size="sm" variant="destructive">
        <Trash2Icon aria-hidden className="size-3.5" />
        Delete {kind}
      </Button>
    </form>
  );
}
