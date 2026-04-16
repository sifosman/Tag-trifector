/**
 * GreenFreightAcademy — Programmes Page
 *
 * DATA REQUIREMENTS:
 * - Programme list: static from lib/constants.ts (PROGRAMMES array)
 *   No API call required — all programme data is static content
 * - Enrolment CTA links to /contact?type=fleet-company or /contact?type=individual-learner
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { PROGRAMMES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Programmes",
  description:
    "Six training programmes covering every level of the road freight enterprise — from professional drivers to transition leaders.",
};

export default function ProgrammesPage() {
  const tiers = [
    {
      id: "workforce",
      label: "Tier 1 — Workforce capability",
      description: "For drivers and operational staff",
      color: "#22c55e",
      programmes: PROGRAMMES.filter((p) => p.tier === "workforce"),
    },
    {
      id: "enterprise",
      label: "Tier 2 — Enterprise capability",
      description: "For managers, staff, and procurement teams",
      color: "#2dd4bf",
      programmes: PROGRAMMES.filter((p) => p.tier === "enterprise"),
    },
    {
      id: "transition",
      label: "Tier 3 — Transition capability",
      description: "For transition and sustainability leaders",
      color: "#60a5fa",
      programmes: PROGRAMMES.filter((p) => p.tier === "transition"),
    },
  ];

  return (
    <div style={{ paddingTop: "5rem", background: "var(--color-slate-900)", minHeight: "100vh" }}>
      {/* Header */}
      <section
        style={{
          padding: "5rem 0 4rem",
          background: "linear-gradient(160deg, #0a1628 0%, #0f1f3d 100%)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div className="container-gfa">
          <span className="pill-badge pill-green" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>
            Programme architecture
          </span>
          <h1 style={{ maxWidth: "640px", marginBottom: "1.25rem" }}>
            Training pathways across the freight enterprise
          </h1>
          <p style={{ maxWidth: "580px", fontSize: "1.0625rem", color: "var(--text-secondary)" }}>
            Six programmes covering every level of the road freight business — from professional drivers and
            eco-driving through to management, procurement, and electric truck transition.
          </p>
        </div>
      </section>

      {/* Tiers */}
      {tiers.map((tier, tierIndex) => (
        <section
          key={tier.id}
          id={tier.id}
          style={{
            padding: "4rem 0",
            background: tierIndex % 2 === 0 ? "var(--color-slate-900)" : "var(--bg-section-mid)",
          }}
        >
          <div className="container-gfa">
            {/* Tier header */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}>
              <div style={{ height: "3px", width: "3rem", background: tier.color, borderRadius: "2px" }} />
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: tier.color,
                  }}
                >
                  {tier.label}
                </div>
                <div style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>{tier.description}</div>
              </div>
            </div>

            {/* Programme cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {tier.programmes.map((prog) => (
                <div
                  key={prog.id}
                  id={prog.slug}
                  style={{
                    padding: "2rem",
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${tier.color}18`,
                    borderRadius: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                  }}
                >
                  {/* Title and price */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                    <h3 style={{ fontSize: "1.125rem", lineHeight: 1.3, flex: 1 }}>{prog.title}</h3>
                    <span
                      style={{
                        padding: "0.3rem 0.75rem",
                        background: `${tier.color}15`,
                        color: tier.color,
                        borderRadius: "0.5rem",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        fontFamily: "var(--font-display)",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {prog.priceLabel}
                    </span>
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                    {prog.fullDescription}
                  </p>

                  {/* Outcomes */}
                  <div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        marginBottom: "0.75rem",
                      }}
                    >
                      What participants gain
                    </div>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {prog.outcomes.map((outcome) => (
                        <li
                          key={outcome}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.5rem",
                            fontSize: "0.875rem",
                            color: "var(--text-secondary)",
                          }}
                        >
                          <CheckCircle2
                            size={14}
                            style={{ color: tier.color, marginTop: "0.2rem", flexShrink: 0 }}
                          />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Meta */}
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    <span className="pill-badge pill-white" style={{ fontSize: "0.7rem" }}>
                      {prog.audienceLabel}
                    </span>
                    <span className="pill-badge pill-white" style={{ fontSize: "0.7rem" }}>
                      {prog.durationLabel}
                    </span>
                    <span className="pill-badge pill-white" style={{ fontSize: "0.7rem" }}>
                      {prog.deliveryModel === "online-self-paced"
                        ? "Online — self-paced"
                        : prog.deliveryModel === "blended"
                        ? "Blended delivery"
                        : prog.deliveryModel}
                    </span>
                  </div>

                  {/* CTAs */}
                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "auto" }}>
                    <Link
                      href={`/contact?type=fleet-company&programme=${prog.slug}`}
                      className="btn-primary"
                      style={{ fontSize: "0.8rem", padding: "0.5rem 1rem" }}
                    >
                      Book for your company
                    </Link>
                    <Link
                      href={`/contact?type=individual-learner&programme=${prog.slug}`}
                      className="btn-ghost"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Individual enrolment
                      <ChevronRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section
        style={{
          padding: "5rem 0",
          background: "linear-gradient(135deg, #0f1f3d 0%, #0a1628 100%)",
          borderTop: "1px solid var(--border-subtle)",
          textAlign: "center",
        }}
      >
        <div className="container-gfa">
          <h2 style={{ maxWidth: "560px", margin: "0 auto 1.25rem" }}>
            Ready to build capability across your business?
          </h2>
          <p style={{ maxWidth: "500px", margin: "0 auto 2.5rem", color: "var(--text-secondary)" }}>
            Book for your company, enrol as an individual, or get in touch to discuss the right programme mix.
          </p>
          <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact?type=fleet-company" className="btn-primary">
              Book for your company
              <ArrowRight size={16} />
            </Link>
            <Link href="/pricing" className="btn-secondary">
              View pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
