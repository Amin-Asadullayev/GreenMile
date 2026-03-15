"use client";

import { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell, CartesianGrid, Legend,
} from "recharts";
import { ADMIN_STATS, LEADERBOARD } from "@/lib/data";
import { Users, Leaf, TrendingUp, Zap, Building2, Award } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminPage() {
  const [deptMetric, setDeptMetric] = useState<"co2Saved" | "trips" | "activeUsers">("co2Saved");

  const METRIC_LABELS: Record<typeof deptMetric, string> = {
    co2Saved: "CO₂ Saved (kg)",
    trips: "Total Trips",
    activeUsers: "Active Users",
  };

  const DEPT_COLORS = ["#2d9e2d", "#4cbb4c", "#73b84e", "#9dcf7d", "#3e7c23", "#539c32", "#98bf96"];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-moss-100 rounded-xl p-3 shadow-lg text-xs">
          <p className="font-semibold text-forest-800 mb-1">{label}</p>
          {payload.map((p: any) => (
            <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value.toLocaleString()}</p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-semibold text-forest-900 text-xl">Admin Overview</h2>
          <p className="text-sm text-moss-500 mt-0.5">Company-wide sustainability dashboard</p>
        </div>
        <span className="px-3 py-1.5 bg-amber-50 border border-amber-100 text-amber-700 text-xs font-semibold rounded-xl">
          March 2025
        </span>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Active employees", value: ADMIN_STATS.activeThisMonth, total: ADMIN_STATS.totalEmployees, icon: Users, color: "text-forest-500" },
          { label: "CO₂ avoided", value: `${ADMIN_STATS.totalCo2ThisMonth}kg`, icon: Leaf, color: "text-sage-500", delta: `+${ADMIN_STATS.co2TrendVsLastMonth}% vs last month` },
          { label: "Total trips", value: ADMIN_STATS.totalTripsThisMonth.toLocaleString(), icon: TrendingUp, color: "text-moss-500" },
          { label: "Participation", value: `${ADMIN_STATS.participationRate}%`, icon: Award, color: "text-earth-500" },
        ].map(({ label, value, total, icon: Icon, color, delta }, i) => (
          <div
            key={label}
            className="bg-white rounded-2xl border border-moss-100 p-4 animate-fade-up opacity-0"
            style={{ animationDelay: `${i * 60}ms`, animationFillMode: "forwards" }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-moss-500 uppercase tracking-wide leading-tight">{label}</span>
              <div className="w-8 h-8 bg-forest-50 rounded-xl flex items-center justify-center">
                <Icon className={cn("w-4 h-4", color)} strokeWidth={2} />
              </div>
            </div>
            <p className="text-2xl font-bold font-mono text-forest-900">{value}</p>
            {total && <p className="text-xs text-moss-400 mt-1">of {total} total</p>}
            {delta && <p className="text-xs text-forest-600 mt-1 font-medium">{delta}</p>}
          </div>
        ))}
      </div>

      {/* Monthly trend chart */}
      <div className="bg-white rounded-2xl border border-moss-100 p-5 animate-fade-up opacity-0"
        style={{ animationDelay: "250ms", animationFillMode: "forwards" }}
      >
        <h3 className="font-semibold text-forest-900 mb-1 text-sm">Monthly trends</h3>
        <p className="text-xs text-moss-500 mb-4">CO₂ saved and participation over time</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={ADMIN_STATS.monthlyTrend} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e3f2d8" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#699e66" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#98bf96" }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "12px" }} />
            <Line type="monotone" dataKey="co2" name="CO₂ (kg)" stroke="#2d9e2d" strokeWidth={2.5} dot={{ fill: "#2d9e2d", r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="participants" name="Active users" stroke="#ae874e" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: "#ae874e", r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Department breakdown */}
      <div className="bg-white rounded-2xl border border-moss-100 p-5 animate-fade-up opacity-0"
        style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-forest-900 text-sm">Department breakdown</h3>
            <p className="text-xs text-moss-500 mt-0.5">Performance by team</p>
          </div>
          <div className="flex gap-1.5 bg-moss-50 rounded-xl p-1 border border-moss-100">
            {(["co2Saved", "trips", "activeUsers"] as typeof deptMetric[]).map(m => (
              <button
                key={m}
                onClick={() => setDeptMetric(m)}
                className={cn(
                  "px-3 py-1 rounded-lg text-[11px] font-semibold transition-all",
                  deptMetric === m ? "bg-white text-forest-700 shadow-sm" : "text-moss-500 hover:text-forest-700"
                )}
              >
                {METRIC_LABELS[m]}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={ADMIN_STATS.departmentData} barSize={28} margin={{ top: 0, right: 0, left: -15, bottom: 0 }}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#699e66" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#98bf96" }} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(197,228,175,0.2)", radius: 6 }} />
            <Bar dataKey={deptMetric} name={METRIC_LABELS[deptMetric]} radius={[6, 6, 2, 2]}>
              {ADMIN_STATS.departmentData.map((_, i) => (
                <Cell key={i} fill={DEPT_COLORS[i % DEPT_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top performers table */}
      <div className="bg-white rounded-2xl border border-moss-100 p-5 animate-fade-up opacity-0"
        style={{ animationDelay: "350ms", animationFillMode: "forwards" }}
      >
        <h3 className="font-semibold text-forest-900 text-sm mb-4">Top performers this month</h3>
        <div className="space-y-2">
          {LEADERBOARD.slice(0, 5).map((entry, i) => (
            <div key={entry.user.id} className="flex items-center gap-3 py-2.5 border-b border-moss-50 last:border-0">
              <span className="text-xs font-bold text-moss-400 w-5">{i + 1}</span>
              <div className="w-8 h-8 rounded-full bg-forest-100 flex items-center justify-center text-xs font-bold text-forest-700 shrink-0">
                {entry.user.initials}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-forest-900">{entry.user.name}</p>
                <p className="text-xs text-moss-400">{entry.user.department}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold font-mono text-forest-600">{entry.monthlyXp.toLocaleString()} XP</p>
                <p className="text-[10px] text-moss-400">{entry.weeklyTrips} trips/wk</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
