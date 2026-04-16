// DATA REQUIREMENTS:
// - Impact metrics: GET /api/metrics → TagMetrics (see types/index.ts)
//   Fields: action_plans, workshops, partners, countries, last_updated, data_source
//   Fallback: IMPACT_STRIP_FALLBACK from lib/constants.ts
// - Publications: GET /api/publications → Publication[] (see types/index.ts)
//   Fallback: PUBLICATIONS_PLACEHOLDER from lib/constants.ts
// All other content is static from lib/constants.ts

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Zap,
  Users,
  BookOpen,
  Globe,
  CheckCircle,
  ChevronRight,
  TrendingUp,
  Shield,
  Target,
  Layers,
} from "lucide-react";
import {
  HERO,
  CHALLENGE,
  WHAT_TAG_DOES,
  WHO_TAG_WORKS_WITH,
  WHY_THIS_MATTERS,
  IMPACT_STRIP_FALLBACK,
  PUBLICATIONS_PLACEHOLDER,
  ECOSYSTEM_SECTION,
  LOGO_HIRES_URL,
  SITE_NAME,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Transport Action Group | Enabling Green Freight Transformation",
  description:
    "Creating the enabling environment for green freight transformation through action plans, strategic interventions, ecosystem alignment, and partner mobilisation.",
};

// TODO: Asif to implement — replace with server-side fetch from /api/metrics
// import type { TagMetrics } from "@/types";
// async function getMetrics(): Promise<TagMetrics> { ... }

const ICON_MAP: Record<string, React.ElementType> = {
  MapPin,
  Zap,
  Users,
  ArrowRight,
  BookOpen,
  Globe,
  TrendingUp,
  Shield,
  Target,
  Layers,
};

