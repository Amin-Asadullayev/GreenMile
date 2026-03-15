"use client";

import { useEffect, useRef } from "react";
import { CURRENT_USER, TIER_CONFIG } from "@/lib/data";
import { getLevelProgress } from "@/lib/utils";
import { Zap, ShieldCheck } from "lucide-react";

export function XPProgressCard() {
  const barRef = useRef<HTMLDivElement>(null);
  const { progress, nextLevelXp, currentLevelXp } = getLevelProgress(CURRENT_USER.xp, CURRENT_USER.level);
  const tier = TIER_CONFIG[CURRENT_USER.tier];
  const xpInLevel = CURRENT_USER.xp - currentLevelXp;
  const xpNeeded = nextLevelXp - currentLevelXp;

  useEffect(() => {
    if (barRef.current) {
      setTimeout(() => {
        if (barRef.current) barRef.current.style.width = `${progress}%`;
      }, 300);
    }
  }, [progress]);

  return (
    <div
      className="bg-teal-800 rounded-2xl p-5 col-span-full animate-fade-up opacity-0 relative overflow-hidden"
      style={{ animationFillMode: "forwards" }}
    >
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)", backgroundSize: "12px 12px" }}
      />

      <div className="relative flex items-start justify-between gap-6">
        {/* Left: identity */}
        <div className="flex-1 min-w-0">
          <p className="text-teal-300 text-xs font-medium mb-0.5">Welcome back</p>
          <h2 className="text-white font-semibold text-lg leading-tight truncate">{CURRENT_USER.name}</h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-white/10 rounded-lg border border-white/10">
              <ShieldCheck className="w-3 h-3 text-teal-300" strokeWidth={2} />
              <span className="text-xs font-semibold text-teal-200">{tier.label}</span>
            </div>
            <span className="text-xs text-teal-400">{CURRENT_USER.department}</span>
          </div>
        </div>

        {/* Right: level */}
        <div className="text-right shrink-0">
          <p className="text-teal-300 text-xs mb-0.5">Level</p>
          <p className="text-4xl font-bold text-white font-mono leading-none">{CURRENT_USER.level}</p>
        </div>
      </div>

      {/* XP bar */}
      <div className="relative mt-5">
        <div className="flex justify-between text-xs text-teal-300 mb-2">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3 h-3" />
            {xpInLevel.toLocaleString()} / {xpNeeded.toLocaleString()} XP
          </span>
          <span className="font-mono">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            ref={barRef}
            className="h-full bg-teal-400 rounded-full transition-all duration-1000 ease-out"
            style={{ width: "0%" }}
          />
        </div>
        <p className="text-[11px] text-teal-400 mt-2">
          {(xpNeeded - xpInLevel).toLocaleString()} XP to Level {CURRENT_USER.level + 1}
        </p>
      </div>
    </div>
  );
}

