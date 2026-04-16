import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company Dashboard",
  description: "Manage your company's GreenFreightAcademy enrolments, track progress, and access reports.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
