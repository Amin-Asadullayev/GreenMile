import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  delta?: string;
  deltaPositive?: boolean;
  icon?: LucideIcon;
  iconColor?: string;
  className?: string;
  delay?: number;
}

export function StatCard({
  label, value, unit, delta, deltaPositive,
  icon: Icon, iconColor = "text-teal-500",
  className, delay = 0,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-slate-100 p-4 animate-fade-up opacity-0",
        className
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider leading-none">
          {label}
        </span>
        {Icon && (
          <div className="w-7 h-7 bg-slate-50 rounded-lg flex items-center justify-center">
            <Icon className={cn("w-3.5 h-3.5", iconColor)} strokeWidth={1.75} />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums leading-none">
          {value}
        </span>
        {unit && (
          <span className="text-sm text-slate-400 font-medium">{unit}</span>
        )}
      </div>

      {delta && (
        <div className={cn(
          "flex items-center gap-1 text-[11px] font-medium",
          deltaPositive ? "text-teal-600" : "text-red-500"
        )}>
          {deltaPositive
            ? <TrendingUp   className="w-3 h-3 shrink-0" strokeWidth={2} />
            : <TrendingDown className="w-3 h-3 shrink-0" strokeWidth={2} />
          }
          {delta}
        </div>
      )}
    </div>
  );
}
