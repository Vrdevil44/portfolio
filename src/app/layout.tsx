import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
          {/* Smart Nav (stub) */}
          <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-40 px-2 py-1 glass">
            <ul className="flex gap-3 text-sm">
              <li>
                <Link className="focus-ring px-3 py-1 rounded-full" href="/">Home</Link>
              </li>
              <li>
                <Link className="focus-ring px-3 py-1 rounded-full" href="#projects">Projects</Link>
              </li>
              <li>
                <Link className="focus-ring px-3 py-1 rounded-full" href="#about">About</Link>
              </li>
              <li>
                <Link className="focus-ring px-3 py-1 rounded-full" href="#contact">Contact</Link>
              </li>
            </ul>
          </nav>

          {/* Floating Settings Button (stub) */}
          <button
            aria-label="Open settings"
            className="fixed bottom-6 right-6 z-40 glass focus-ring px-4 py-2 text-sm"
          >
            Settings
          </button>

          {children}
        </div>
      </body>
    </html>
  );
}
