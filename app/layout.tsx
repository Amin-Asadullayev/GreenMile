import type { Metadata } from "next";
import { Outfit, DM_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GreenMile — Eco Commute Tracker",
  description: "Gamified sustainable commuting for forward-thinking companies",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmMono.variable}`}>
      <body className="bg-slate-50 text-slate-900 antialiased font-sans min-h-screen">
        <div className="flex h-screen overflow-hidden">
          {/* Desktop sidebar — hidden on mobile, TopBar handles mobile drawer */}
          <div className="hidden md:flex h-full shrink-0">
            <Sidebar />
          </div>

          <div className="flex-1 flex flex-col overflow-hidden min-w-0">
            <TopBar />
            <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
              <div className="max-w-6xl mx-auto px-4 md:px-6 py-5 md:py-8">
                {children}
              </div>
            </main>
          </div>
        </div>

        {/* Mobile bottom nav */}
        <BottomNav />
      </body>
    </html>
  );
}
