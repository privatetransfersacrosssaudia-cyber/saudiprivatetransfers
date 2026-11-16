"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileSignatureIcon,
  InboxIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MenuIcon,
  ReceiptIcon,
  SettingsIcon,
  XIcon,
} from "lucide-react";

import { cn } from "cn";
import { signOut } from "@/app/admin/_actions/auth";
import { can, roleLabels, type SessionUser } from "@/lib/crm/types";
import { site } from "@/lib/site";

/**
 * The CRM's chrome: sidebar on desktop, slide-over on small screens.
 *
 * A Client Component because the sidebar tracks the current path and the
 * mobile drawer holds open state. It is given the user by the layout rather
 * than reading the session itself — a Client Component cannot be trusted with
 * that read, and the narrow `SessionUser` is all it needs. Nothing here is a
 * permission check: `can()` is used to hide links that would only lead to a
 * refusal, and the server refuses regardless of what is rendered.
 */
const links: {
  href: string;
  label: string;
  icon: typeof InboxIcon;
  /** Match this path exactly; without it a prefix match would keep the
      dashboard highlighted on every page below it. */
  exact?: boolean;
}[] = [
  { href: "/admin/", label: "Dashboard", icon: LayoutDashboardIcon, exact: true },
  { href: "/admin/leads/", label: "Enquiries", icon: InboxIcon },
  { href: "/admin/quotations/", label: "Quotations", icon: FileSignatureIcon },
  { href: "/admin/invoices/", label: "Invoices", icon: ReceiptIcon },
];

const statusFilters = [
  "New",
  "Contacted",
  "Quoted",
  "Confirmed",
  "Completed",
  "Cancelled",
] as const;

function NavLink({
  href,
  label,
  icon: Icon,
  active,
  onNavigate,
}: {
  href: string;
  label: string;
  icon: typeof InboxIcon;
  active: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-brass text-ink"
          : "text-white/75 hover:bg-white/10 hover:text-white"
      )}
    >
      <Icon aria-hidden className="size-4 shrink-0" />
      {label}
    </Link>
  );
}

export function DeskShell({
  user,
  children,
}: {
  user: SessionUser;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const sidebar = (
    <div className="flex h-full flex-col bg-palm-deep">
      <div className="px-4 py-5">
        <p className="font-heading text-lg leading-tight text-white">
          {site.shortName}
        </p>
        <p className="mt-0.5 text-[0.65rem] font-semibold tracking-[0.2em] text-brass uppercase">
          Enquiry desk
        </p>
      </div>

      <nav aria-label="CRM" className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
        {links.map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            label={link.label}
            icon={link.icon}
            active={isActive(link.href, link.exact)}
            onNavigate={close}
          />
        ))}

        <p className="px-3 pt-5 pb-1 text-[0.65rem] font-semibold tracking-[0.18em] text-white/40 uppercase">
          By status
        </p>
        {statusFilters.map((status) => (
          <Link
            key={status}
            href={`/admin/leads/?status=${status}`}
            onClick={close}
            className="block rounded-lg px-3 py-1.5 text-sm text-white/65 transition-colors hover:bg-white/10 hover:text-white"
          >
            {status}
          </Link>
        ))}

        <p className="px-3 pt-5 pb-1 text-[0.65rem] font-semibold tracking-[0.18em] text-white/40 uppercase">
          Account
        </p>
        <NavLink
          href="/admin/settings/"
          label={can(user.role, "users:manage") ? "Settings & users" : "Settings"}
          icon={SettingsIcon}
          active={isActive("/admin/settings/")}
          onNavigate={close}
        />
      </nav>

      <div className="border-t border-white/15 px-4 py-4">
        <p className="truncate text-sm font-medium text-white">
          {user.name || user.email}
        </p>
        <p className="truncate text-xs text-white/55">
          {roleLabels[user.role]} · {user.email}
        </p>
        <form action={signOut} className="mt-3">
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogOutIcon aria-hidden className="size-4" />
            Sign out
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-sand">
      <aside className="hidden w-64 shrink-0 lg:block print:hidden">
        <div className="sticky top-0 h-screen">{sidebar}</div>
      </aside>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-ink/60"
            onClick={close}
          />
          <div className="absolute inset-y-0 left-0 w-64 shadow-xl">{sidebar}</div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3 lg:hidden print:hidden">
          <span className="font-heading text-base text-ink">
            {site.shortName}
          </span>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="rounded-lg p-2 text-ink hover:bg-muted"
          >
            {open ? (
              <XIcon aria-hidden className="size-5" />
            ) : (
              <MenuIcon aria-hidden className="size-5" />
            )}
          </button>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 print:p-0">{children}</main>
      </div>
    </div>
  );
}
