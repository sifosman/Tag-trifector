// DATA REQUIREMENTS:
// No dynamic data required. Content is static.

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "TAG's Work",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container max-w-4xl">
        <div className="mb-16">
          <span className="badge mb-4">TAG's Work</span>
          <h1 className="mb-6">From ambition to implementation support</h1>
          <p className="text-muted-foreground leading-relaxed text-lg max-w-3xl">
            TAG helps shape the conditions for green freight transformation through practical frameworks, strategic interventions, and coordinated engagement across the ecosystem.
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
