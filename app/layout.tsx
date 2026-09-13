import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DPI CAD Society | Dhaka Polytechnic Institute",
    template: "%s | DPI CAD Society",
  },
  description:
    "The student-run computer-aided design society of Dhaka Polytechnic Institute. Workshops in 2D drafting, 3D modelling, simulation and BIM — plus digital member verification.",
  applicationName: "DPI CAD Society",
  keywords: [
    "DPI CAD Society",
    "Dhaka Polytechnic Institute",
    "CAD",
    "AutoCAD",
    "SolidWorks",
    "engineering drawing",
    "member verification",
  ],
  openGraph: {
    title: "DPI CAD Society | Dhaka Polytechnic Institute",
    description:
      "Precision drawn by the next generation of engineers. Workshops, competitions and real project work at Dhaka Polytechnic Institute.",
    siteName: "DPI CAD Society",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">{children}</body>
    </html>
  );
}
