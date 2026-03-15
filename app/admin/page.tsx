"use client";

import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell, CartesianGrid, Legend,
} from "recharts";
import { ADMIN_STATS, LEADERBOARD } from "@/lib/data";
import { Users, Leaf, TrendingUp, Award } from "lucide-react";
import { cn } from "@/lib/utils";

type DeptMetric = "co2Saved" | "trips" | "activeUsers";

const METRIC_LABELS: Record<DeptMetric, string> = {
  co2Saved: "CO₂ (kg)",
  trips: "Trips",
  activeUsers: "Users",
};

const DEPT_COLORS = ["#0d9488", "#14b8a6", "#2dd4bf", "#5eead4", "#0f766e", "#10b981", "#94a3b8"];

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-lg text-xs">
      <p className="font-semibold text-slate-800 mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value.toLocaleString()}</p>
      ))}
    </div>
  );
}

export default function AdminPage() {
  const [deptMetric, setDeptMetric] = useState<DeptMetric>("co2Saved");

  return (
    <div className="space-y-5 md:space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h2 className="font-semibold text-slate-900 text-xl">Admin Overview</h2>
          <p className="text-sm text-slate-500 mt-0.5">Company-wide sustainability dashboard</p>
        </div>
        <span className="px-3 py-1.5 bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold rounded-xl shrink-0">
          March 2025
        </span>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Active employees", value: ADMIN_STATS.activeThisMonth,                    icon: Users,      color: "text-teal-500",    sub: `of ${ADMIN_STATS.totalEmployees} total` },
          { label: "CO₂ avoided",      value: `${ADMIN_STATS.totalCo2ThisMonth}kg`,            icon: Leaf,       color: "text-emerald-500", sub: `+${ADMIN_STATS.co2TrendVsLastMonth}% vs last month` },
          { label: "Total trips",      value: ADMIN_STATS.totalTripsThisMonth.toLocaleString(),icon: TrendingUp, color: "text-slate-500",   sub: "this month" },
          { label: "Participation",    value: `${ADMIN_STATS.participationRate}%`,              icon: Award,      color: "text-teal-500",    sub: "of workforce active" },
        ].map(({ label, value, icon: Icon, color, sub }, i) => (
          <div
            key={label}
            className="bg-white rounded-xl border border-slate-100 p-4 animate-fade-up opacity-0"
            style={{ animationDelay: `${i * 60}ms`, animationFillMode: "forwards" }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider leading-tight">{label}</span>
              <div className="w-7 h-7 bg-slate-50 rounded-lg flex items-center justify-center">
                <Icon className={cn("w-3.5 h-3.5", color)} strokeWidth={1.75} />
              </div>
            </div>
            <p className="text-2xl font-bold font-mono text-slate-900 tabular-nums">{value}</p>
            <p className="text-xs text-slate-400 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* Monthly trend */}
      <div
        className="bg-white rounded-xl border border-slate-100 p-4 md:p-5 animate-fade-up opacity-0"
        style={{ animationDelay: "250ms", animationFillMode: "forwards" }}
      >
        <h3 className="font-semibold text-slate-900 text-sm mb-0.5">Monthly trends</h3>
        <p className="text-xs text-slate-400 mb-4">CO₂ saved and participation over time</p>
        <div className="overflow-x-auto">
          <div style={{ minWidth: 300 }}>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={ADMIN_STATS.monthlyTrend} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} />
                <Tooltip content={<ChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "12px" }} />
                <Line type="monotone" dataKey="co2" name="CO₂ (kg)" stroke="#0d9488" strokeWidth={2.5} dot={{ fill: "#0d9488", r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="participants" name="Active users" stroke="#6366f1" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: "#6366f1", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Department breakdown */}
      <div
        className="bg-white rounded-xl border border-slate-100 p-4 md:p-5 animate-fade-up opacity-0"
        style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
      >
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">By department</h3>
            <p className="text-xs text-slate-400 mt-0.5">Performance by team</p>
          </div>
          <div className="flex gap-1 bg-slate-50 rounded-xl p-1 border border-slate-100">
            {(Object.keys(METRIC_LABELS) as DeptMetric[]).map(m => (
              <button
                key={m}
                onClick={() => setDeptMetric(m)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all",
                  deptMetric === m ? "bg-white text-teal-700 shadow-sm" : "text-slate-500 hover:text-teal-700"
                )}
              >
                {METRIC_LABELS[m]}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <div style={{ minWidth: 300 }}>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={ADMIN_STATS.departmentData} barSize={24} margin={{ top: 0, right: 0, left: -15, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(13,148,136,0.06)", radius: 4 }} />
                <Bar dataKey={deptMetric} name={METRIC_LABELS[deptMetric]} radius={[4, 4, 2, 2]}>
                  {ADMIN_STATS.departmentData.map((_, i) => (
                    <Cell key={i} fill={DEPT_COLORS[i % DEPT_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top performers */}
      <div
        className="bg-white rounded-xl border border-slate-100 p-4 md:p-5 animate-fade-up opacity-0"
        style={{ animationDelay: "350ms", animationFillMode: "forwards" }}
      >
        <h3 className="font-semibold text-slate-900 text-sm mb-4">Top performers this month</h3>
        <div className="space-y-1">
          {LEADERBOARD.slice(0, 5).map((entry, i) => (
            <div key={entry.user.id} className="flex items-center gap-3 py-2.5 border-b border-slate-50 last:border-0">
              <span className="text-xs font-bold text-slate-300 w-4 tabular-nums">{i + 1}</span>
              <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-xs font-bold text-teal-700 shrink-0">
                {entry.user.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{entry.user.name}</p>
                <p className="text-xs text-slate-400 truncate">{entry.user.department}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-semibold font-mono text-teal-600 tabular-nums">{entry.monthlyXp.toLocaleString()} XP</p>
                <p className="text-[10px] text-slate-400">{entry.weeklyTrips} trips/wk</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
