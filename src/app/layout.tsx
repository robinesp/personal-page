import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Poppins } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

const fontClass = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Robin Esposito",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontClass.className + " bg-[#f8f6f2] text-[#2e2e2e]"}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
