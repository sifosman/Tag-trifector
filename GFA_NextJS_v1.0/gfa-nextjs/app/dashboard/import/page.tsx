/**
 * GreenFreightAcademy — Import Employees Page
 *
 * DATA REQUIREMENTS:
 * - CSV download: GET /api/company/template → returns CSV template file
 *   TODO: Asif to implement — returns CSV with headers: name, role, email, mobile
 * - CSV upload: POST /api/company/import-employees (multipart/form-data, field: "file")
 *   Returns: { imported: number, errors: { row: number, message: string }[] }
 *   TODO: Asif to implement — validates CSV, creates employee records in Supabase
 * - Auth: protected route — redirect to /login if no session
 *   TODO: Asif to implement auth check
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { Upload, Download, CheckCircle2, AlertCircle, FileText } from "lucide-react";
import { CSV_TEMPLATE_HEADERS, CSV_TEMPLATE_EXAMPLE } from "@/lib/constants";

export default function ImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ imported: number; errors: { row: number; message: string }[] } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    setResult(null);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);

    // TODO: Asif to implement — POST to /api/company/import-employees
    // const formData = new FormData();
    // formData.append("file", file);
    // const res = await fetch("/api/company/import-employees", { method: "POST", body: formData });
    // const data = await res.json();
    // setResult(data);

    // Mock result for UI demonstration
    await new Promise((r) => setTimeout(r, 1200));
    setResult({ imported: 12, errors: [] });
    setUploading(false);
  };

  const downloadTemplate = () => {
    // TODO: Asif to implement — fetch from /api/company/template
    // For now, generate a simple CSV client-side
    const headers = CSV_TEMPLATE_HEADERS.join(",");
    const rows = CSV_TEMPLATE_EXAMPLE.map((row) =>
      CSV_TEMPLATE_HEADERS.map((h) => row[h] ?? "").join(",")
    );
    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gfa-employee-template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ paddingTop: "5rem", background: "var(--color-slate-900)", minHeight: "100vh" }}>
      {/* Header */}
      <section
        style={{
          padding: "3.5rem 0 3rem",
          background: "linear-gradient(160deg, #0a1628 0%, #0f1f3d 100%)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <div className="container-gfa">
          <Link
            href="/dashboard"
            style={{ fontSize: "0.875rem", color: "var(--text-muted)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.375rem", marginBottom: "1.5rem" }}
          >
            ← Back to dashboard
          </Link>
          <span className="pill-badge pill-green" style={{ marginBottom: "1rem", display: "inline-flex" }}>
            Import employees
          </span>
          <h1 style={{ fontSize: "1.75rem", maxWidth: "560px", marginBottom: "0.75rem" }}>
            Add your team with a CSV upload
          </h1>
          <p style={{ maxWidth: "520px", color: "var(--text-secondary)" }}>
            Download the template, populate it with your employees' details, and upload it to add them to your
            company account. You can then select them for enrolment from the dashboard.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "3rem 0 5rem" }}>
        <div className="container-gfa" style={{ maxWidth: "720px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

            {/* Step 1 — Download template */}
            <div
              style={{
                padding: "2rem",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "1rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.25rem" }}>
                <div
                  style={{
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "50%",
                    background: "rgba(34, 197, 94, 0.12)",
                    border: "1px solid rgba(34, 197, 94, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    color: "var(--color-green-400)",
                    flexShrink: 0,
                  }}
                >
                  1
                </div>
                <div>
                  <h3 style={{ fontSize: "1rem", marginBottom: "0.375rem" }}>Download the template</h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                    The template is a CSV file with four columns: name, role, email, and mobile.
                  </p>
                </div>
              </div>

              {/* Template preview */}
              <div
                style={{
                  padding: "1rem",
                  background: "rgba(0,0,0,0.2)",
                  borderRadius: "0.5rem",
                  fontFamily: "monospace",
                  fontSize: "0.8rem",
                  color: "var(--text-muted)",
                  marginBottom: "1.25rem",
                  overflowX: "auto",
                }}
              >
                <div style={{ color: "var(--color-green-400)", marginBottom: "0.25rem" }}>
                  {CSV_TEMPLATE_HEADERS.join(",")}
                </div>
                {CSV_TEMPLATE_EXAMPLE.map((row, i) => (
                  <div key={i}>
                    {CSV_TEMPLATE_HEADERS.map((h) => row[h] ?? "").join(",")}
                  </div>
                ))}
              </div>

              <button onClick={downloadTemplate} className="btn-secondary" style={{ fontSize: "0.875rem" }}>
                <Download size={15} />
                Download CSV template
              </button>
            </div>

            {/* Step 2 — Upload */}
            <div
              style={{
                padding: "2rem",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "1rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.5rem" }}>
                <div
                  style={{
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "50%",
                    background: "rgba(34, 197, 94, 0.12)",
                    border: "1px solid rgba(34, 197, 94, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    color: "var(--color-green-400)",
                    flexShrink: 0,
                  }}
                >
                  2
                </div>
                <div>
                  <h3 style={{ fontSize: "1rem", marginBottom: "0.375rem" }}>Upload your completed file</h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                    Populate the template with your employees and upload it here.
                  </p>
                </div>
              </div>

              <form onSubmit={handleUpload} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {/* Drop zone */}
                <label
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.75rem",
                    padding: "2.5rem",
                    background: file ? "rgba(34, 197, 94, 0.04)" : "rgba(0,0,0,0.15)",
                    border: `2px dashed ${file ? "rgba(34, 197, 94, 0.3)" : "rgba(255,255,255,0.12)"}`,
                    borderRadius: "0.75rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    textAlign: "center",
                  }}
                >
                  {file ? (
                    <>
                      <FileText size={28} style={{ color: "var(--color-green-400)" }} />
                      <div>
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "white", fontSize: "0.9rem" }}>
                          {file.name}
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                          {(file.size / 1024).toFixed(1)} KB — click to change
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload size={28} style={{ color: "var(--text-muted)" }} />
                      <div>
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "white", fontSize: "0.9rem" }}>
                          Click to upload CSV
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                          .csv files only
                        </div>
                      </div>
                    </>
                  )}
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </label>

                <button
                  type="submit"
                  disabled={!file || uploading}
                  className="btn-primary"
                  style={{ alignSelf: "flex-start", opacity: !file || uploading ? 0.5 : 1 }}
                >
                  {uploading ? "Importing…" : "Import employees"}
                  {!uploading && <Upload size={15} />}
                </button>
              </form>

              {/* Result */}
              {result && (
                <div
                  style={{
                    marginTop: "1.25rem",
                    padding: "1rem 1.25rem",
                    background: result.errors.length === 0 ? "rgba(34, 197, 94, 0.06)" : "rgba(248, 113, 113, 0.06)",
                    border: `1px solid ${result.errors.length === 0 ? "rgba(34, 197, 94, 0.2)" : "rgba(248, 113, 113, 0.2)"}`,
                    borderRadius: "0.625rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: result.errors.length > 0 ? "0.75rem" : 0 }}>
                    {result.errors.length === 0 ? (
                      <CheckCircle2 size={16} style={{ color: "var(--color-green-400)" }} />
                    ) : (
                      <AlertCircle size={16} style={{ color: "#f87171" }} />
                    )}
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.9rem", color: "white" }}>
                      {result.imported} employee{result.imported !== 1 ? "s" : ""} imported successfully
                    </span>
                  </div>
                  {result.errors.length > 0 && (
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                      {result.errors.map((err) => (
                        <li key={err.row} style={{ fontSize: "0.8rem", color: "#f87171" }}>
                          Row {err.row}: {err.message}
                        </li>
                      ))}
                    </ul>
                  )}
                  {result.errors.length === 0 && (
                    <div style={{ marginTop: "0.75rem" }}>
                      <Link href="/dashboard" className="btn-secondary" style={{ fontSize: "0.8rem", padding: "0.4rem 0.875rem" }}>
                        Go to enrolment grid
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
