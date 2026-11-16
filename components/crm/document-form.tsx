"use client";

import { useActionState, useState } from "react";
import { AlertTriangleIcon, CheckIcon, Loader2Icon, PlusIcon, XIcon } from "lucide-react";

import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveInvoice, saveQuotation } from "@/app/admin/_actions/documents";
import { idleAction, type ActionState } from "@/lib/crm/action-state";
import {
  PAYMENT_STATUSES,
  lineItemsTotal,
  type Invoice,
  type LineItem,
  type Quotation,
} from "@/lib/crm/types";

/**
 * The quotation and invoice editor.
 *
 * One component for both, because they differ by a handful of fields and
 * keeping two near-identical editors in step is how the two drift apart. The
 * `kind` prop decides which extra fields appear and which action it posts to.
 *
 * Line items are a repeating set of flat inputs named `item-description-0`,
 * `item-amount-0` and so on, rather than nested names. A plain HTML form has
 * no nested structure, and keeping the names flat is what lets this submit and
 * be parsed identically with or without JavaScript.
 */

const labelClass =
  "mb-1 block text-xs font-medium tracking-wide text-muted-foreground uppercase";

const selectClass =
  "h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm text-ink outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

function Result({ state }: { state: ActionState }) {
  if (!state.message) return null;
  return (
    <p
      role="status"
      className={cn(
        "flex items-start gap-1.5 text-sm",
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

function TextField({
  name,
  label,
  defaultValue,
  type = "text",
  placeholder,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={`doc-${name}`} className={labelClass}>
        {label}
      </label>
      <Input
        id={`doc-${name}`}
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className="h-9"
      />
    </div>
  );
}

const EMPTY_ITEM: LineItem = {
  description: "",
  vehicleType: null,
  passengers: null,
  luggage: null,
  amount: 0,
};

export function DocumentForm({
  kind,
  existing,
  leadDefaults,
  prefill,
}: {
  kind: "quotation" | "invoice";
  /** An existing document being edited. Its presence is what makes this a save. */
  existing?: Quotation | Invoice;
  /**
   * Starting values for a NEW document raised from a quotation — its lines,
   * currency and notes. Kept separate from `existing` so a new document is
   * never mistaken for an edit: that distinction decides whether the form
   * posts an id, and posting an empty one would silently create a duplicate.
   */
  prefill?: {
    quotationId?: string;
    lineItems?: LineItem[];
    currency?: string;
    notes?: string | null;
  };
  /** Pre-fills a new document from the enquiry it is being raised against. */
  leadDefaults?: {
    leadId: string;
    clientName: string | null;
    clientEmail: string | null;
    clientPhone: string | null;
    locale: "en" | "ar";
    serviceType: string | null;
    pickupLocation: string | null;
    dropoffLocation: string | null;
    date: string | null;
    time: string | null;
    passengers: string | null;
    luggage: string | null;
    vehicleType: string | null;
    flightNumber: string | null;
  };
}) {
  const isQuotation = kind === "quotation";
  const [state, formAction, pending] = useActionState(
    isQuotation ? saveQuotation : saveInvoice,
    idleAction
  );

  const quotation = isQuotation ? (existing as Quotation | undefined) : undefined;

  const [items, setItems] = useState<LineItem[]>(
    existing?.lineItems?.length
      ? existing.lineItems
      : prefill?.lineItems?.length
        ? prefill.lineItems
        : [EMPTY_ITEM]
  );

  const defaults = {
    clientName: existing?.clientName ?? leadDefaults?.clientName ?? "",
    clientEmail: existing?.clientEmail ?? leadDefaults?.clientEmail ?? "",
    clientPhone: existing?.clientPhone ?? leadDefaults?.clientPhone ?? "",
    locale: existing?.locale ?? leadDefaults?.locale ?? "en",
    serviceType: existing?.serviceType ?? leadDefaults?.serviceType ?? "",
    pickupLocation: existing?.pickupLocation ?? leadDefaults?.pickupLocation ?? "",
    dropoffLocation: existing?.dropoffLocation ?? leadDefaults?.dropoffLocation ?? "",
    date: existing?.date ?? leadDefaults?.date ?? "",
    time: existing?.time ?? leadDefaults?.time ?? "",
    currency: existing?.currency ?? prefill?.currency ?? "SAR",
    notes: existing?.notes ?? prefill?.notes ?? "",
  };

  const total = lineItemsTotal(items);

  return (
    <form action={formAction} className="space-y-6">
      {existing ? (
        <input
          type="hidden"
          name={isQuotation ? "quotationId" : "invoiceId"}
          value={existing.id}
        />
      ) : null}
      <input
        type="hidden"
        name="leadId"
        value={existing?.leadId ?? leadDefaults?.leadId ?? ""}
      />
      {prefill?.quotationId ? (
        <input type="hidden" name="quotationId" value={prefill.quotationId} />
      ) : null}

      <section>
        <h3 className="mb-3 font-heading text-base text-ink">Customer</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField name="clientName" label="Name" defaultValue={defaults.clientName} />
          <TextField
            name="clientEmail"
            label="Email"
            type="email"
            defaultValue={defaults.clientEmail}
          />
          <TextField name="clientPhone" label="Phone" defaultValue={defaults.clientPhone} />
          <div>
            <label htmlFor="doc-locale" className={labelClass}>
              Language of the document
            </label>
            <select
              id="doc-locale"
              name="locale"
              defaultValue={defaults.locale}
              className={selectClass}
            >
              <option value="en">English</option>
              <option value="ar">Arabic</option>
            </select>
          </div>
        </div>
      </section>

      <section>
        <h3 className="mb-3 font-heading text-base text-ink">Journey</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <TextField
            name="serviceType"
            label="Service"
            defaultValue={defaults.serviceType}
          />
          <TextField
            name="pickupLocation"
            label="Pick-up"
            defaultValue={defaults.pickupLocation}
          />
          <TextField
            name="dropoffLocation"
            label="Destination"
            defaultValue={defaults.dropoffLocation}
          />
          <TextField name="date" label="Date" defaultValue={defaults.date} />
          <TextField name="time" label="Time" defaultValue={defaults.time} />
          {isQuotation ? (
            <>
              <TextField
                name="passengers"
                label="Passengers"
                defaultValue={quotation?.passengers ?? leadDefaults?.passengers ?? ""}
              />
              <TextField
                name="luggage"
                label="Luggage"
                defaultValue={quotation?.luggage ?? leadDefaults?.luggage ?? ""}
              />
              <TextField
                name="vehicleType"
                label="Vehicle"
                defaultValue={quotation?.vehicleType ?? leadDefaults?.vehicleType ?? ""}
              />
              <TextField
                name="flightNumber"
                label="Flight number"
                defaultValue={quotation?.flightNumber ?? leadDefaults?.flightNumber ?? ""}
              />
            </>
          ) : null}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-heading text-base text-ink">Lines</h3>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setItems((current) => [...current, { ...EMPTY_ITEM }])}
          >
            <PlusIcon aria-hidden className="size-3.5" />
            Add line
          </Button>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="grid gap-3 rounded-xl border border-border bg-muted/40 p-3 sm:grid-cols-[1fr_8rem_8rem_8rem_9rem_auto]"
            >
              <div>
                <label htmlFor={`item-description-${index}`} className={labelClass}>
                  Description
                </label>
                <Input
                  id={`item-description-${index}`}
                  name={`item-description-${index}`}
                  defaultValue={item.description}
                  placeholder="Private transfer, Jeddah airport to Makkah"
                  className="h-9"
                />
              </div>
              <div>
                <label htmlFor={`item-vehicle-${index}`} className={labelClass}>
                  Vehicle
                </label>
                <Input
                  id={`item-vehicle-${index}`}
                  name={`item-vehicle-${index}`}
                  defaultValue={item.vehicleType ?? ""}
                  className="h-9"
                />
              </div>
              <div>
                <label htmlFor={`item-passengers-${index}`} className={labelClass}>
                  Pax
                </label>
                <Input
                  id={`item-passengers-${index}`}
                  name={`item-passengers-${index}`}
                  defaultValue={item.passengers ?? ""}
                  className="h-9"
                />
              </div>
              <div>
                <label htmlFor={`item-luggage-${index}`} className={labelClass}>
                  Bags
                </label>
                <Input
                  id={`item-luggage-${index}`}
                  name={`item-luggage-${index}`}
                  defaultValue={item.luggage ?? ""}
                  className="h-9"
                />
              </div>
              <div>
                <label htmlFor={`item-amount-${index}`} className={labelClass}>
                  Amount
                </label>
                <Input
                  id={`item-amount-${index}`}
                  name={`item-amount-${index}`}
                  type="number"
                  step="0.01"
                  min="0"
                  defaultValue={item.amount || ""}
                  className="h-9"
                  onChange={(event) => {
                    const value = Number(event.currentTarget.value);
                    setItems((current) =>
                      current.map((row, rowIndex) =>
                        rowIndex === index
                          ? { ...row, amount: Number.isFinite(value) ? value : 0 }
                          : row
                      )
                    );
                  }}
                />
              </div>
              <div className="flex items-end">
                <Button
                  type="button"
                  size="icon-sm"
                  variant="ghost"
                  aria-label={`Remove line ${index + 1}`}
                  disabled={items.length === 1}
                  onClick={() =>
                    setItems((current) => current.filter((_, i) => i !== index))
                  }
                >
                  <XIcon aria-hidden className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-4 border-t border-border pt-4">
          <div className="w-28">
            <label htmlFor="doc-currency" className={labelClass}>
              Currency
            </label>
            <Input
              id="doc-currency"
              name="currency"
              defaultValue={defaults.currency}
              className="h-9"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Total{" "}
            <span className="font-heading text-xl text-ink tabular-nums">
              {total.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <span className="ms-2 text-xs">
              recalculated from the lines when saved
            </span>
          </p>
        </div>
      </section>

      <section>
        <h3 className="mb-3 font-heading text-base text-ink">Terms</h3>
        <div className="grid gap-4">
          {isQuotation ? (
            <>
              <TextField
                name="validUntil"
                label="Valid until (YYYY-MM-DD)"
                defaultValue={quotation?.validUntil ?? ""}
                placeholder="2026-12-31"
              />
              <div>
                <label htmlFor="doc-paymentTerms" className={labelClass}>
                  Payment terms
                </label>
                <Textarea
                  id="doc-paymentTerms"
                  name="paymentTerms"
                  rows={2}
                  defaultValue={quotation?.paymentTerms ?? ""}
                />
              </div>
              <div>
                <label htmlFor="doc-cancellationPolicy" className={labelClass}>
                  Cancellation policy
                </label>
                <Textarea
                  id="doc-cancellationPolicy"
                  name="cancellationPolicy"
                  rows={2}
                  defaultValue={quotation?.cancellationPolicy ?? ""}
                />
              </div>
              <div>
                <label htmlFor="doc-specialRequests" className={labelClass}>
                  Special requests
                </label>
                <Textarea
                  id="doc-specialRequests"
                  name="specialRequests"
                  rows={2}
                  defaultValue={quotation?.specialRequests ?? ""}
                />
              </div>
            </>
          ) : (
            <div>
              <label htmlFor="doc-paymentStatus" className={labelClass}>
                Payment status
              </label>
              <select
                id="doc-paymentStatus"
                name="paymentStatus"
                defaultValue={(existing as Invoice | undefined)?.paymentStatus ?? "Unpaid"}
                className={cn(selectClass, "max-w-xs")}
              >
                {PAYMENT_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label htmlFor="doc-notes" className={labelClass}>
              Notes shown to the customer
            </label>
            <Textarea
              id="doc-notes"
              name="notes"
              rows={2}
              defaultValue={defaults.notes}
            />
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
        <Result state={state} />
        <Button type="submit" disabled={pending} className="ms-auto shrink-0">
          {pending ? <Loader2Icon aria-hidden className="size-3.5 animate-spin" /> : null}
          {existing ? "Save changes" : `Create ${kind}`}
        </Button>
      </div>
    </form>
  );
}
