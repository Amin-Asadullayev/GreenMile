// ─── Types ───────────────────────────────────────────────────────────────────

export type VehicleType = "bike" | "walk" | "metro" | "bus" | "ebike" | "scooter" | "carpool";
export type RankTier = "seedling" | "sprout" | "sapling" | "eco-rider" | "green-commuter" | "eco-champion" | "sustainability-hero";

export interface Trip {
  id: string;
  userId: string;
  date: string;
  from: string;
  to: string;
  vehicle: VehicleType;
  distanceKm: number;
  xpEarned: number;
  co2SavedKg: number;
  durationMin: number;
}

export interface Perk {
  id: string;
  name: string;
  description: string;
  iconName: string;
  category: "time-off" | "wellness" | "financial" | "remote";
  requiredLevel: number;
  requiredXp: number;
  value: string;
}

export interface User {
  id: string;
  name: string;
  initials: string;
  department: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  tier: RankTier;
  totalTrips: number;
  totalCo2Saved: number;
  totalDistanceKm: number;
  rank: number;
  streak: number;
  joinedAt: string;
  avatar?: string;
}

export interface LeaderboardEntry {
  rank: number;
  user: User;
  weeklyXp: number;
  monthlyXp: number;
  allTimeXp: number;
  weeklyTrips: number;
  trend: "up" | "down" | "stable";
  trendAmount: number;
}

export interface WeeklyData {
  day: string;
  xp: number;
  co2: number;
  trips: number;
}

