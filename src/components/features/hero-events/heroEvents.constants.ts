import { type HeroEvent, type HeroFlagshipEvent } from "@/lib/data/unifiedEvents";

export const MOCK_TECHNOVA: HeroFlagshipEvent = {
  id: "technova",
  name: "Technova 8.0",
  fancyName: "Technova 8.0",
  description:
    "Technova is a progressive challenge platform designed to test your logic, code, and creativity through increasingly demanding levels. Every stage must be earned.",
  category: "competition",
  schedule: {
    day: "2",
    startTime: "11:30",
    endTime: "16:00",
    displayTime: "11:30 AM - 04:00 PM",
  },
  venue: "ems-electron",
  teamSize: "2-5",
  entryFee: "500",
}


export const FEATURED_EVENTS_MOCK: HeroEvent[] = [
  MOCK_TECHNOVA, // Included here so the filter in EventsSection handles it

  {
    // Core Identity
    id: "vibe-coding",
    name: "Vibe Coding",
    fancyName: "Build It Right!",
    description:
      "Build It Right is an AI-powered website creation challenge where ideas take shape through intuition, creativity, and strategic use of AI tools. Participants are tasked with designing and building a visually compelling front-end website that aligns with a given theme, demonstrating both technical execution and creative vision.",
    category: "competition",

    // Schedule
    schedule: {
      day: "2",
      startTime: "13:30",
      endTime: "15:30",
      displayTime: "01:30 PM - 03:30 PM",
    },

    entryFee: "200",
  },

  {
    // Core Identity
    id: "talenx",
    name: "TalenX 3.0",
    fancyName: "TalenX 3.0",
    description:
      "TalenX 3.0 is a high-energy, non-technical competitive fun event designed to test participants’ talent, logic, creativity, presence of mind, and teamwork. This event proves that success does not require gadgets or screens, only real skills, sharp thinking, and team coordination.",
    category: "competition",

    // Schedule
    schedule: {
      day: "2",
      startTime: "11:30",
      endTime: "16:00",
      displayTime: "11:30 AM - 04:00 PM",
    },

    // Participation
    entryFee: "400",
  },

  {
    // Core Identity
    id: "treasure-hunt",
    name: "Treasure Hunt",
    fancyName: "The Cipher Quest",
    description:
      "The Cipher Quest is an exciting multi-level treasure hunt designed to test teamwork, problem-solving ability, and strategic thinking. Teams must decode clues, complete challenges, and progress through multiple levels to reach the final objective and claim victory.",

    category: "competition",

    // Schedule
    schedule: {
      day: "2",
      startTime: "11:30",
      endTime: "16:30",
      displayTime: "11:30 AM - 04:30 PM",
    },

    // Participation
    entryFee: "400",
  },
];
