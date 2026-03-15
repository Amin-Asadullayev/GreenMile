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
  1: { ring: "ring-2 ring-teal-300 bg-teal-50 text-slate-700", bar: "h-24 md:h-28 bg-teal-100", label: "text-teal-300" },
  2: { ring: "ring-1 ring-white/20 bg-white/10 text-white",    bar: "h-16 md:h-20 bg-white/10", label: "text-white/50" },
  3: { ring: "ring-1 ring-white/20 bg-white/10 text-white",    bar: "h-12 md:h-14 bg-white/10", label: "text-white/50" },
} as const;

export default function LeaderboardPage() {
  const [filter, setFilter] = useState<Filter>("month");
  const key = SCORE_KEY[filter];
  const sorted = [...LEADERBOARD].sort((a, b) => (b[key] as number) - (a[key] as number));
  const top3 = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  return (
    <div className="max-w-3xl mx-auto space-y-5 md:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="font-semibold text-slate-900 text-xl">Rankings</h2>
          <p className="text-sm text-slate-500 mt-0.5">Who's leading the green charge</p>
        </div>
        <div className="flex gap-1 bg-slate-50 rounded-xl p-1 border border-slate-100">
          {(["week", "month", "alltime"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 md:px-4 py-1.5 rounded-lg text-xs font-semibold transition-all",
                filter === f
                  ? "bg-white text-teal-800 shadow-sm border border-slate-100"
                  : "text-slate-500 hover:text-teal-700"
              )}
            >
              {f === "alltime" ? "All time" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Podium */}
      <div className="bg-teal-800 rounded-2xl px-4 py-5 md:p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)", backgroundSize: "12px 12px" }}
        />
        <p className="text-center text-teal-400 text-[10px] font-semibold uppercase tracking-widest mb-5 md:mb-6 relative">Top performers</p>
        <div className="flex items-end justify-center gap-2 md:gap-4 relative">
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
                "flex items-center gap-3 md:gap-4 px-3.5 md:px-4 py-3 md:py-3.5 rounded-xl border transition-all animate-fade-up opacity-0",
                isMe ? "bg-teal-50 border-teal-200" : "bg-white border-slate-100 hover:border-slate-200"
              )}
              style={{ animationDelay: `${i * 50}ms`, animationFillMode: "forwards" }}
            >
              <span className="text-sm font-semibold text-slate-300 w-5 text-center tabular-nums shrink-0">{i + 4}</span>
              <div
                className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{ background: tier.bg, color: tier.color }}
              >
                {entry.user.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-slate-900 truncate">{entry.user.name}</p>
                  {isMe && <span className="text-[10px] font-bold bg-teal-600 text-white px-1.5 py-0.5 rounded-full shrink-0">You</span>}
                </div>
                <p className="text-xs text-slate-400 mt-0.5 truncate">
                  {entry.user.department}
                  <span className="hidden sm:inline"> · Lv.{entry.user.level} · {entry.user.totalTrips} trips</span>
                </p>
              </div>
              <div className="flex items-center gap-2 md:gap-3 shrink-0">
                <TrendBadge trend={entry.trend} amount={entry.trendAmount} />
                <div className="text-right min-w-[52px]">
                  <p className="text-sm font-semibold text-slate-800 font-mono tabular-nums">{(entry[key] as number).toLocaleString()}</p>
                  <p className="text-[10px] text-slate-400">XP</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Team total */}
      <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 flex items-center gap-3">
        <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center border border-slate-100 shrink-0">
          <Trees className="w-4 h-4 text-teal-600" strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-800">Team impact this month</p>
          <p className="text-xs text-slate-500 mt-0.5 leading-snug">14,530 XP · 1,240 kg CO₂ avoided · equivalent to 56 trees</p>
        </div>
      </div>
    </div>
  );
}

function PodiumCard({ entry, position, score }: { entry: typeof LEADERBOARD[0]; position: 1|2|3; score: number }) {
  if (!entry) return null;
  const isMe = entry.user.id === CURRENT_USER.id;
  const style = POSITION_STYLE[position];
  const size = position === 1 ? "w-12 h-12 md:w-14 md:h-14" : "w-10 h-10 md:w-11 md:h-11";

  return (
    <div className={cn("flex flex-col items-center min-w-0 flex-1 max-w-[120px]", position === 1 && "-translate-y-3 md:-translate-y-4")}>
      <div className={cn("rounded-full flex items-center justify-center text-xs font-bold mb-2 shadow-md shrink-0", size, style.ring)}>
        {isMe ? "You" : entry.user.initials}
      </div>
      <p className={cn("font-semibold text-center leading-tight mb-0.5 w-full truncate px-1", position === 1 ? "text-white text-sm" : "text-white/70 text-xs")}>
        {entry.user.name.split(" ")[0]}
      </p>
      <p className={cn("text-xs font-mono tabular-nums mb-3", style.label)}>{score.toLocaleString()}</p>
      <div className={cn("w-full rounded-t-xl flex items-center justify-center", style.bar)}>
        <Medal className={cn("w-4 h-4", position === 1 ? "text-teal-500" : "text-white/20")} strokeWidth={1.5} />
      </div>
    </div>
  );
}

function TrendBadge({ trend, amount }: { trend: string; amount: number }) {
  if (trend === "stable") return <Minus className="w-3 h-3 text-slate-300" />;
  if (trend === "up") return (
    <span className="flex items-center gap-0.5 text-[10px] text-teal-500 font-semibold">
      <TrendingUp className="w-3 h-3" /> +{amount}
    </span>
  );
  return (
    <span className="flex items-center gap-0.5 text-[10px] text-red-400 font-medium">
      <TrendingDown className="w-3 h-3" /> -{amount}
    </span>
  );
}
