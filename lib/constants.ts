export const PILLAR_KEYS = ["world", "hotels", "individual", "support"] as const;

export const INTEREST_KEYS = [
  "history",
  "beach",
  "food",
  "culture",
  "shopping",
  "nature",
  "adventure",
  "wellness",
] as const;

export const BUDGET_KEYS = ["economy", "comfort", "luxury"] as const;
export const PACE_KEYS = ["relaxed", "balanced", "intense"] as const;

export const SERVICE_KEYS = [
  "tours",
  "flights",
  "hotels",
  "visa",
  "custom",
  "mice",
] as const;

export const STAT_KEYS = ["years", "clients", "destinations"] as const;
export const TESTIMONIAL_KEYS = ["1", "2", "3"] as const;

// One-click planner presets. Language-neutral config; the destination text and
// label come from messages (planner.presets.<key>).
export type PlannerPreset = {
  key: string;
  interests: string[];
  budget: string;
  duration: number;
  travelers: number;
  pace: string;
};

export const PLANNER_PRESETS: PlannerPreset[] = [
  { key: "weekendSamarkand", interests: ["history", "food"], budget: "comfort", duration: 3, travelers: 2, pace: "balanced" },
  { key: "maldivesHoneymoon", interests: ["beach", "wellness"], budget: "luxury", duration: 7, travelers: 2, pace: "relaxed" },
  { key: "silkRoad7", interests: ["history", "culture"], budget: "comfort", duration: 7, travelers: 2, pace: "balanced" },
  { key: "dubaiFamily", interests: ["shopping", "adventure"], budget: "comfort", duration: 5, travelers: 4, pace: "balanced" },
];

export type DestinationType = "silkRoad" | "luxury";
// priceFrom: indicative per-person starting price. TODO: replace with real prices.
export const DESTINATIONS: {
  key: string;
  type: DestinationType;
  img: string;
  priceFrom: string;
}[] = [
  { key: "samarkand", type: "silkRoad", img: "/destinations/samarkand.jpg", priceFrom: "$290" },
  { key: "bukhara", type: "silkRoad", img: "/destinations/bukhara.jpg", priceFrom: "$260" },
  { key: "khiva", type: "silkRoad", img: "/destinations/khiva.jpg", priceFrom: "$250" },
  { key: "maldives", type: "luxury", img: "/destinations/maldives.jpg", priceFrom: "$1900" },
  { key: "dubai", type: "luxury", img: "/destinations/dubai.jpg", priceFrom: "$690" },
  { key: "turkey", type: "luxury", img: "/destinations/turkey.jpg", priceFrom: "$590" },
];
