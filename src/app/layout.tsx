import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import VisualsManager from "./components/visuals-manager";
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
  title: "Vibhu Dikshit — Portfolio",
  description: "Tech + infrastructure portfolio with interactive Tron-glass UI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen relative">
          <VisualsManager />
        </div>
      </body>
    </html>
  );
}