export default function HomePage() {
  // TODO: Asif to implement — replace with: const metrics = await getMetrics();
  const metrics = IMPACT_STRIP_FALLBACK;

  // TODO: Asif to implement — replace with: const publications = await getPublications();
  const publications = PUBLICATIONS_PLACEHOLDER;

  return (
    <div className="min-h-screen bg-background">
      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 — HERO
          ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="glow-blob glow-blob-green"
            style={{ width: "70vw", height: "70vh", top: "-20%", left: "15%" }}
          />
          <div
            className="glow-blob glow-blob-teal"
            style={{ width: "50vw", height: "50vh", bottom: "0", right: "-10%" }}
          />
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="container relative z-10 py-24">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="mb-8">
              <span className="badge">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Green Freight Transformation
              </span>
            </div>

            {/* Logo — prominent in hero */}
            <div className="mb-10">
              <Image
                src={LOGO_HIRES_URL}
                alt={SITE_NAME}
                width={200}
                height={200}
                className="h-36 w-auto object-contain"
                priority
              />
            </div>

            {/* Headline */}
            <h1 className="text-balance mb-6 text-foreground">
              {HERO.headline.split("green freight transformation").map((part, i, arr) =>
                i < arr.length - 1 ? (
                  <span key={i}>
                    {part}
                    <span className="gradient-text">green freight transformation</span>
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </h1>

            {/* Supporting text */}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-10">
              {HERO.supporting}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link href={HERO.ctaPrimary.href} className="btn-primary">
                {HERO.ctaPrimary.label}
                <ArrowRight size={16} />
              </Link>
              <Link href={HERO.ctaSecondary.href} className="btn-outline">
                {HERO.ctaSecondary.label}
              </Link>
              <Link href={HERO.ctaTertiary.href} className="btn-ghost">
                {HERO.ctaTertiary.label}
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 — IMPACT STRIP
          DATA: /api/metrics → TagMetrics
          ═══════════════════════════════════════════════════════════════ */}
      <section className="border-y border-border/60 bg-card/50">
        <div className="container py-12">
          {metrics.data_source === "demo" && (
            <p className="text-center text-xs text-muted-foreground mb-6 font-mono">
              [MOCK DATA — Asif to wire to /api/metrics]
            </p>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: metrics.action_plans, label: "Action Plans Developed", suffix: "+" },
              { value: metrics.workshops, label: "Strategic Workshops", suffix: "+" },
              { value: metrics.partners, label: "Ecosystem Partners", suffix: "+" },
              { value: metrics.countries, label: "Countries Engaged", suffix: "" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-4xl font-bold gradient-text mb-1">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 — THE CHALLENGE
          ═══════════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mb-16">
            <span className="badge badge-teal mb-4">The Challenge</span>
            <h2 className="mb-4">{CHALLENGE.heading}</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {CHALLENGE.copy}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Without enabling environment */}
            <div className="card border-red-900/30 bg-red-950/10">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-red-400 mb-4">
                Without a structured enabling environment
              </h4>
              <ul className="space-y-3">
                {CHALLENGE.fragmented.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-0.5 w-4 h-4 rounded-full border border-red-800 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* With TAG */}
            <div className="card border-green-900/30 bg-green-950/10">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-green-400 mb-4">
                With TAG's enabling environment
              </h4>
              <ul className="space-y-3">
                {CHALLENGE.aligned.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle size={16} className="mt-0.5 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4 — WHAT TAG DOES
          ═══════════════════════════════════════════════════════════════ */}
      <section className="section bg-card/30">
        <div className="container">
          <div className="max-w-3xl mb-16">
            <span className="badge mb-4">TAG's Work</span>
            <h2 className="mb-4">{WHAT_TAG_DOES.heading}</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {WHAT_TAG_DOES.supporting}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHAT_TAG_DOES.pillars.map((pillar) => {
              const Icon = ICON_MAP[pillar.icon] ?? Globe;
              return (
                <Link key={pillar.title} href={pillar.href} className="card group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-green-400" />
                  </div>
                  <h3 className="text-base font-semibold mb-2 group-hover:text-green-400 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight size={12} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5 — WHO TAG WORKS WITH
          ═══════════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mb-16">
            <span className="badge badge-blue mb-4">Who TAG Works With</span>
            <h2 className="mb-4">{WHO_TAG_WORKS_WITH.heading}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHO_TAG_WORKS_WITH.audiences.map((audience) => (
              <div key={audience.title} className="card flex flex-col">
                <h3 className="text-base font-semibold mb-2">{audience.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {audience.description}
                </p>
                <Link
                  href={audience.href}
                  className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-green-400 hover:text-green-300 transition-colors"
                >
                  {audience.cta} <ChevronRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6 — WHY THIS MATTERS
          ═══════════════════════════════════════════════════════════════ */}
      <section className="section bg-gradient-to-br from-navy-800 to-navy-900 border-y border-border/40">
        <div className="container">
          <div className="max-w-3xl mb-16">
            <span className="badge badge-teal mb-4">Why This Matters</span>
            <h2 className="mb-4">{WHY_THIS_MATTERS.heading}</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {WHY_THIS_MATTERS.copy}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHY_THIS_MATTERS.benefits.map((benefit) => (
              <div
                key={benefit.label}
                className="flex items-start gap-4 p-5 rounded-xl bg-white/3 border border-border/40"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-500/15 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={16} className="text-teal-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold mb-1">{benefit.label}</div>
                  <div className="text-xs text-muted-foreground">{benefit.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 7 — ACTION PLAN PATHWAYS
          ═══════════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Green Freight Action Plan */}
            <div className="card group">
              <span className="badge mb-4">Green Freight</span>
              <h3 className="mb-3">Green Freight Action Plan</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                A structured, practical framework to guide national and industry-level green freight
                transformation — from stakeholder alignment and baseline assessment through to
                implementation roadmap and monitoring.
              </p>
              <Link
                href="/green-freight"
                className="inline-flex items-center gap-2 text-sm font-medium text-green-400 hover:text-green-300 transition-colors"
              >
                Explore the pathway <ArrowRight size={14} />
              </Link>
            </div>

            {/* Electric Truck Action Plan */}
            <div className="card group">
              <span className="badge badge-teal mb-4">Electric Truck</span>
              <h3 className="mb-3">Electric Truck Action Plan</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                A strategic roadmap to support zero-emission truck transition — addressing
                infrastructure, total cost of ownership, fleet readiness, and corridor-level
                implementation across the freight network.
              </p>
              <Link
                href="/electric-truck"
                className="inline-flex items-center gap-2 text-sm font-medium text-teal-400 hover:text-teal-300 transition-colors"
              >
                Explore the pathway <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 8 — PUBLICATIONS
          DATA: /api/publications → Publication[]
          ═══════════════════════════════════════════════════════════════ */}
      <section className="section bg-card/30">
        <div className="container">
          <div className="flex items-end justify-between mb-12">
            <div className="max-w-2xl">
              <span className="badge mb-4">Books and Frameworks</span>
              <h2 className="mb-3">Practical guidance for implementation</h2>
              <p className="text-muted-foreground text-base">
                TAG publications serve as working guides for practitioners, industry bodies, and
                decision-makers navigating green freight transformation.
              </p>
            </div>
            <Link
              href="/books"
              className="hidden md:flex items-center gap-2 text-sm font-medium text-green-400 hover:text-green-300 transition-colors flex-shrink-0"
            >
              View all publications <ArrowRight size={14} />
            </Link>
          </div>

          {/* TODO: Asif to replace with live data from /api/publications */}
          <div className="grid md:grid-cols-3 gap-5">
            {publications.map((pub) => (
              <Link key={pub.id} href={pub.href} className="card group cursor-pointer">
                <span className="badge badge-teal text-xs mb-4">{pub.category}</span>
                <h4 className="text-sm font-semibold mb-2 group-hover:text-green-400 transition-colors leading-snug">
                  {pub.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {pub.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 9 — ECOSYSTEM
          ═══════════════════════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <span className="badge badge-blue mb-4">The Ecosystem</span>
            <h2 className="mb-4">{ECOSYSTEM_SECTION.heading}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {ECOSYSTEM_SECTION.supporting}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {ECOSYSTEM_SECTION.platforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.href}
                target={platform.external ? "_blank" : undefined}
                rel={platform.external ? "noopener noreferrer" : undefined}
                className="card group cursor-pointer"
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  {platform.role}
                </div>
                <h3 className="text-base font-semibold mb-2 group-hover:text-green-400 transition-colors">
                  {platform.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {platform.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  Visit platform <ArrowRight size={12} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 10 — FINAL CTA
          ═══════════════════════════════════════════════════════════════ */}
      <section className="section bg-gradient-to-br from-navy-800 via-navy-900 to-background border-t border-border/40">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            {/* Logo in CTA */}
            <div className="flex justify-center mb-8">
              <Image
                src={LOGO_HIRES_URL}
                alt={SITE_NAME}
                width={80}
                height={80}
                className="h-20 w-auto object-contain opacity-80"
              />
            </div>

            <h2 className="mb-4">
              Partner to help shape the future of{" "}
              <span className="gradient-text">green freight</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Whether you are a DFI looking for credible investment platforms, an industry body
              seeking structured transformation support, or an ecosystem collaborator ready to
              align — TAG is the convening platform for green freight transformation.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/partner-with-tag" className="btn-primary">
                Partner with TAG
                <ArrowRight size={16} />
              </Link>
              <Link href="/services" className="btn-outline">
                Explore TAG's Work
              </Link>
              <Link href="/contact" className="btn-ghost">
                Start a conversation
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
