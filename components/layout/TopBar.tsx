"use client";

import { usePathname } from "next/navigation";
import { Bell, Plus, Search } from "lucide-react";
import { LogTripButton } from "@/components/ui/LogTripButton";

const PAGE_TITLES: Record<string, { title: string; subtitle: string }> = {
  "/dashboard":  { title: "Dashboard",    subtitle: "Your eco commute at a glance" },
  "/leaderboard":{ title: "Leaderboard",  subtitle: "See how you stack up" },
  "/trips":      { title: "My Trips",     subtitle: "Your commute history" },
  "/perks":      { title: "Perks & Rewards", subtitle: "Redeem your green miles" },
  "/admin":      { title: "Admin Overview", subtitle: "Company-wide sustainability insights" },
};

export function TopBar() {
  const pathname = usePathname();
  const base = "/" + pathname.split("/")[1];
  const meta = PAGE_TITLES[base] ?? { title: "GreenMile", subtitle: "" };

  return (
    <header className="h-16 bg-white border-b border-moss-100 flex items-center px-6 gap-4 shrink-0">
      <div className="flex-1">
        <h1 className="text-base font-semibold text-forest-900 leading-tight">{meta.title}</h1>
        <p className="text-xs text-moss-500">{meta.subtitle}</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative hidden sm:block">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-moss-400" />
          <input
            type="text"
            placeholder="Search trips..."
            className="w-48 pl-8 pr-3 py-1.5 text-sm bg-moss-50 border border-moss-100 rounded-lg text-forest-800 placeholder:text-moss-400 focus:outline-none focus:border-forest-300 focus:bg-white transition-all"
          />
        </div>

        <button className="relative p-2 rounded-xl hover:bg-moss-50 text-moss-500 hover:text-forest-700 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-forest-500 rounded-full" />
        </button>

        <LogTripButton />
      </div>
    </header>
  );
}
