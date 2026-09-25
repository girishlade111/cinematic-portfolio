import type { Metadata } from "next";
import { displayFont, serifFont, monoFont, bodyFont } from "@/lib/fonts";
import GlobalHeader from "@/components/GlobalHeader";
import CinematicWrapper from "@/components/CinematicWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Girish Lade — Cinematic Portfolio",
  description:
    "Founder & Engineer. Building products at the intersection of design, technology, and story.",
  openGraph: {
    title: "Girish Lade — Cinematic Portfolio",
    description:
      "Founder & Engineer. Building products at the intersection of design, technology, and story.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${serifFont.variable} ${monoFont.variable} ${bodyFont.variable}`}
    >
      <body className="font-body bg-background text-foreground film-grain antialiased">
        <CinematicWrapper>
          <GlobalHeader />
          {children}
        </CinematicWrapper>
      </body>
    </html>
  );
}
