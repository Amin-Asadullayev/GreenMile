"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";

export function MobileDrawer() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 -ml-1 rounded-xl hover:bg-slate-50 text-slate-500 md:hidden"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>
      <Sidebar mobileOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
