"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "./Sidebar";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-slate-100 safe-area-pb">
      <div className="flex items-center justify-around h-16 px-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 flex-1 py-2 group"
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-colors",
                  active ? "text-teal-600" : "text-slate-400"
                )}
                strokeWidth={active ? 2.5 : 1.75}
              />
              <span className={cn(
                "text-[10px] font-medium transition-colors leading-none",
                active ? "text-teal-600" : "text-slate-400"
              )}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
