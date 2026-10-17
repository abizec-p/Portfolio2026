import type { Metadata } from "next";
import { Bricolage_Grotesque, Sora, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const heading = Bricolage_Grotesque({
  variable: "--font-Bricolage_Grotesque",
  subsets: ["latin"],
});

const body = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abishek Pariyar - Web developer",
  description:
    "Portfolio website for Abishek pariyar, a web developer based in Mississauga.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex mx-auto flex-col font-body">
        <div className="bg-dots pointer-events-none fixed inset-0 -z-10" />
        <Nav />
        <main className="">{children}</main>
      </body>
    </html>
  );
}
