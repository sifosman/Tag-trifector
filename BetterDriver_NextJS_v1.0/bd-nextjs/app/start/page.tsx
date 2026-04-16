import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { PROGRAMMES } from "@/lib/constants";
import { ArrowRight, CheckCircle2, User, Building2 } from "lucide-react";

// DATA REQUIREMENTS:
// - programmes: Programme[] — from lib/constants.ts (static)
// - selectedProgramme: string | null — from URL search param ?programme=slug
// - No backend call required on this page; enrolment form submits to Server Action
// TODO: Asif — implement the enrolEnquiry Server Action in /app/start/actions.ts

export const metadata: Metadata = {
  title: "Get Started",
  description: "Enrol in a BetterDriver training programme. Choose your programme and start your professional development today.",
};

export default async function StartPage({
  searchParams,
}: {
  searchParams: Promise<{ programme?: string }>;
}) {
  const params = await searchParams;
  const selectedProgramme = PROGRAMMES.find((p) => p.slug === params.programme) ?? null;

  return (
    <div style={{ minHeight: "100vh", background: "#111827", display: "flex", flexDirection: "column" }}>
      <Navigation />

      <main style={{ flex: 1, paddingTop: "6rem" }}>
        {/* Header */}
        <section style={{ padding: "3rem 0 2rem", background: "#0D1520", borderBottom: "1px solid #2d3a4f" }}>
          <div className="container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
            <div className="pill pill-amber" style={{ marginBottom: "1rem" }}>Get started</div>
            <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "clamp(1.75rem, 4vw, 2.75rem)", color: "#F9FAFB", marginBottom: "0.75rem" }}>
              Enrol in your programme
            </h1>
            <p style={{ color: "#9CA3AF", maxWidth: 560, lineHeight: 1.7 }}>
              Choose your programme below. You can enrol as an individual driver or through your company. The training, certification, and price are the same either way.
            </p>
          </div>
        </section>

        {/* Enrolment type */}
        <section style={{ padding: "3rem 0" }}>
          <div className="container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "#F9FAFB", marginBottom: "1.5rem" }}>
              How are you enrolling?
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", marginBottom: "3rem" }}>
              <div className="card" style={{ borderColor: "rgba(245, 158, 11, 0.25)", cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "0.75rem" }}>
                  <div style={{ width: 40, height: 40, background: "rgba(245, 158, 11, 0.12)", border: "1px solid rgba(245, 158, 11, 0.25)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", color: "#F59E0B" }}>
                    <User size={18} />
                  </div>
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#F9FAFB", margin: 0 }}>Individual driver</h3>
                </div>
                <p style={{ color: "#9CA3AF", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>
                  Enrol yourself directly. Pay monthly. Start immediately. Your certificate belongs to you.
                </p>
              </div>
              <div className="card" style={{ cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "0.75rem" }}>
                  <div style={{ width: 40, height: 40, background: "rgba(59, 130, 246, 0.12)", border: "1px solid rgba(59, 130, 246, 0.25)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", color: "#3B82F6" }}>
                    <Building2 size={18} />
                  </div>
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#F9FAFB", margin: 0 }}>Company enrolment</h3>
                </div>
                <p style={{ color: "#9CA3AF", fontSize: "0.875rem", lineHeight: 1.6, margin: 0 }}>
                  Your company manages enrolment through GreenFreightAcademy. You receive a notification to start.
                </p>
              </div>
            </div>

            {/* Programme selection */}
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "#F9FAFB", marginBottom: "1.5rem" }}>
              Choose your programme
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem", marginBottom: "3rem" }}>
              {PROGRAMMES.map((prog) => (
                <div
                  key={prog.id}
                  className="card"
                  style={{
                    borderColor: selectedProgramme?.id === prog.id ? "rgba(245, 158, 11, 0.5)" : "#2d3a4f",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                    <div>
                      <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.9375rem", color: "#F9FAFB", margin: "0 0 0.25rem" }}>
                        {prog.shortTitle}
                      </h3>
                      <p style={{ fontSize: "0.8125rem", color: "#6B7280", margin: 0 }}>{prog.audience}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "1.125rem", color: "#F59E0B", margin: 0 }}>{prog.priceLabel}</p>
                      <p style={{ fontSize: "0.75rem", color: "#6B7280", margin: 0 }}>{prog.durationLabel}</p>
                    </div>
                  </div>
                  <p style={{ color: "#9CA3AF", fontSize: "0.875rem", lineHeight: 1.5, marginBottom: "1rem" }}>{prog.summary}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                    {prog.includes.map((item) => (
                      <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", color: "#9CA3AF", fontSize: "0.8125rem" }}>
                        <CheckCircle2 size={14} style={{ color: "#F59E0B", flexShrink: 0, marginTop: 2 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/login?enrol=${prog.slug}`} className="btn-primary" style={{ width: "100%", justifyContent: "center", display: "flex", fontSize: "0.875rem" }}>
                    Enrol — {prog.priceLabel} <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>

            {/* Enrolment form */}
            <div
              style={{
                background: "#1C2333",
                border: "1px solid #2d3a4f",
                borderRadius: "1.25rem",
                padding: "2rem",
                maxWidth: 600,
              }}
            >
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "1.125rem", color: "#F9FAFB", marginBottom: "0.5rem" }}>
                Not sure which programme is right for you?
              </h3>
              <p style={{ color: "#9CA3AF", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
                Leave your details and we will contact you to help you choose.
              </p>
              {/* TODO: Asif — implement Server Action for this form */}
              {/* Server Action: POST to /api/submit-enquiry with enquiry_type: "driver_guidance" */}
              <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#9CA3AF", marginBottom: "0.375rem" }}>Full name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your full name"
                      style={{ width: "100%", padding: "0.625rem 0.875rem", background: "#243044", border: "1px solid #2d3a4f", borderRadius: "0.625rem", color: "#F9FAFB", fontSize: "0.9rem", outline: "none" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#9CA3AF", marginBottom: "0.375rem" }}>Mobile *</label>
                    <input
                      type="tel"
                      name="mobile"
                      required
                      placeholder="+27 xx xxx xxxx"
                      style={{ width: "100%", padding: "0.625rem 0.875rem", background: "#243044", border: "1px solid #2d3a4f", borderRadius: "0.625rem", color: "#F9FAFB", fontSize: "0.9rem", outline: "none" }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#9CA3AF", marginBottom: "0.375rem" }}>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    style={{ width: "100%", padding: "0.625rem 0.875rem", background: "#243044", border: "1px solid #2d3a4f", borderRadius: "0.625rem", color: "#F9FAFB", fontSize: "0.9rem", outline: "none" }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ alignSelf: "flex-start" }}
                >
                  Get guidance <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
