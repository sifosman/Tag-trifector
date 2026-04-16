/**
 * GreenFreightAcademy — Pricing Page
 *
 * DATA REQUIREMENTS:
 * - All pricing data is static from lib/constants.ts (PROGRAMMES array)
 * - Payment processing: TODO: Asif to implement Paystack integration
 * - Debit order setup: TODO: Asif to implement debit order flow for monthly programmes
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Info } from "lucide-react";
import { PROGRAMMES, URGENT_CPD_FEE_LABEL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent, adoption-friendly pricing across all GreenFreightAcademy programmes. Driver programmes from R35 per driver per month.",
};

export default function PricingPage() {
  const monthlyProgrammes = PROGRAMMES.filter((p) => p.pricingModel === "monthly-per-driver");
  const onceOffProgrammes = PROGRAMMES.filter((p) => p.pricingModel === "once-off");

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
        <div className="container-gfa" style={{ textAlign: "center" }}>
          <span className="pill-badge pill-green" style={{ marginBottom: "1.25rem", display: "inline-flex" }}>
            Pricing
          </span>
          <h1 style={{ maxWidth: "600px", margin: "0 auto 1.25rem" }}>
            Built for scale, priced for adoption
          </h1>
          <p style={{ maxWidth: "560px", margin: "0 auto", fontSize: "1.0625rem", color: "var(--text-secondary)" }}>
            GFA pricing is designed to remove the cost barrier to fleet-wide capability building. The value is
            not low. The barrier is low.
          </p>
        </div>
      </section>

      {/* Monthly programmes */}
      <section style={{ padding: "4rem 0", background: "var(--color-slate-900)" }}>
        <div className="container-gfa">
          <div style={{ marginBottom: "2.5rem" }}>
            <span className="pill-badge pill-green" style={{ marginBottom: "1rem", display: "inline-flex" }}>
              Monthly subscription
            </span>
            <h2>Driver development programmes</h2>
            <p style={{ marginTop: "0.75rem", maxWidth: "560px", color: "var(--text-secondary)" }}>
              First year committed to cover training, evaluation, and certification. Thereafter cancelable with
              one month's notice. Quarterly CPD included throughout.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {monthlyProgrammes.map((prog) => (
              <div
                key={prog.id}
                style={{
                  padding: "2rem",
                  background: "rgba(34, 197, 94, 0.04)",
                  border: "1px solid rgba(34, 197, 94, 0.15)",
                  borderRadius: "1rem",
                }}
              >
                <h3 style={{ fontSize: "1.125rem", marginBottom: "0.75rem" }}>{prog.title}</h3>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "2.25rem",
                    color: "var(--color-green-400)",
                    lineHeight: 1,
                    marginBottom: "0.25rem",
                  }}
                >
                  R35
                </div>
                <div style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "1.5rem" }}>
                  per driver per month
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.75rem" }}>
                  {[
                    "Full training programme",
                    "Evaluation and assessment",
                    "Recognised certification",
                    "Quarterly CPD included",
                    "Progress reporting for management",
                    "Useful for RTMS and compliance",
                  ].map((item) => (
                    <li
                      key={item}
                      style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}
                    >
                      <CheckCircle2 size={14} style={{ color: "var(--color-green-400)", marginTop: "0.2rem", flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <Link href={`/contact?type=fleet-company&programme=${prog.slug}`} className="btn-primary" style={{ fontSize: "0.875rem" }}>
                    Book for your company
                  </Link>
                  <Link href={`/contact?type=individual-learner&programme=${prog.slug}`} className="btn-secondary" style={{ fontSize: "0.875rem" }}>
                    Individual enrolment
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Commitment note */}
          <div
            style={{
              marginTop: "1.5rem",
              padding: "1rem 1.25rem",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "0.75rem",
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem",
            }}
          >
            <Info size={16} style={{ color: "var(--color-green-400)", marginTop: "0.15rem", flexShrink: 0 }} />
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
              <strong style={{ color: "white" }}>Commitment and cancellation:</strong> The first year is committed
              to cover the full training, evaluation, and certification cycle. After the first year, the subscription
              is cancelable with one month's notice. Debit order setup available for company accounts.
              {/* TODO: Asif to implement debit order setup flow */}
            </p>
          </div>
        </div>
      </section>

      {/* Once-off programmes */}
      <section style={{ padding: "4rem 0", background: "var(--bg-section-mid)" }}>
        <div className="container-gfa">
          <div style={{ marginBottom: "2.5rem" }}>
            <span className="pill-badge pill-teal" style={{ marginBottom: "1rem", display: "inline-flex" }}>
              Once-off enrolment
            </span>
            <h2>Management, procurement, and transition programmes</h2>
            <p style={{ marginTop: "0.75rem", maxWidth: "560px", color: "var(--text-secondary)" }}>
              Structured programmes for managers, procurement teams, and transition leaders. Payment on enrolment.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {onceOffProgrammes.map((prog) => (
              <div
                key={prog.id}
                style={{
                  padding: "1.75rem",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "1rem",
                }}
              >
                <h4 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>{prog.title}</h4>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "1.75rem",
                    color: "var(--color-teal-400)",
                    lineHeight: 1,
                    marginBottom: "0.25rem",
                  }}
                >
                  {prog.priceLabel}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "1.25rem" }}>
                  {prog.audienceLabel} · {prog.durationLabel}
                </div>
                <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "1.25rem", lineHeight: 1.6 }}>
                  {prog.shortDescription}
                </p>
                <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
                  <Link href={`/contact?type=fleet-company&programme=${prog.slug}`} className="btn-secondary" style={{ fontSize: "0.8rem", padding: "0.5rem 1rem" }}>
                    Book seats
                  </Link>
                  <Link href={`/programmes#${prog.slug}`} className="btn-ghost" style={{ fontSize: "0.8rem" }}>
                    Programme details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CPD add-on */}
      <section style={{ padding: "3rem 0", background: "var(--color-slate-900)" }}>
        <div className="container-gfa">
          <div
            style={{
              padding: "2rem",
              background: "rgba(248, 113, 113, 0.04)",
              border: "1px solid rgba(248, 113, 113, 0.12)",
              borderRadius: "1rem",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.25rem 0.75rem",
                  background: "rgba(248, 113, 113, 0.1)",
                  color: "#f87171",
                  borderRadius: "9999px",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-display)",
                  marginBottom: "0.875rem",
                }}
              >
                Optional add-on
              </div>
              <h3 style={{ fontSize: "1.125rem", marginBottom: "0.5rem" }}>Urgent CPD intervention</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, maxWidth: "480px" }}>
                When a current operational risk or incident pattern needs to be addressed immediately — request a
                priority CPD intervention pushed to your drivers within the month.
              </p>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.5rem", color: "#f87171" }}>
                {URGENT_CPD_FEE_LABEL}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
                per urgent dispatch
              </div>
              <Link href="/dashboard/cpd-submission" className="btn-ghost" style={{ color: "#f87171", fontSize: "0.875rem" }}>
                Submit urgent CPD
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

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
            Ready to get started?
          </h2>
          <p style={{ maxWidth: "500px", margin: "0 auto 2.5rem", color: "var(--text-secondary)" }}>
            Book for your company, enrol as an individual, or get in touch to discuss the right programme mix
            for your business.
          </p>
          <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact?type=fleet-company" className="btn-primary">
              Book for your company
              <ArrowRight size={16} />
            </Link>
            <Link href="/programmes" className="btn-secondary">
              Explore programmes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
