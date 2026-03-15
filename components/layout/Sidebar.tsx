"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Trophy,
  Gift,
  Map,
  BarChart3,
  Settings,
  Leaf,
  Flame,
} from "lucide-react";
import { CURRENT_USER } from "@/lib/data";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard",    icon: LayoutDashboard },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/trips",     label: "My Trips",     icon: Map },
  { href: "/perks",     label: "Perks",        icon: Gift },
  { href: "/admin",     label: "Admin",        icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[240px] shrink-0 bg-white border-r border-moss-100 flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-moss-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-forest-600 rounded-xl flex items-center justify-center shadow-sm">
            <Leaf className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl text-forest-900 tracking-tight">GreenMile</span>
        </div>
        <p className="text-[11px] text-moss-500 mt-1.5 pl-[42px] leading-tight">Eco Commute Tracker</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group",
                active
                  ? "bg-forest-50 text-forest-700 shadow-[inset_0_0_0_1px_rgba(45,158,45,0.15)]"
                  : "text-moss-600 hover:bg-moss-50 hover:text-forest-700"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 shrink-0 transition-colors",
                  active ? "text-forest-600" : "text-moss-400 group-hover:text-forest-500"
                )}
                strokeWidth={active ? 2.5 : 2}
              />
              {label}
              {href === "/perks" && (
                <span className="ml-auto text-[10px] font-semibold bg-forest-100 text-forest-700 px-1.5 py-0.5 rounded-full">
                  NEW
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Streak */}
      <div className="mx-3 mb-4 p-3 bg-amber-50 rounded-xl border border-amber-100">
        <div className="flex items-center gap-2 mb-1">
          <Flame className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-semibold text-amber-700">{CURRENT_USER.streak} day streak!</span>
        </div>
        <p className="text-[11px] text-amber-600 leading-snug">Log a trip today to keep it going</p>
      </div>

      {/* User */}
      <div className="p-3 border-t border-moss-100">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-moss-50 cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-forest-100 flex items-center justify-center text-xs font-bold text-forest-700 shrink-0">
            {CURRENT_USER.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-forest-900 truncate">{CURRENT_USER.name}</p>
            <p className="text-[10px] text-moss-500">Level {CURRENT_USER.level} · Rank #{CURRENT_USER.rank}</p>
          </div>
          <Settings className="w-3.5 h-3.5 text-moss-400 shrink-0" />
        </div>
      </div>
    </aside>
  );
}
