// DATA REQUIREMENTS:
// External link to GreenFreightAcademy. No dynamic data on this page.

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Academy",
};

export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container max-w-4xl">
        <div className="mb-16">
          <span className="badge mb-4">Academy</span>
          <h1 className="mb-6">Building capability across the green freight ecosystem</h1>
          <p className="text-muted-foreground leading-relaxed text-lg max-w-3xl">
            The Academy section connects to GreenFreightAcademy — the enterprise capability and performance engine that builds skills across drivers, managers, procurement teams, and transition leaders.
          </p>
        </div>

        {/* TODO: Asif to implement — replace with live data */}
        <div className="card text-center py-16">
          <p className="text-muted-foreground text-sm mb-4">
            [Content to be populated with live data]
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            DATA REQUIREMENTS: External link to GreenFreightAcademy. No dynamic data on this page.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/partner-with-tag" className="btn-primary">
            Partner with TAG <ArrowRight size={16} />
          </Link>
          <Link href="/contact" className="btn-outline">
            Start a conversation
          </Link>
        </div>
      </div>
    </div>
  );
}
