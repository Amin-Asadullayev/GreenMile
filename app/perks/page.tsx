"use client";

import { useState } from "react";
import { PERKS, CURRENT_USER, type Perk } from "@/lib/data";
import { getIcon } from "@/lib/icons";
import { Lock, CheckCircle2, ChevronRight, Zap, Unlock } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "all",       label: "All" },
  { id: "time-off",  label: "Time off" },
  { id: "wellness",  label: "Wellness" },
  { id: "financial", label: "Financial" },
  { id: "remote",    label: "Remote" },
];

export default function PerksPage() {
  const [category, setCategory] = useState("all");
  const [claimedIds, setClaimedIds] = useState<string[]>([]);

  const filtered = category === "all" ? PERKS : PERKS.filter(p => p.category === category);
  const unlocked  = filtered.filter(p => CURRENT_USER.level >= p.requiredLevel);
  const locked    = filtered.filter(p => CURRENT_USER.level < p.requiredLevel);

  function claim(perk: Perk) {
    if (!claimedIds.includes(perk.id)) setClaimedIds(prev => [...prev, perk.id]);
  }

  const nextLocked = PERKS.find(p => CURRENT_USER.level < p.requiredLevel);
  const NextIcon = nextLocked ? getIcon(nextLocked.iconName) : null;

  return (
    <div className="max-w-4xl mx-auto space-y-5 md:space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-semibold text-slate-900 text-xl">Perks & Rewards</h2>
          <p className="text-sm text-slate-500 mt-0.5">Level up to unlock rewards</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs text-slate-400">Level</p>
          <p className="text-2xl font-bold font-mono text-teal-700 leading-none mt-0.5">{CURRENT_USER.level}</p>
        </div>
      </div>

      {/* Next perk progress */}
      {nextLocked && NextIcon && (
        <div className="bg-white border border-slate-100 rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center border border-teal-100 shrink-0">
            <NextIcon className="w-5 h-5 text-teal-600" strokeWidth={1.75} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">
              Next: <span className="text-teal-600">{nextLocked.name}</span>
              <span className="text-slate-400 font-normal ml-1.5 hidden sm:inline">· {nextLocked.requiredLevel - CURRENT_USER.level} level{nextLocked.requiredLevel - CURRENT_USER.level > 1 ? "s" : ""} away</span>
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 rounded-full"
                  style={{ width: `${Math.max(8, 100 - (nextLocked.requiredLevel - CURRENT_USER.level) * 15)}%` }}
                />
              </div>
              <span className="text-[11px] text-slate-400 shrink-0 sm:hidden">
                {nextLocked.requiredLevel - CURRENT_USER.level}lv away
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Category filter — scrollable on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium border transition-all shrink-0",
              category === c.id
                ? "bg-teal-700 text-white border-teal-700"
                : "bg-white text-slate-600 border-slate-100 hover:border-slate-200 hover:text-slate-800"
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Unlocked */}
      {unlocked.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Unlock className="w-3.5 h-3.5 text-teal-500" strokeWidth={2} />
            <h3 className="text-sm font-semibold text-slate-900">Unlocked</h3>
            <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-semibold">{unlocked.length}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {unlocked.map((perk, i) => (
              <PerkCard key={perk.id} perk={perk} unlocked claimed={claimedIds.includes(perk.id)} onClaim={() => claim(perk)} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Locked */}
      {locked.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
            <h3 className="text-sm font-semibold text-slate-500">Coming up</h3>
            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-semibold">{locked.length}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {locked.map((perk, i) => (
              <PerkCard key={perk.id} perk={perk} unlocked={false} claimed={false} onClaim={() => {}} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PerkCard({ perk, unlocked, claimed, onClaim, index }: {
  perk: Perk; unlocked: boolean; claimed: boolean; onClaim: () => void; index: number;
}) {
  const Icon = getIcon(perk.iconName);
  const levelsAway = perk.requiredLevel - CURRENT_USER.level;

  return (
    <div
      className={cn(
        "relative rounded-xl border p-4 md:p-5 transition-all animate-fade-up opacity-0",
        unlocked ? "bg-white border-slate-200 hover:border-teal-200" : "bg-slate-50/60 border-slate-100"
      )}
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: "forwards" }}
    >
      <div className="absolute top-4 right-4">
        {claimed ? (
          <span className="flex items-center gap-1 text-[10px] font-semibold bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
            <CheckCircle2 className="w-3 h-3" /> Claimed
          </span>
        ) : unlocked ? (
          <span className="text-[10px] font-semibold bg-teal-700 text-white px-2 py-1 rounded-full">Unlocked</span>
        ) : (
          <span className="flex items-center gap-1 text-[10px] font-semibold bg-slate-100 text-slate-500 px-2 py-1 rounded-full">
            <Lock className="w-2.5 h-2.5" /> Lv.{perk.requiredLevel}
          </span>
        )}
      </div>

      <div className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center mb-3 md:mb-4 border",
        unlocked ? "bg-teal-50 border-teal-100" : "bg-slate-100 border-slate-200"
      )}>
        <Icon className={cn("w-5 h-5", unlocked ? "text-teal-600" : "text-slate-400")} strokeWidth={1.75} />
      </div>

      <h3 className={cn("font-semibold text-sm mb-1", unlocked ? "text-slate-900" : "text-slate-500")}>{perk.name}</h3>
      <p className="text-xs text-slate-400 mb-4 leading-relaxed">{perk.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Zap className="w-3 h-3 text-teal-500" strokeWidth={2} />
          <span className="text-xs text-slate-400 font-mono tabular-nums">{perk.requiredXp.toLocaleString()} XP</span>
        </div>
        <span className={cn(
          "text-xs font-bold px-2.5 py-1 rounded-lg",
          unlocked ? "bg-teal-100 text-teal-700" : "bg-slate-100 text-slate-500"
        )}>
          {perk.value}
        </span>
      </div>

      {unlocked && !claimed && (
        <button
          onClick={onClaim}
          className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold rounded-xl transition-all active:scale-[0.98]"
        >
          Claim reward <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {!unlocked && (
        <div className="mt-4">
          <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-slate-300 rounded-full" style={{ width: `${Math.max(4, 100 - levelsAway * 15)}%` }} />
          </div>
          <p className="text-[10px] text-slate-400 mt-1.5">{levelsAway} level{levelsAway > 1 ? "s" : ""} to unlock</p>
        </div>
      )}
    </div>
  );
}