export interface SDGImpact {
  goal: number;
  title: string;
  description: string;
  progress: number;
  color: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

export const VEHICLE_CONFIG: Record<VehicleType, { label: string; iconName: string; xpPerKm: number; co2PerKm: number; color: string }> = {
  walk:    { label: "Walking",  iconName: "Footprints",  xpPerKm: 30,  co2PerKm: 0.0,  color: "#4cbb4c" },
  bike:    { label: "Cycling",  iconName: "Bike",        xpPerKm: 25,  co2PerKm: 0.0,  color: "#2d9e2d" },
  ebike:   { label: "E-Bike",   iconName: "Zap",         xpPerKm: 20,  co2PerKm: 0.02, color: "#73b84e" },
  scooter: { label: "Scooter",  iconName: "Podcast",     xpPerKm: 18,  co2PerKm: 0.05, color: "#9dcf7d" },
  metro:   { label: "Metro",    iconName: "TrainFront",  xpPerKm: 15,  co2PerKm: 0.04, color: "#539c32" },
  bus:     { label: "Bus",      iconName: "Bus",         xpPerKm: 12,  co2PerKm: 0.06, color: "#3e7c23" },
  carpool: { label: "Carpool",  iconName: "Users",       xpPerKm: 8,   co2PerKm: 0.08, color: "#ae874e" },
};

export const TIER_CONFIG: Record<RankTier, { label: string; minLevel: number; color: string; bg: string }> = {
  "seedling":           { label: "Seedling",           minLevel: 1,  color: "#84d684", bg: "#f0faf0" },
  "sprout":             { label: "Sprout",              minLevel: 3,  color: "#4cbb4c", bg: "#dcf5dc" },
  "sapling":            { label: "Sapling",             minLevel: 5,  color: "#2d9e2d", bg: "#b8eab8" },
  "eco-rider":          { label: "Eco Rider",           minLevel: 8,  color: "#1f7f1f", bg: "#84d684" },
  "green-commuter":     { label: "Green Commuter",      minLevel: 12, color: "#166316", bg: "#4cbb4c" },
  "eco-champion":       { label: "Eco Champion",        minLevel: 17, color: "#104e10", bg: "#2d9e2d" },
  "sustainability-hero":{ label: "Sustainability Hero", minLevel: 25, color: "#061f06", bg: "#1f7f1f" },
};

export const LEVEL_XP_TABLE = [0, 200, 450, 750, 1100, 1500, 1950, 2450, 3000, 3600, 4250, 4950, 5700, 6500, 7350, 8250, 9200, 10200, 11250, 12350];

// ─── Mock Data ────────────────────────────────────────────────────────────────

export const CURRENT_USER: User = {
  id: "u1",
  name: "Dashdemir Zeynalli",
  initials: "AM",
  department: "Engineering",
  level: 7,
  xp: 2340,
  xpToNextLevel: 3000,
  tier: "eco-champion",
  totalTrips: 31,
  totalCo2Saved: 48.4,
  totalDistanceKm: 312,
  rank: 4,
  streak: 9,
  joinedAt: "2024-09-01",
};

export const RECENT_TRIPS: Trip[] = [
  { id: "t1", userId: "u1", date: "2025-03-15", from: "Home", to: "Office", vehicle: "bike",  distanceKm: 4.2, xpEarned: 120, co2SavedKg: 0.84, durationMin: 18 },
  { id: "t2", userId: "u1", date: "2025-03-14", from: "Office", to: "Client HQ", vehicle: "metro", distanceKm: 8.1, xpEarned: 98,  co2SavedKg: 1.31, durationMin: 22 },
  { id: "t3", userId: "u1", date: "2025-03-14", from: "Café", to: "Office", vehicle: "walk", distanceKm: 1.1, xpEarned: 42,  co2SavedKg: 0.22, durationMin: 14 },
  { id: "t4", userId: "u1", date: "2025-03-13", from: "Home", to: "Office", vehicle: "ebike", distanceKm: 4.2, xpEarned: 96,  co2SavedKg: 0.76, durationMin: 14 },
  { id: "t5", userId: "u1", date: "2025-03-12", from: "Office", to: "Gym", vehicle: "walk",  distanceKm: 0.8, xpEarned: 32,  co2SavedKg: 0.16, durationMin: 10 },
  { id: "t6", userId: "u1", date: "2025-03-12", from: "Home", to: "Office", vehicle: "bike",  distanceKm: 4.2, xpEarned: 120, co2SavedKg: 0.84, durationMin: 18 },
  { id: "t7", userId: "u1", date: "2025-03-11", from: "Office", to: "Home", vehicle: "bus",   distanceKm: 5.3, xpEarned: 72,  co2SavedKg: 0.85, durationMin: 28 },
  { id: "t8", userId: "u1", date: "2025-03-10", from: "Home", to: "Office", vehicle: "bike",  distanceKm: 4.2, xpEarned: 120, co2SavedKg: 0.84, durationMin: 18 },
];

export const WEEKLY_DATA: WeeklyData[] = [
  { day: "Mon", xp: 162, co2: 1.68, trips: 2 },
  { day: "Tue", xp: 120, co2: 0.84, trips: 1 },
  { day: "Wed", xp: 218, co2: 2.14, trips: 3 },
  { day: "Thu", xp: 96,  co2: 1.06, trips: 2 },
  { day: "Fri", xp: 185, co2: 1.92, trips: 2 },
  { day: "Sat", xp: 42,  co2: 0.22, trips: 1 },
  { day: "Sun", xp: 0,   co2: 0,    trips: 0 },
];

export const PERKS: Perk[] = [
  { id: "p1", name: "Gift Card 10 ₼",     description: "Redeem a 10 ₼ gift card from our partner stores", iconName: "CreditCard",    category: "financial", requiredLevel: 5,  requiredXp: 1500,  value: "10 ₼" },
  { id: "p2", name: "Extra Holiday Day", description: "Add one paid vacation day to your annual leave",   iconName: "CalendarPlus",  category: "time-off",  requiredLevel: 8,  requiredXp: 3000,  value: "+1 day" },
  { id: "p3", name: "Gym Membership",    description: "3-month gym or wellness club membership",          iconName: "Dumbbell",      category: "wellness",  requiredLevel: 10, requiredXp: 4250,  value: "3 months" },
  { id: "p4", name: "Remote Days +2",    description: "Two extra remote work days per month",             iconName: "Laptop",        category: "remote",    requiredLevel: 12, requiredXp: 4950,  value: "+2/month" },
  { id: "p5", name: "Gift Card €50",     description: "Redeem a €50 gift card from our partner stores",  iconName: "Wallet",        category: "financial", requiredLevel: 14, requiredXp: 7350,  value: "€50" },
  { id: "p6", name: "2 Extra Holidays",  description: "Add two paid vacation days to your annual leave",  iconName: "Plane",         category: "time-off",  requiredLevel: 17, requiredXp: 9200,  value: "+2 days" },
  { id: "p7", name: "Wellness Credit",   description: "€100 wellness credit for any health activity",    iconName: "HeartPulse",    category: "wellness",  requiredLevel: 20, requiredXp: 12350, value: "€100" },
  { id: "p8", name: "Full Remote Week",  description: "One full remote work week per quarter",            iconName: "Globe",         category: "remote",    requiredLevel: 25, requiredXp: 20000, value: "1 week/qtr" },
];

export const LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, user: { id:"u2", name:"Leyla Hasanova",   initials:"LH", department:"Product",    level:12, xp:4820, xpToNextLevel:4950, tier:"green-commuter",  totalTrips:67, totalCo2Saved:102, totalDistanceKm:810, rank:1, streak:21, joinedAt:"2024-01-15" }, weeklyXp:480, monthlyXp:3240, allTimeXp:4820, weeklyTrips:8, trend:"up",   trendAmount:1 },
  { rank: 2, user: { id:"u3", name:"Sara Karimova",    initials:"SK", department:"Design",     level:10, xp:3950, xpToNextLevel:4250, tier:"green-commuter",  totalTrips:52, totalCo2Saved:84,  totalDistanceKm:640, rank:2, streak:14, joinedAt:"2024-02-20" }, weeklyXp:410, monthlyXp:2810, allTimeXp:3950, weeklyTrips:6, trend:"stable", trendAmount:0 },
  { rank: 3, user: { id:"u4", name:"Rauf Guliyev",     initials:"RG", department:"Engineering",level:9,  xp:3490, xpToNextLevel:3600, tier:"eco-rider",       totalTrips:43, totalCo2Saved:71,  totalDistanceKm:520, rank:3, streak:7,  joinedAt:"2024-03-05" }, weeklyXp:380, monthlyXp:2590, allTimeXp:3490, weeklyTrips:5, trend:"down", trendAmount:1 },
  { rank: 4, user: CURRENT_USER, weeklyXp:340, monthlyXp:2340, allTimeXp:2340, weeklyTrips:7, trend:"up", trendAmount:2 },
  { rank: 5, user: { id:"u5", name:"Nigar Jafarova",   initials:"NJ", department:"Marketing",  level:7,  xp:2180, xpToNextLevel:2450, tier:"eco-champion",    totalTrips:28, totalCo2Saved:40,  totalDistanceKm:280, rank:5, streak:5,  joinedAt:"2024-04-10" }, weeklyXp:290, monthlyXp:2180, allTimeXp:2180, weeklyTrips:4, trend:"stable", trendAmount:0 },
  { rank: 6, user: { id:"u6", name:"Emil Valiyev",     initials:"EV", department:"Sales",      level:6,  xp:1920, xpToNextLevel:1950, tier:"sapling",         totalTrips:19, totalCo2Saved:28,  totalDistanceKm:198, rank:6, streak:3,  joinedAt:"2024-05-22" }, weeklyXp:220, monthlyXp:1920, allTimeXp:1920, weeklyTrips:3, trend:"down", trendAmount:1 },
  { rank: 7, user: { id:"u7", name:"Zara Ahmadova",    initials:"ZA", department:"HR",         level:5,  xp:1450, xpToNextLevel:1500, tier:"sapling",         totalTrips:14, totalCo2Saved:18,  totalDistanceKm:130, rank:7, streak:12, joinedAt:"2024-06-01" }, weeklyXp:180, monthlyXp:1450, allTimeXp:1450, weeklyTrips:5, trend:"up",   trendAmount:3 },
  { rank: 8, user: { id:"u8", name:"Kamran Orujov",    initials:"KO", department:"Finance",    level:4,  xp:1120, xpToNextLevel:1100, tier:"sprout",          totalTrips:11, totalCo2Saved:14,  totalDistanceKm:98,  rank:8, streak:2,  joinedAt:"2024-07-15" }, weeklyXp:140, monthlyXp:1120, allTimeXp:1120, weeklyTrips:2, trend:"up",   trendAmount:1 },
  { rank: 9, user: { id:"u9", name:"Aynur Babayeva",   initials:"AB", department:"Operations", level:3,  xp:820,  xpToNextLevel:750,  tier:"sprout",          totalTrips:8,  totalCo2Saved:9,   totalDistanceKm:65,  rank:9, streak:1,  joinedAt:"2024-08-20" }, weeklyXp:100, monthlyXp:820,  allTimeXp:820,  weeklyTrips:2, trend:"down", trendAmount:2 },
  { rank: 10, user:{ id:"u10",name:"Murad Aliyev",     initials:"MA", department:"Legal",      level:2,  xp:420,  xpToNextLevel:450,  tier:"seedling",        totalTrips:4,  totalCo2Saved:4,   totalDistanceKm:30,  rank:10,streak:0,  joinedAt:"2024-10-01" }, weeklyXp:60,  monthlyXp:420,  allTimeXp:420,  weeklyTrips:1, trend:"stable", trendAmount:0 },
];

