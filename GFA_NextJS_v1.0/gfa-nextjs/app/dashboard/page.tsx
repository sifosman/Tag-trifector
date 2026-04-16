"use client";

/**
 * GreenFreightAcademy — Company Dashboard
 *
 * DATA REQUIREMENTS:
 * - Authentication: TODO: Asif to implement Supabase Auth
 *   - Protected route — redirect to /login if no session
 *   - Session provides: companyId, companyName, userRole
 * - Company metrics: GET /api/company/metrics → CompanyDashboardMetrics
 *   Returns: { totalEmployees, enrolledEmployees, certifiedEmployees, activeProgrammes, lastUpdated }
 * - Employee list: GET /api/company/employees → Employee[]
 *   Returns full employee list with enrolment status per programme
 * - CSV upload: POST /api/company/import-employees (multipart/form-data)
 *   Returns: { imported: number, errors: ImportError[] }
 * - Bulk enrolment: POST /api/bulk-enroll
 *   Payload: { employeeIds: string[], programmeId: string }
 * - Reports: GET /api/reports?companyId=... → downloadable CSV/PDF
 *
 * All above are TODO: Asif to implement
 * This file shows the UI shell with mock data for design and layout purposes.
 */

import Link from "next/link";
import { Users, Award, BarChart3, Upload, Download, ChevronRight, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { PROGRAMMES, MOCK_EMPLOYEES } from "@/lib/constants";
import type { Employee, EnrolmentStatus } from "@/types";

// ─── Mock data ────────────────────────────────────────────────────────────────
// TODO: Asif to replace with live data from /api/company/metrics and /api/company/employees
const MOCK_METRICS = {
  totalEmployees: MOCK_EMPLOYEES.length,
  enrolledEmployees: MOCK_EMPLOYEES.filter((e) => e.enrolments.length > 0).length,
  certifiedEmployees: MOCK_EMPLOYEES.filter((e) =>
    e.enrolments.some((en) => en.status === "certified")
  ).length,
  activeProgrammes: 2,
};

function statusIcon(status: EnrolmentStatus) {
  switch (status) {
    case "certified":
      return <CheckCircle2 size={14} style={{ color: "#22c55e" }} />;
    case "in-progress":
      return <Clock size={14} style={{ color: "#f59e0b" }} />;
    case "not-enrolled":
      return <span style={{ width: 14, height: 14, display: "inline-block", borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }} />;
    default:
      return null;
  }
}

function statusLabel(status: EnrolmentStatus, progress?: number) {
  switch (status) {
    case "certified":
      return <span style={{ color: "#22c55e", fontSize: "0.75rem", fontWeight: 600 }}>Certified</span>;
    case "in-progress":
      return <span style={{ color: "#f59e0b", fontSize: "0.75rem", fontWeight: 600 }}>{progress ?? 0}%</span>;
    case "not-enrolled":
      return <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>—</span>;
    default:
      return null;
  }
}

export default function DashboardPage() {
  // TODO: Asif — add auth check here. If no session, redirect to /login
  // Example: const session = await getServerSession(); if (!session) redirect('/login');

  const displayedProgrammes = PROGRAMMES.filter((p) => ["ptdp", "eco-driver", "road-freight-manager"].includes(p.id));

  return (
    <div style={{ paddingTop: "5rem", background: "var(--color-slate-900)", minHeight: "100vh" }}>
      {/* Header */}
      <section
        style={{
          padding: "3rem 0 2.5rem",
          background: "linear-gradient(160deg, #0a1628 0%, #0f1f3d 100%)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div className="container-gfa">
          {/* Mock data banner */}
          <div className="mock-banner" style={{ marginBottom: "1.5rem" }}>
            ⚠ Demo data — Asif to connect Supabase Auth and /api/company/* endpoints
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span className="pill-badge pill-green" style={{ marginBottom: "0.75rem", display: "inline-flex" }}>
                Company dashboard
              </span>
              {/* TODO: Asif — replace with session.companyName */}
              <h1 style={{ fontSize: "1.75rem" }}>AutoCarriers (Pty) Ltd</h1>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link href="/dashboard/import" className="btn-secondary" style={{ fontSize: "0.875rem" }}>
                <Upload size={15} />
                Import employees
              </Link>
              <Link href="/dashboard/reports" className="btn-secondary" style={{ fontSize: "0.875rem" }}>
                <Download size={15} />
                Download report
              </Link>
              <Link href="/dashboard/cpd-submission" className="btn-ghost" style={{ fontSize: "0.875rem" }}>
                Submit CPD
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section style={{ padding: "2.5rem 0", background: "var(--bg-section-mid)" }}>
        <div className="container-gfa">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1rem",
            }}
          >
            {[
              { icon: <Users size={18} />, value: MOCK_METRICS.totalEmployees, label: "Total employees", color: "#60a5fa" },
              { icon: <BarChart3 size={18} />, value: MOCK_METRICS.enrolledEmployees, label: "Enrolled", color: "#f59e0b" },
              { icon: <Award size={18} />, value: MOCK_METRICS.certifiedEmployees, label: "Certified", color: "#22c55e" },
              { icon: <CheckCircle2 size={18} />, value: MOCK_METRICS.activeProgrammes, label: "Active programmes", color: "#2dd4bf" },
            ].map((metric) => (
              <div
                key={metric.label}
                style={{
                  padding: "1.25rem 1.5rem",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "0.75rem",
                }}
              >
                <div style={{ color: metric.color, marginBottom: "0.625rem" }}>{metric.icon}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem", color: "white", lineHeight: 1 }}>
                  {metric.value}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Employee enrolment grid */}
      <section style={{ padding: "2.5rem 0" }}>
        <div className="container-gfa">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <h2 style={{ fontSize: "1.25rem" }}>Employee enrolment grid</h2>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <button className="btn-primary" style={{ fontSize: "0.8rem", padding: "0.5rem 1rem" }}>
                {/* TODO: Asif — wire to bulk enrolment: POST /api/bulk-enroll with selected employee IDs and programme */}
                Enrol selected
              </button>
            </div>
          </div>

          {/* Grid table */}
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.875rem",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                  <th style={{ padding: "0.75rem 0.5rem", textAlign: "left", color: "var(--text-muted)", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.04em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    <input type="checkbox" style={{ marginRight: "0.5rem" }} />
                    Employee
                  </th>
                  <th style={{ padding: "0.75rem 0.5rem", textAlign: "left", color: "var(--text-muted)", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.04em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    Role
                  </th>
                  {displayedProgrammes.map((prog) => (
                    <th
                      key={prog.id}
                      style={{
                        padding: "0.75rem 0.75rem",
                        textAlign: "center",
                        color: "var(--text-muted)",
                        fontWeight: 600,
                        fontSize: "0.7rem",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                        maxWidth: "120px",
                      }}
                    >
                      {prog.title.split(" ").slice(0, 3).join(" ")}…
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MOCK_EMPLOYEES.map((employee) => (
                  <tr
                    key={employee.id}
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      transition: "background 0.15s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "0.875rem 0.5rem", whiteSpace: "nowrap" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <input type="checkbox" />
                        <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "white" }}>
                          {employee.name}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: "0.875rem 0.5rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                      {employee.role ?? "—"}
                    </td>
                    {displayedProgrammes.map((prog) => {
                      const enrolment = employee.enrolments.find((e) => e.programmeId === prog.id);
                      const status: EnrolmentStatus = enrolment?.status ?? "not-enrolled";
                      return (
                        <td key={prog.id} style={{ padding: "0.875rem 0.75rem", textAlign: "center" }}>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
                            {statusIcon(status)}
                            {statusLabel(status, enrolment?.progressPercent)}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div style={{ display: "flex", gap: "1.5rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
            {[
              { icon: <CheckCircle2 size={13} style={{ color: "#22c55e" }} />, label: "Certified" },
              { icon: <Clock size={13} style={{ color: "#f59e0b" }} />, label: "In progress" },
              { icon: <span style={{ width: 13, height: 13, display: "inline-block", borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }} />, label: "Not enrolled" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                {item.icon}
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section style={{ padding: "2rem 0 4rem" }}>
        <div className="container-gfa">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            {[
              { label: "Import employees", href: "/dashboard/import", icon: <Upload size={16} />, description: "Upload CSV to add employees" },
              { label: "Career path planner", href: "/dashboard/career-planner", icon: <BarChart3 size={16} />, description: "Map roles to recommended programmes" },
              { label: "Submit CPD", href: "/dashboard/cpd-submission", icon: <AlertCircle size={16} />, description: "Urgent or standard CPD contribution" },
              { label: "Download reports", href: "/dashboard/reports", icon: <Download size={16} />, description: "Progress and certification reports" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding: "1.25rem",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "0.75rem",
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  transition: "border-color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(34, 197, 94, 0.3)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
              >
                <div style={{ color: "var(--color-green-400)" }}>{item.icon}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem", color: "white" }}>
                  {item.label}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{item.description}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
