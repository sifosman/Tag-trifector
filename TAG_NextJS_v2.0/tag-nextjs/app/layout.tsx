import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Transport Action Group | Enabling Green Freight Transformation",
    template: "%s | Transport Action Group",
  },
  description:
    "Transport Action Group creates the enabling environment for green freight transformation through action plans, strategic interventions, ecosystem alignment, and partner mobilisation.",
  keywords: [
    "green freight",
    "transport action group",
    "freight decarbonisation",
    "electric truck",
    "green freight action plan",
    "road freight transformation",
    "sustainable logistics",
  ],
  openGraph: {
    type: "website",
    siteName: "Transport Action Group",
    title: "Transport Action Group | Enabling Green Freight Transformation",
    description:
      "Creating the enabling environment for green freight transformation through action plans, strategic interventions, and ecosystem alignment.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