export const SDG_IMPACTS: SDGImpact[] = [
  { goal: 3,  title: "Good Health & Wellbeing",   description: "Active commutes reduce sedentary time and improve cardiovascular health",     progress: 68, color: "#4CAF50" },
  { goal: 11, title: "Sustainable Cities",        description: "Fewer cars on the road reduces congestion and urban air pollution",             progress: 74, color: "#FF9800" },
  { goal: 13, title: "Climate Action",            description: "Every eco-trip avoids carbon emissions that cause climate change",             progress: 82, color: "#2196F3" },
  { goal: 17, title: "Partnerships for Goals",    description: "Company-wide participation builds collective sustainability culture",           progress: 55, color: "#9C27B0" },
];

export const ADMIN_STATS = {
  totalEmployees: 148,
  activeThisMonth: 94,
  totalCo2ThisMonth: 1240,
  totalTripsThisMonth: 862,
  avgTripsPerEmployee: 5.8,
  topDepartment: "Engineering",
  co2TrendVsLastMonth: +18,
  participationRate: 63,
  departmentData: [
    { name: "Engineering", employees: 32, activeUsers: 26, co2Saved: 380, trips: 218 },
    { name: "Product",     employees: 18, activeUsers: 15, co2Saved: 210, trips: 142 },
    { name: "Design",      employees: 14, activeUsers: 11, co2Saved: 165, trips: 98  },
    { name: "Marketing",   employees: 22, activeUsers: 12, co2Saved: 142, trips: 87  },
    { name: "Sales",       employees: 28, activeUsers: 16, co2Saved: 193, trips: 134 },
    { name: "HR",          employees: 10, activeUsers: 7,  co2Saved: 89,  trips: 62  },
    { name: "Finance",     employees: 12, activeUsers: 5,  co2Saved: 61,  trips: 121 },
  ],
  monthlyTrend: [
    { month: "Oct", co2: 680,  trips: 420, participants: 52 },
    { month: "Nov", co2: 820,  trips: 540, participants: 61 },
    { month: "Dec", co2: 590,  trips: 380, participants: 44 },
    { month: "Jan", co2: 940,  trips: 620, participants: 71 },
    { month: "Feb", co2: 1050, trips: 730, participants: 82 },
    { month: "Mar", co2: 1240, trips: 862, participants: 94 },
  ],
};
