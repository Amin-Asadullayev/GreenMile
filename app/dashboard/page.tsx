import { Leaf, Zap, Route, TrendingUp, Award, ChevronRight } from "lucide-react";
import { XPProgressCard } from "@/components/ui/XPProgressCard";
import { StatCard } from "@/components/ui/StatCard";
import { WeeklyChart } from "@/components/charts/WeeklyChart";
import { TripItem } from "@/components/ui/TripItem";
import { SDGImpactSection } from "@/components/ui/SDGImpact";
import { CURRENT_USER, RECENT_TRIPS, PERKS } from "@/lib/data";
import { getIcon } from "@/lib/icons";
import Link from "next/link";

export default function DashboardPage() {
  const nextPerk = PERKS.find(p => CURRENT_USER.level < p.requiredLevel);
  const NextPerkIcon = nextPerk ? getIcon(nextPerk.iconName) : null;

  return (
    <div className="space-y-6">
      {/* Hero + stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <XPProgressCard />
        <StatCard label="CO₂ Saved"     value={CURRENT_USER.totalCo2Saved.toFixed(1)} unit="kg"  delta="3.2 kg this week"  deltaPositive icon={Leaf}        iconColor="text-forest-500" delay={50}  />
        <StatCard label="Total Trips"   value={CURRENT_USER.totalTrips}                           delta="4 trips this week" deltaPositive icon={Route}       iconColor="text-sage-500"   delay={100} />
        <StatCard label="Distance"      value={CURRENT_USER.totalDistanceKm}           unit="km" delta="18.8 km this week" deltaPositive icon={TrendingUp}   iconColor="text-moss-500"   delay={150} />
        <StatCard label="XP Earned"     value={CURRENT_USER.xp.toLocaleString()}                 delta="340 this week"     deltaPositive icon={Zap}         iconColor="text-amber-500"  delay={200} />
        <StatCard label="Company Rank"  value={`#${CURRENT_USER.rank}`}                          delta="Up 2 this month"   deltaPositive icon={Award}       iconColor="text-earth-500"  delay={250} />
      </div>

      {/* Next perk callout */}
      {nextPerk && NextPerkIcon && (
        <div
          className="bg-white border border-amber-100 rounded-2xl p-4 flex items-center gap-4 animate-fade-up opacity-0"
          style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
        >
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0 border border-amber-100">
            <NextPerkIcon className="w-5 h-5 text-amber-600" strokeWidth={1.75} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-forest-900">
              {nextPerk.name} is {nextPerk.requiredLevel - CURRENT_USER.level} level{nextPerk.requiredLevel - CURRENT_USER.level > 1 ? "s" : ""} away
            </p>
            <p className="text-xs text-moss-500 mt-0.5 truncate">{nextPerk.description}</p>
          </div>
          <Link
            href="/perks"
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-moss-600 hover:text-forest-800 border border-moss-100 hover:border-moss-200 rounded-lg bg-white transition-all shrink-0"
          >
            View perks <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Chart + SDG */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <WeeklyChart />
        </div>
        <SDGImpactSection />
      </div>

      {/* Recent trips */}
      <div className="animate-fade-up opacity-0" style={{ animationDelay: "400ms", animationFillMode: "forwards" }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-forest-900 text-sm">Recent trips</h3>
          <Link href="/trips" className="text-xs font-medium text-moss-500 hover:text-forest-700 transition-colors">
            View all
          </Link>
        </div>
        <div className="space-y-2">
          {RECENT_TRIPS.slice(0, 5).map((trip, i) => (
            <TripItem key={trip.id} trip={trip} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
