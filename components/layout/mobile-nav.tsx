"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDownIcon, MenuIcon } from "lucide-react";

import { cn } from "cn";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { primaryNav, quoteCta, type NavGroup } from "@/lib/content/navigation";
import { ui } from "@/lib/i18n/dictionary";
import { direction, type Locale } from "@/lib/i18n/config";

/**
 * The only interactive part of the header on small screens, kept in its own
 * client component so the rest of the header stays server-rendered. The sheet
 * slides in from the inline-end edge, which follows the reading direction.
 *
 * Groups that have children collapse. Flat, the menu ran to forty-odd links
 * and the last three — Services, How it works, FAQ — sat below eighteen
 * destinations where nobody scrolled to find them. Collapsed, the whole menu
 * is seven rows and fits one screen.
 *
 * Built on `<details>` rather than React state on purpose: it is a disclosure
 * widget, which is exactly what the element is for. That buys the ARIA
 * wiring, Enter/Space, and find-in-page expansion for free, and it works
 * before hydration. The shared `name` makes it an exclusive accordion in
 * browsers that support it — opening one group closes the last — and in
 * browsers that do not, two groups can sit open at once, which is a milder
 * failure than any state we would have written ourselves.
 */
export function MobileNav({
  locale,
  className,
}: {
  locale: Locale;
  /** Set by the header to invert the trigger over a dark hero. */
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const close = () => setOpen(false);

  const groups = primaryNav(locale);
  const cta = quoteCta(locale);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label={ui.openMenu[locale]}
        className={cn(
          buttonVariants({ variant: "outline", size: "icon-lg" }),
          "lg:hidden",
          className
        )}
      >
        <MenuIcon aria-hidden />
      </SheetTrigger>

      <SheetContent
        side={direction[locale] === "rtl" ? "left" : "right"}
        className="w-full gap-0 p-0 sm:max-w-sm"
      >
        <SheetHeader className="border-b px-5 py-4">
          <SheetTitle className="text-start font-heading text-xl font-normal">
            {ui.menu[locale]}
          </SheetTitle>
        </SheetHeader>

        <nav
          aria-label={ui.mainNavigation[locale]}
          className="flex-1 overflow-y-auto px-5 py-5"
        >
          <ul className="flex flex-col gap-1">
            {groups.map((group) => (
              <li key={group.label}>
                {hasChildren(group) ? (
                  <NavGroupDisclosure group={group} onNavigate={close} />
                ) : (
                  <Link
                    href={group.href ?? "/"}
                    onClick={close}
                    className={rowClass}
                  >
                    {group.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 border-t px-5 py-4">
          <Link
            href={cta.href}
            onClick={close}
            className="flex h-11 flex-1 items-center justify-center rounded-lg bg-palm px-5 text-sm font-semibold text-white transition-colors hover:bg-palm-deep"
          >
            {cta.label}
          </Link>
          <LanguageSwitcher locale={locale} className="h-11 shrink-0" />
        </div>
      </SheetContent>
    </Sheet>
  );
}

/** One row of the menu, whether it is a link or a group header. */
const rowClass =
  "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-start text-[0.95rem] font-semibold text-ink transition-colors outline-none hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring/60";

/** A group worth collapsing: one that has at least one link to show. */
function hasChildren(group: NavGroup) {
  return visibleItems(group).length > 0;
}

/** Routes that do not exist yet are omitted rather than rendered dead. */
function visibleItems(group: NavGroup) {
  return group.items?.filter((item) => !item.planned) ?? [];
}

function NavGroupDisclosure({
  group,
  onNavigate,
}: {
  group: NavGroup;
  onNavigate: () => void;
}) {
  const items = visibleItems(group);

  return (
    /*
      `name` makes this an exclusive accordion. `group/nav` is what turns the
      chevron over, via `group-open/nav:` — the open state lives on the
      element, so no JavaScript reads or writes it.
    */
    <details name="mobile-nav" className="group/nav">
      <summary
        className={cn(
          rowClass,
          // Both are needed: Safari and older WebKit still draw the triangle
          // through the pseudo-element even with `list-style: none`.
          "cursor-pointer list-none select-none [&::-webkit-details-marker]:hidden"
        )}
      >
        <span>{group.label}</span>
        <span className="flex shrink-0 items-center gap-2">
          <span className="numeric text-xs font-medium text-muted-foreground">
            {items.length}
          </span>
          <ChevronDownIcon
            aria-hidden
            className="size-4 text-muted-foreground transition-transform duration-200 group-open/nav:rotate-180"
          />
        </span>
      </summary>

      <ul className="mt-0.5 mb-2 ms-3 flex flex-col gap-0.5 border-s ps-3">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className="block rounded-md px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-ink"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
