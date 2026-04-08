import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Indian Financial Sector ESG Deep Dive | AccelentPartners",
  description:
    "44 AMCs, insurers, wealth managers & NBFCs. Scope 3 granular analysis from FY 2024-25 BRSR filings. AccelentPartners ESG benchmarking report.",
  openGraph: {
    title: "Indian Financial Sector ESG Deep Dive | AccelentPartners",
    description:
      "44 financial institutions. Scope 3 deep dive. AMCs, Insurance, NBFCs. Download the full ESG benchmarking report.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-50 text-slate-800`}>
        {children}
      </body>
    </html>
  );
}
