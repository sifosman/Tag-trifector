import { ReactNode } from "react";

// Portal layout wrapper — authentication guard goes here
// TODO: Asif — add Supabase session check here; redirect to /login if no session

export default function PortalLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
