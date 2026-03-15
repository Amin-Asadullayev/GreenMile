"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { WEEKLY_DATA } from "@/lib/data";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-lg text-xs">
        <p className="font-semibold text-teal-800 mb-1.5">{label}</p>
        <p className="text-teal-600 font-mono tabular-nums">+{payload[0]?.value} XP</p>
        <p className="text-slate-500 font-mono tabular-nums">{payload[0]?.payload.co2} kg CO₂ saved</p>
        <p className="text-slate-400">{payload[0]?.payload.trips} trip{payload[0]?.payload.trips !== 1 ? "s" : ""}</p>
      </div>
    );
  }
  return null;
};

export function WeeklyChart() {
  const today = new Date().getDay();
  const dayIndex = today === 0 ? 6 : today - 1;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 animate-fade-up opacity-0"
      style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-900 text-sm">Weekly activity</h3>
          <p className="text-xs text-slate-500 mt-0.5">XP earned per day</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-teal-500 inline-block" />
            This week
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={120}>
        <BarChart data={WEEKLY_DATA} barSize={24} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#64748b" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "#94a3b8" }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(197, 228, 175, 0.2)", radius: 6 }} />
          <Bar dataKey="xp" radius={[6, 6, 2, 2]}>
            {WEEKLY_DATA.map((entry, index) => (
              <Cell
                key={index}
                fill={index === dayIndex ? "#0d9488" : index < dayIndex ? "#5eead4" : "#ccfbf1"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
