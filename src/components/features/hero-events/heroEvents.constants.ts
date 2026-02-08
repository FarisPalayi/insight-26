import { type UnifiedEvent } from "@/lib/data/unifiedEvents";

export const MOCK_TECHNOVA: UnifiedEvent = {
  id: "technova",
  name: "Technova 8.0",
  fancyName: "Technova 8.0",
  tagline: "Build. Break. Innovate.",
  description:
    "A full-day hackathon where teams design and build innovative tech solutions. Judged on creativity, usefulness, and execution.",
  category: "competition",
  schedule: {
    day: '2',
    startTime: "11:00",
    endTime: "17:00",
    displayTime: "11:00 AM - 05:00 PM",
  },
  venue: "EMS Hall",
  teamSize: "2-5",
  entryFee: "200",
  prizePool: "25,000",
  prizes: {
    first: "15,000",
    second: "7,000",
    third: "3,000",
  },
  imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80',
  isFeatured: true,
  whatToBring: ["Laptop", "Chargers", "Extension board", "Ideas"],
};


export const FEATURED_EVENTS_MOCK: UnifiedEvent[] = [
  MOCK_TECHNOVA, // Included here so the filter in EventsSection handles it

  {
    id: "seminar-2",
    name: "Tech Seminar",
    fancyName: "InnovateX",
    tagline: "Innovation & Startups Unplugged",
    description:
      "An interactive session discussing innovation, startups, and emerging technology ecosystems.",
    category: "seminar",
    schedule: {
      day: '1',
      startTime: "14:00",
      endTime: "15:00",
      displayTime: "02:00 PM - 03:00 PM",
    },
    venue: "Aryabhatta Hall",
    teamSize: "solo",
    entryFee: "Free",
    imageUrl: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80',

  },

  {
    id: "treasure-hunt",
    name: "Treasure Hunt",
    fancyName: "Treasure Quest",
    tagline: "Solve. Search. Win.",
    description:
      "Teams solve clues and explore the campus to find hidden checkpoints. Speed and accuracy matter.",
    category: "competition",
    schedule: {
      day: '2',
      startTime: "11:00",
      endTime: "16:00",
      displayTime: "11:00 AM - 04:00 PM",
    },
    venue: "Student TRAP",
    teamSize: "any",
    entryFee: "100",
    prizePool: "5,000",
    imageUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2000&auto=format&fit=crop',
  },
  {
    id: "talenx",
    name: "Talen'X",
    fancyName: "Talen'X",
    tagline: "Unleash your talent",
    description:
      "An open talent showcase featuring performances, creativity, and artistic expression.",
    category: "cultural",
    schedule: {
      day: '2',
      startTime: "11:00",
      endTime: "17:00",
      displayTime: "11:00 AM - 05:00 PM",
    },
    venue: "CCSIT Seminar Hall",
    teamSize: "any",
    entryFee: "Free",
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
  },
];
