import type { Metadata } from "next";
import { Manrope, ZCOOL_KuaiLe } from "next/font/google";
import "./globals.css";

// Font for the body text
const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

// New artistic font for display text (headings)
const zcool = ZCOOL_KuaiLe({
  variable: "--font-display",
  subsets: ["latin"], // Chinese characters are supported by default
  weight: "400",    // This font only comes in the 400 weight
  display: "swap",
});

export const metadata: Metadata = {
  title: "Couple Quiz",
  description: "A romantic, modern couple quiz experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${zcool.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}