"use client";

import { useState } from "react";
import { RECENT_TRIPS, VEHICLE_CONFIG, type VehicleType } from "@/lib/data";
import { getIcon } from "@/lib/icons";
import { TripItem } from "@/components/ui/TripItem";
import { formatDate, cn } from "@/lib/utils";
import { SlidersHorizontal, Route } from "lucide-react";

const ALL_VEHICLES: VehicleType[] = ["bike", "walk", "metro", "bus", "ebike", "scooter", "carpool"];

export default function TripsPage() {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | "all">("all");

  const filtered = selectedVehicle === "all"
    ? RECENT_TRIPS
    : RECENT_TRIPS.filter(t => t.vehicle === selectedVehicle);

  const totalXp  = filtered.reduce((s, t) => s + t.xpEarned, 0);
  const totalCo2 = filtered.reduce((s, t) => s + t.co2SavedKg, 0);
  const totalKm  = filtered.reduce((s, t) => s + t.distanceKm, 0);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="font-semibold text-forest-900 text-xl">Trip history</h2>
        <p className="text-sm text-moss-500 mt-0.5">{RECENT_TRIPS.length} trips logged</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total XP",  value: totalXp.toLocaleString(), suffix: "XP", color: "text-forest-600" },
          { label: "CO₂ Saved", value: totalCo2.toFixed(1),      suffix: "kg", color: "text-sage-600"   },
          { label: "Distance",  value: totalKm.toFixed(1),        suffix: "km", color: "text-moss-600"   },
        ].map(({ label, value, suffix, color }) => (
          <div key={label} className="bg-white rounded-xl border border-moss-100 p-4 text-center">
            <p className="text-[10px] text-moss-400 uppercase tracking-wider font-semibold mb-1.5">{label}</p>
            <p className={cn("text-xl font-bold font-mono tabular-nums", color)}>
              {value}
              <span className="text-sm font-medium text-moss-400 ml-1">{suffix}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Vehicle filter */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <SlidersHorizontal className="w-3.5 h-3.5 text-moss-400" strokeWidth={1.75} />
          <span className="text-xs font-semibold text-moss-500 uppercase tracking-wider">Filter by transport</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedVehicle("all")}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
              selectedVehicle === "all"
                ? "bg-forest-700 text-white border-forest-700"
                : "bg-white text-moss-600 border-moss-100 hover:border-moss-200"
            )}
          >
            All
          </button>
          {ALL_VEHICLES.map(v => {
            const cfg = VEHICLE_CONFIG[v];
            const VehicleIcon = getIcon(cfg.iconName);
            const count = RECENT_TRIPS.filter(t => t.vehicle === v).length;
            if (count === 0) return null;
            const active = selectedVehicle === v;
            return (
              <button
                key={v}
                onClick={() => setSelectedVehicle(v)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                  active
                    ? "bg-forest-700 text-white border-forest-700"
                    : "bg-white text-moss-600 border-moss-100 hover:border-moss-200"
                )}
              >
                <VehicleIcon
                  className="w-3 h-3"
                  style={{ color: active ? "white" : cfg.color }}
                  strokeWidth={2}
                />
                {cfg.label}
                <span className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded-full font-bold tabular-nums",
                  active ? "bg-white/20 text-white" : "bg-moss-100 text-moss-500"
                )}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Trip list grouped by date */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center py-14 text-center">
          <div className="w-10 h-10 bg-moss-100 rounded-full flex items-center justify-center mb-3">
            <Route className="w-4 h-4 text-moss-400" strokeWidth={1.75} />
          </div>
          <p className="text-sm font-medium text-moss-500">No trips found</p>
          <p className="text-xs text-moss-400 mt-1">Try a different filter</p>
        </div>
      ) : (
        <div className="space-y-5">
          {groupByDate(filtered).map(({ date, trips }) => (
            <div key={date}>
              <p className="text-xs font-semibold text-moss-400 uppercase tracking-wider mb-2 pl-1">{date}</p>
              <div className="space-y-2">
                {trips.map((trip, i) => (
                  <TripItem key={trip.id} trip={trip} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function groupByDate(trips: typeof RECENT_TRIPS) {
  const map = new Map<string, typeof trips>();
  for (const trip of trips) {
    const label = formatDate(trip.date);
    if (!map.has(label)) map.set(label, []);
    map.get(label)!.push(trip);
  }
  return Array.from(map.entries()).map(([date, trips]) => ({ date, trips }));
}
