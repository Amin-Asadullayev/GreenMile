"use client";

import { useState } from "react";
import { Plus, X, ChevronRight, Zap, CheckCircle } from "lucide-react";
import { VEHICLE_CONFIG, type VehicleType } from "@/lib/data";
import { getIcon } from "@/lib/icons";
import { getXpForVehicle, getCo2Saved, cn } from "@/lib/utils";

export function LogTripButton() {
  const [open, setOpen] = useState(false);
  const [vehicle, setVehicle] = useState<VehicleType>("bike");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [km, setKm] = useState("4.2");
  const [submitted, setSubmitted] = useState(false);

  const xp = getXpForVehicle(vehicle, parseFloat(km) || 0);
  const co2 = getCo2Saved(vehicle, parseFloat(km) || 0);

  function handleSubmit() {
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setSubmitted(false);
      setFrom(""); setTo(""); setKm("4.2");
    }, 2200);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-lg transition-all active:scale-95"
      >
        <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
        Log trip
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md mx-4 sm:mx-0 shadow-xl animate-fade-up border border-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {submitted ? (
              <div className="p-10 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-teal-600" strokeWidth={2} />
                </div>
                <h3 className="font-semibold text-slate-900 text-lg mb-1">Trip logged</h3>
                <p className="text-slate-500 text-sm mb-5">Your commute has been recorded</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-teal-600 font-mono">+{xp}</p>
                    <p className="text-xs text-slate-400 mt-0.5">XP earned</p>
                  </div>
                  <div className="w-px h-8 bg-slate-100" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-teal-600 font-mono">{co2}</p>
                    <p className="text-xs text-slate-400 mt-0.5">kg CO₂ avoided</p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                  <div>
                    <h2 className="font-semibold text-slate-900 text-sm">Log a trip</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Record your eco commute</p>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-5 space-y-5">
                  {/* Transport mode */}
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5 block">
                      Transport mode
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {(Object.keys(VEHICLE_CONFIG) as VehicleType[]).map((v) => {
                        const cfg = VEHICLE_CONFIG[v];
                        const Icon = getIcon(cfg.iconName);
                        const active = vehicle === v;
                        return (
                          <button
                            key={v}
                            onClick={() => setVehicle(v)}
                            className={cn(
                              "flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-xs font-medium transition-all",
                              active
                                ? "border-teal-400 bg-teal-50 text-teal-700"
                                : "border-slate-100 text-slate-500 hover:border-slate-200 hover:bg-slate-50"
                            )}
                          >
                            <Icon
                              className="w-4 h-4"
                              style={{ color: active ? cfg.color : undefined }}
                              strokeWidth={active ? 2.5 : 1.75}
                            />
                            <span>{cfg.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Route */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">From</label>
                      <input
                        type="text"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        placeholder="e.g. Home"
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-100 rounded-lg text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-teal-300 focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">To</label>
                      <input
                        type="text"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        placeholder="e.g. Office"
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-100 rounded-lg text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-teal-300 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Distance */}
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Distance (km)</label>
                    <input
                      type="number"
                      value={km}
                      onChange={(e) => setKm(e.target.value)}
                      min="0.1"
                      step="0.1"
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-100 rounded-lg text-slate-900 focus:outline-none focus:border-teal-300 focus:bg-white transition-all"
                    />
                  </div>

                  {/* XP Preview */}
                  <div className="flex items-center justify-between px-4 py-3 bg-teal-50 rounded-xl border border-teal-100">
                    <div className="flex items-center gap-2 text-teal-700">
                      <Zap className="w-3.5 h-3.5 text-teal-500" strokeWidth={2} />
                      <span className="text-sm font-medium">Estimated reward</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="font-bold text-teal-700 font-mono">+{xp} XP</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500 font-medium">−{co2} kg CO₂</span>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                  >
                    Log trip
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

