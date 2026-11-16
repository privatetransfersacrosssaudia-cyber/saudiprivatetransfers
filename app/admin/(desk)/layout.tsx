import { DeskShell } from "@/components/crm/desk-shell";
import { requireUser } from "@/lib/crm/auth";

/**
 * Everything below this layout requires a session.
 *
 * The proxy already turned anonymous visitors away, but that check only
 * verifies a cookie signature. This one re-reads the account from the
 * database, so a deactivated or deleted account loses access immediately
 * rather than when its token expires. Each page below calls the data access
 * layer again for its own permission, because a layout guard protects the
 * chrome, not the data.
 */
export const instant = false;

export default async function DeskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();
  return <DeskShell user={user}>{children}</DeskShell>;
}
