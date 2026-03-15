"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Bell, Search, Menu } from "lucide-react";
import { LogTripButton } from "@/components/ui/LogTripButton";
import { Sidebar } from "./Sidebar";

const PAGE_TITLES: Record<string, { title: string; subtitle: string }> = {
  "/dashboard":   { title: "Dashboard",       subtitle: "Your eco commute at a glance" },
  "/leaderboard": { title: "Leaderboard",      subtitle: "See how you stack up" },
  "/trips":       { title: "My Trips",         subtitle: "Your commute history" },
  "/perks":       { title: "Perks & Rewards",  subtitle: "Redeem your green miles" },
  "/admin":       { title: "Admin Overview",   subtitle: "Company-wide sustainability insights" },
};

export function TopBar() {
  const pathname = usePathname();
  const base = "/" + pathname.split("/")[1];
  const meta = PAGE_TITLES[base] ?? { title: "GreenMile", subtitle: "" };
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="h-14 md:h-16 bg-white border-b border-slate-100 flex items-center px-4 md:px-6 gap-3 shrink-0 sticky top-0 z-30">
        {/* Hamburger — mobile only */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="p-2 -ml-1 rounded-xl hover:bg-slate-50 text-slate-500 md:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex-1 min-w-0">
          <h1 className="text-sm md:text-base font-semibold text-slate-900 leading-tight truncate">{meta.title}</h1>
          <p className="text-xs text-slate-400 hidden sm:block">{meta.subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Search — sm+ only */}
          <div className="relative hidden sm:block">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search trips..."
              className="w-40 lg:w-48 pl-8 pr-3 py-1.5 text-sm bg-slate-50 border border-slate-100 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-teal-300 focus:bg-white transition-all"
            />
          </div>

          <button className="relative p-2 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-teal-700 transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-teal-500 rounded-full" />
          </button>

          <LogTripButton />
        </div>
      </header>

      {/* Mobile drawer — rendered here so it overlays everything */}
      <Sidebar mobileOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
