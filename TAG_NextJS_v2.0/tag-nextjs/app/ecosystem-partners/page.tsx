// DATA REQUIREMENTS:
// GET /api/partners → Partner[] (see types/index.ts). TODO: Asif to implement.

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Ecosystem Partners",
};

export default function EcosystemPartnersPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container max-w-4xl">
        <div className="mb-16">
          <span className="badge mb-4">Ecosystem</span>
          <h1 className="mb-6">The partners shaping green freight transformation</h1>
          <p className="text-muted-foreground leading-relaxed text-lg max-w-3xl">
            TAG works with a growing ecosystem of DFIs, industry bodies, public-sector actors, technology partners, and implementation organisations committed to practical green freight transformation.
          </p>
        </div>

        {/* TODO: Asif to implement — replace with live data */}
        <div className="card text-center py-16">
          <p className="text-muted-foreground text-sm mb-4">
            [Content to be populated with live data]
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            DATA REQUIREMENTS: GET /api/partners → Partner[] (see types/index.ts). TODO: Asif to implement.
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
