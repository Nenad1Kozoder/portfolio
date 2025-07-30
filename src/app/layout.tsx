import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/header";
import Navigation from "@/components/navigation";
import Footer from "@/components/FooterSection";
import { Poppins, Roboto_Mono } from "next/font/google";
import Providers from "./providers"; // new wrapper file (see below)
import "./globals.scss";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "600"],
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nenad Kozoder – Senior Frontend Developer",
  description:
    "Nenad Kozoder – 9+ years turning designs into fast, accessible React & Next.js apps.",
  openGraph: {
    title: "Nenad Kozoder – Senior Frontend Developer",
    description:
      "Clean, scalable & accessible web solutions built with React, Next.js.",
    url: "https://www.nenad-kozoder.rs/",
    images: [
      {
        url: "https://www.nenad-kozoder.rs/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nenad Kozoder portfolio preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.nenad-kozoder.rs/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${robotoMono.variable}`}>
        {/* Hidden lead paragraph */}
        <p style={{ display: "none" }}>
          Nenad Kozoder – Senior Frontend Developer specializing in React,
          Next.js, accessibility and performance.
        </p>
        <Header />
        <Navigation isMobile={true} />
        <Providers>{children}</Providers>
        <Footer />
        {/* JSON-LD */}
        <Script
          id="schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Nenad Kozoder",
              jobTitle: "Senior Frontend Developer",
              url: "https://www.nenad-kozoder.rs/",
              sameAs: [
                "https://github.com/nenadkozoder",
                "https://www.linkedin.com/in/nenadkozoder/",
              ],
              knowsAbout: [
                "React",
                "Next.js",
                "Accessibility",
                "Performance",
                "SCSS",
              ],
            }),
          }}
        />

        {/* gtag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BRKPVVE2W5"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BRKPVVE2W5');
          `}
        </Script>
      </body>
    </html>
  );
}
