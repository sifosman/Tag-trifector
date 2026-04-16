// DATA REQUIREMENTS:
// No dynamic data required. Content is static.

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Green Freight Action Plans",
};

export default function GreenFreightPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container max-w-4xl">
        <div className="mb-16">
          <span className="badge mb-4">Green Freight</span>
          <h1 className="mb-6">Structured pathways to green freight transformation</h1>
          <p className="text-muted-foreground leading-relaxed text-lg max-w-3xl">
            TAG's Green Freight Action Plan framework provides a structured, practical approach to guiding national and industry-level transformation — from stakeholder alignment and baseline assessment through to implementation roadmap and monitoring.
          </p>
        </div>

        {/* TODO: Asif to implement — replace with live data */}
        <div className="card text-center py-16">
          <p className="text-muted-foreground text-sm mb-4">
            [Content to be populated with live data]
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            DATA REQUIREMENTS: No dynamic data required. Content is static.
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
