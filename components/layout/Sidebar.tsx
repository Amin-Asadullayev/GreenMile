"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Trophy, Gift, Map, BarChart3,
  Settings, Leaf, Flame, X,
} from "lucide-react";
import { CURRENT_USER } from "@/lib/data";
import { cn } from "@/lib/utils";

export const NAV_ITEMS = [
  { href: "/dashboard",   label: "Dashboard",   icon: LayoutDashboard },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/trips",       label: "My Trips",    icon: Map },
  { href: "/perks",       label: "Perks",       icon: Gift },
  { href: "/admin",       label: "Admin",       icon: BarChart3 },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ mobileOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  const inner = (
    <aside className="flex flex-col h-full bg-white border-r border-slate-100 w-[240px]">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-100 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-teal-600 rounded-xl flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-semibold text-lg text-slate-900 tracking-tight">GreenMile</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 pl-[42px] leading-tight">Eco Commute Tracker</p>
        </div>
        {/* Close button — mobile only */}
        {onClose && (
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-50 text-slate-400 md:hidden">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                active
                  ? "bg-teal-50 text-teal-700 shadow-[inset_0_0_0_1px_rgba(13,148,136,0.15)]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-teal-700"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 shrink-0 transition-colors",
                  active ? "text-teal-600" : "text-slate-400 group-hover:text-teal-500"
                )}
                strokeWidth={active ? 2.5 : 2}
              />
              {label}
              {href === "/perks" && (
                <span className="ml-auto text-[10px] font-semibold bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded-full">
                  NEW
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Streak */}
      <div className="mx-3 mb-4 p-3 bg-teal-50 rounded-xl border border-teal-100">
        <div className="flex items-center gap-2 mb-1">
          <Flame className="w-4 h-4 text-teal-500" />
          <span className="text-xs font-semibold text-teal-700">{CURRENT_USER.streak} day streak!</span>
        </div>
        <p className="text-[11px] text-teal-600 leading-snug">Log a trip today to keep it going</p>
      </div>

      {/* User */}
      <div className="p-3 border-t border-slate-100">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-xs font-bold text-teal-700 shrink-0">
            {CURRENT_USER.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-900 truncate">{CURRENT_USER.name}</p>
            <p className="text-[10px] text-slate-500">Level {CURRENT_USER.level} · Rank #{CURRENT_USER.rank}</p>
          </div>
          <Settings className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex h-full shrink-0">{inner}</div>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
          />
          <div className="absolute left-0 top-0 h-full shadow-xl animate-fade-in">
            {inner}
          </div>
        </div>
      )}
    </>
  );
}
