import { type UnifiedEvent } from "@/lib/data/unifiedEvents";

export const MOCK_TECHNOVA: UnifiedEvent = {
  id: "technova",
  name: "Technova",
  fancyName: "Technova",
  tagline: "8.0",
  description: "Five rounds. Five challenges. One ultimate geek team. Navigate through Initium, Techsense, Intersepto, Extremist, and Jackpot to prove your technical supremacy.",
  category: "competition",
  schedule: {
    day: 1,
    startTime: "09:00",
    endTime: "17:00",
    displayTime: "09:00 AM - 05:00 PM"
  },
  venue: "Main Stage",
  teamSize: "3-5",
  entryFee: "₹300",
  imageUrl: "/images/technova.jpg",
  isFeatured: true,
  prizePool: "40K+",
  prizes: {
    first: "₹20,000",
    second: "₹10,000",
    third: "₹5,000",
    jackpotPrize: "Surprise Gift"
  },
  rulesAndGuidelines: [
    "Malpractice leads to disqualification",
    "Bring your own hardware if required"
  ]
};


export const FEATURED_EVENTS_MOCK: UnifiedEvent[] = [
  MOCK_TECHNOVA, // Included here so the filter in EventsSection handles it
  {
    id: "shoot-sync",
    name: "Shoot Sync",
    tagline: "Visual Magic",
    description: "Capture the moment, freeze the magic in every frame. Showcase your creative eye and visual storytelling in this high-octane photography challenge.",
    category: "competition",
    schedule: {
      day: 2,
      startTime: "10:00",
      endTime: "14:00",
      displayTime: "10:00 AM - 02:00 PM"
    },
    venue: "Campus Grounds",
    teamSize: "solo",
    entryFee: "₹100",
    imageUrl: "/images/photo.jpg",
    spotRegistration: true,
    eligibility: ["Open to all students with a DSLR or Smartphone"]
  },
  {
    id: "scavenge-squad",
    name: "Scavenge Squad",
    tagline: "Hunt for Clues",
    description: "Race against time, hunt for clues, claim victory. Team up for the ultimate treasure hunt experience across the hidden corners of the campus.",
    category: "allday",
    schedule: {
      day: "both",
      startTime: "09:00",
      endTime: "18:00",
      displayTime: "Full Day Event"
    },
    venue: "Entire Campus",
    teamSize: "2-4",
    entryFee: "₹150",
    imageUrl: "/images/hunt.jpg",
    prizePool: "10K"
  },
  {
    id: "talenx",
    name: "Talen'X",
    tagline: "Unleash the Star",
    description: "Unleash your hidden talents and steal the spotlight. Dance, sing, perform—let your creativity shine in our premier open-stage showcase.",
    category: "cultural",
    schedule: {
      day: 2,
      startTime: "17:00",
      endTime: "21:00",
      displayTime: "05:00 PM Onwards"
    },
    venue: "Open Air Theatre",
    teamSize: "any",
    entryFee: "Free",
    imageUrl: "/images/talenx.jpg",
    isFeatured: false
  }
];
