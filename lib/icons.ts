import {
  Footprints, Bike, Zap, TrainFront, Bus, Users,
  CreditCard, CalendarPlus, Dumbbell, Laptop, Wallet,
  Plane, HeartPulse, Globe, Podcast,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Footprints,
  Bike,
  Zap,
  TrainFront,
  Bus,
  Users,
  CreditCard,
  CalendarPlus,
  Dumbbell,
  Laptop,
  Wallet,
  Plane,
  HeartPulse,
  Globe,
  Podcast,
};

export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Globe;
}
