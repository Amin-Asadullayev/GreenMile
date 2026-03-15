"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, Minus, Medal, Trees } from "lucide-react";
import { LEADERBOARD, CURRENT_USER, TIER_CONFIG } from "@/lib/data";
import { cn } from "@/lib/utils";

type Filter = "week" | "month" | "alltime";

const SCORE_KEY: Record<Filter, keyof typeof LEADERBOARD[0]> = {
  week: "weeklyXp",
  month: "monthlyXp",
  alltime: "allTimeXp",
};

const POSITION_STYLE = {
  1: { ring: "ring-2 ring-amber-300 bg-amber-50 text-amber-800", bar: "h-28 bg-amber-100", label: "text-amber-300" },
  2: { ring: "ring-1 ring-white/20 bg-white/10 text-white",      bar: "h-20 bg-white/10", label: "text-white/50" },
  3: { ring: "ring-1 ring-white/20 bg-white/10 text-white",      bar: "h-14 bg-white/10", label: "text-white/50" },
} as const;

export default function LeaderboardPage() {
  const [filter, setFilter] = useState<Filter>("month");
  const key = SCORE_KEY[filter];
  const sorted = [...LEADERBOARD].sort((a, b) => (b[key] as number) - (a[key] as number));
  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-forest-900 text-xl">Rankings</h2>
          <p className="text-sm text-moss-500 mt-0.5">Who's leading the green charge</p>
        </div>
        <div className="flex gap-1 bg-moss-50 rounded-xl p-1 border border-moss-100">
          {(["week", "month", "alltime"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-semibold transition-all",
                filter === f
                  ? "bg-white text-forest-800 shadow-sm border border-moss-100"
                  : "text-moss-500 hover:text-forest-700"
              )}
            >
              {f === "alltime" ? "All time" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Podium */}
      <div className="bg-forest-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)", backgroundSize: "12px 12px" }}
        />
        <p className="text-center text-forest-400 text-[10px] font-semibold uppercase tracking-widest mb-6 relative">Top performers</p>
        <div className="flex items-end justify-center gap-4 relative">
          <PodiumCard entry={top3[1]} position={2} score={top3[1]?.[key] as number} />
          <PodiumCard entry={top3[0]} position={1} score={top3[0]?.[key] as number} />
          <PodiumCard entry={top3[2]} position={3} score={top3[2]?.[key] as number} />
        </div>
      </div>

      {/* List */}
      <div className="space-y-2">
        {rest.map((entry, i) => {
          const isMe = entry.user.id === CURRENT_USER.id;
          const tier = TIER_CONFIG[entry.user.tier];
          return (
            <div
              key={entry.user.id}
              className={cn(
                "flex items-center gap-4 px-4 py-3.5 rounded-xl border transition-all animate-fade-up opacity-0",
                isMe
                  ? "bg-forest-50 border-forest-200"
                  : "bg-white border-moss-100 hover:border-moss-200"
              )}
              style={{ animationDelay: `${i * 50}ms`, animationFillMode: "forwards" }}
            >
              <span className="text-sm font-semibold text-moss-300 w-5 text-center tabular-nums shrink-0">{i + 4}</span>
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{ background: tier.bg, color: tier.color }}
              >
                {entry.user.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-forest-900 truncate">{entry.user.name}</p>
                  {isMe && (
                    <span className="text-[10px] font-bold bg-forest-600 text-white px-1.5 py-0.5 rounded-full shrink-0">You</span>
                  )}
                </div>
                <p className="text-xs text-moss-400 mt-0.5">{entry.user.department} · Lv.{entry.user.level} · {entry.user.totalTrips} trips</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <TrendBadge trend={entry.trend} amount={entry.trendAmount} />
                <div className="text-right min-w-[60px]">
                  <p className="text-sm font-semibold text-forest-800 font-mono tabular-nums">{(entry[key] as number).toLocaleString()}</p>
                  <p className="text-[10px] text-moss-400">XP</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Team total */}
      <div className="bg-moss-50 rounded-xl border border-moss-100 p-4 flex items-center gap-3">
        <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center border border-moss-100 shrink-0">
          <Trees className="w-4 h-4 text-forest-600" strokeWidth={1.75} />
        </div>
        <div>
          <p className="text-sm font-semibold text-forest-800">Team impact this month</p>
          <p className="text-xs text-moss-500 mt-0.5">14,530 XP · 1,240 kg CO₂ avoided · equivalent to planting 56 trees</p>
        </div>
      </div>
    </div>
  );
}

function PodiumCard({ entry, position, score }: { entry: typeof LEADERBOARD[0]; position: 1|2|3; score: number }) {
  if (!entry) return null;
  const isMe = entry.user.id === CURRENT_USER.id;
  const style = POSITION_STYLE[position];

  return (
    <div className={cn("flex flex-col items-center", position === 1 && "-translate-y-4")}>
      <div className={cn(
        "rounded-full flex items-center justify-center text-xs font-bold mb-2 shadow-md",
        position === 1 ? "w-14 h-14" : "w-11 h-11",
        style.ring
      )}>
        {isMe ? "You" : entry.user.initials}
      </div>
      <p className={cn("font-semibold text-center leading-tight mb-0.5", position === 1 ? "text-white text-sm" : "text-white/70 text-xs")}>
        {entry.user.name.split(" ")[0]}
      </p>
      <p className={cn("text-xs font-mono tabular-nums mb-3", style.label)}>{score.toLocaleString()} XP</p>
      <div className={cn("w-20 rounded-t-xl flex items-center justify-center", style.bar)}>
        <Medal className={cn("w-4 h-4", position === 1 ? "text-amber-500" : "text-white/20")} strokeWidth={1.5} />
      </div>
    </div>
  );
}

function TrendBadge({ trend, amount }: { trend: string; amount: number }) {
  if (trend === "stable") return (
    <span className="flex items-center gap-0.5 text-[10px] text-moss-300">
      <Minus className="w-3 h-3" />
    </span>
  );
  if (trend === "up") return (
    <span className="flex items-center gap-0.5 text-[10px] text-forest-500 font-semibold">
      <TrendingUp className="w-3 h-3" /> +{amount}
    </span>
  );
  return (
    <span className="flex items-center gap-0.5 text-[10px] text-red-400 font-medium">
      <TrendingDown className="w-3 h-3" /> -{amount}
    </span>
  );
}
