import { SDG_IMPACTS } from "@/lib/data";
import { Target } from "lucide-react";

export function SDGImpactSection() {
  return (
    <div
      className="bg-white rounded-2xl border border-slate-100 p-5 animate-fade-up opacity-0"
      style={{ animationDelay: "350ms", animationFillMode: "forwards" }}
    >
      <div className="flex items-center gap-2 mb-5">
        <Target className="w-4 h-4 text-slate-400" strokeWidth={1.75} />
        <div>
          <h3 className="font-semibold text-slate-900 text-sm leading-none">SDG Impact</h3>
          <p className="text-xs text-slate-400 mt-0.5">Your contribution to global goals</p>
        </div>
      </div>

      <div className="space-y-4">
        {SDG_IMPACTS.map((sdg) => (
          <div key={sdg.goal}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2.5">
                <span
                  className="text-[10px] font-bold w-7 h-7 rounded-md flex items-center justify-center text-white shrink-0 tabular-nums"
                  style={{ background: sdg.color }}
                >
                  {sdg.goal}
                </span>
                <span className="text-xs font-semibold text-teal-800 leading-tight">{sdg.title}</span>
              </div>
              <span className="text-xs font-semibold text-slate-500 font-mono tabular-nums ml-2 shrink-0">{sdg.progress}%</span>
            </div>
            <div className="h-1 bg-slate-100 rounded-full overflow-hidden ml-9">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${sdg.progress}%`, background: sdg.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

