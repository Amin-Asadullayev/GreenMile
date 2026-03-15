import { VEHICLE_CONFIG, type Trip } from "@/lib/data";
import { getIcon } from "@/lib/icons";
import { formatDate } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface TripItemProps {
  trip: Trip;
  index?: number;
}

export function TripItem({ trip, index = 0 }: TripItemProps) {
  const vehicle = VEHICLE_CONFIG[trip.vehicle];
  const VehicleIcon = getIcon(vehicle.iconName);

  return (
    <div
      className="flex items-center gap-4 px-4 py-3.5 bg-white rounded-xl border border-slate-100 hover:border-slate-200 transition-all animate-fade-up opacity-0"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: "forwards" }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: vehicle.color + "14" }}
      >
        <VehicleIcon className="w-4 h-4" style={{ color: vehicle.color }} strokeWidth={2} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-sm font-medium text-slate-900">
          <span>{trip.from}</span>
          <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
          <span>{trip.to}</span>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          {vehicle.label} · {trip.distanceKm} km · {trip.durationMin} min · {formatDate(trip.date)}
        </p>
      </div>

      <div className="text-right shrink-0">
        <p className="text-sm font-semibold text-teal-600 font-mono tabular-nums">+{trip.xpEarned} XP</p>
        <p className="text-xs text-slate-400 font-mono tabular-nums mt-0.5">−{trip.co2SavedKg} kg CO₂</p>
      </div>
    </div>
  );
}
