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
        // Core Identity
        id: "vibe-coding",
        name: "Vibe Coding",
        fancyName: "Build It Right!",
        tagline: "What you create stays.",
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

        // Location
        venue: "ccsit-lab",

        // Participation
        teamSize: "solo",
        entryFee: "200",
        spotRegistration: true,

        // Visual
        imageUrl:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",

        // Flags
        isFeatured: true,
        isAllDay: false,
        isMultiPeriod: false,

        // Prizes
        prizePool: "3000",
        prizes: {
            first: "2000",
            second: "1000",
        },

        // Contact
        coordinators: [
            { name: "Navaneeth P", phone: "9495267950" },
        ],

        // Registration
        registrationLink: "",
        registrationDeadline: "2026-02-17",

        // Other infos
        rulesAndGuidelines: [
            "This is a solo competition.",
            "The theme will be revealed at the start of the competition. All designs and content must strictly align with the announced theme.",
            "Participants must design and build a front-end website using ChatGPT as the provided AI tool.",
            "ChatGPT is the only AI tool permitted during the competition. Use of any other AI tools will result in disqualification.",
            "Any front-end technologies such as HTML, CSS, JavaScript, or frameworks are permitted.",
            "Internet access will be provided by the organizers.",
            "Internet usage is strictly limited to website development, ChatGPT usage, and downloading images or assets required for the website.",
            "Any other form of internet usage will result in immediate disqualification.",
            "Judging will be based on theme interpretation, creativity and visual design, user experience, and overall presentation.",
            "The decision of the judges will be final and binding.",
        ],

        eligibility: [
            "Open to all Undergraduate (UG) and Postgraduate (PG) students.",
            "Participants must carry a valid student ID card.",
        ],

        whatToBring: [
            "Valid student ID card.",
            "Basic stationery for rough planning (optional).",
        ],
    },

  {
    // Core Identity
    id: "talenx",
    name: "TalenX 3.0",
    fancyName: "TalenX 3.0",
    tagline: "Compete. Conquer. Cash In.",
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

    // Location
    venue: "ccsit-seminar",

    // Participation
    teamSize: "4",
    entryFee: "400",
    spotRegistration: false,

    // Visual
    imageUrl:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=80",

    // Flags
    isFeatured: true,
    isAllDay: false,
    isMultiPeriod: true,

    // Prizes
    prizePool: "16000",
    prizes: {
      first: "4000",
      second: "2000",
      jackpotPrize: "10000",
    },

    // Contact
    coordinators: [
      { name: "Abhishek Krishna", phone: "7306151832" },
      { name: "Namitha", phone: "9746538285" },
    ],

    // Registration
    registrationLink: "",
    registrationDeadline: "2026-02-17",

    // Other infos
    rulesAndGuidelines: [
      "A team consisting of up to four members is eligible to participate.",
      "The registration fee per team is 400.",
      "TalenX 3.0 consists of five levels involving logical, physical, and challenging games.",
      "Participating teams must report to the venue at least 30 minutes prior to the scheduled start time.",
      "No technical knowledge is required; however, participants must demonstrate concentration, presence of mind, and a competitive spirit.",
      "Details of each game will be explained at the venue.",
      "Each round will be revealed only after completion of the previous round.",
      "The jackpot prize of 10,000 will be awarded only if the final task is successfully completed within the time limit.",
      "The organizing committee reserves the right to make final decisions regarding the event.",
      "A minimum of four teams is required for the event to be conducted. If this condition is not met, the event may be cancelled.",
      "Registration fees are non-refundable if a team fails to attend after registering.",
      "Mobile phones or any electronic devices are strictly prohibited during the event.",
    ],

    eligibility: [
      "There are no special eligibility restrictions.",
      "Open to all participants.",
    ],

    whatToBring: [
      "Nothing. All required materials will be provided at the venue.",
      "Participants are advised to arrive on time and be prepared for physical and logical challenges.",
    ],
  },

  {
    // Core Identity
    id: "treasure-hunt",
    name: "Treasure Hunt",
    fancyName: "The Cipher Quest",
    tagline: "Decode to Dominate.",
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

    // Location
    venue: "trap",

    // Participation
    teamSize: "4",
    entryFee: "400",
    spotRegistration: true,

    // Visual
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80",

    // Flags
    isFeatured: true,
    isAllDay: false,
    isMultiPeriod: true,

    // Prizes
    prizePool: "10000",
    prizes: {
      jackpotPrize: "10000",
    },

    // Contact
    coordinators: [
      { name: "Rahul", phone: "+917909226491" },
      { name: "Alog", phone: "9072076311" },
    ],

    // Registration
    registrationLink: "",
    registrationDeadline: "2026-02-17",

    // Other infos
    rulesAndGuidelines: [
      "The registration fee per team is 400.",
      "Each team may consist of up to four members.",
      "Any number of teams from the same college may participate.",
      "Any form of unethical practice or violation of rules will lead to immediate disqualification.",
      "If multiple teams from the same college participate, priority will be given to the team that reports the first clue to the organizers.",
      "Teams that complete tasks first will progress to the next level.",
      "The judgment of the organizers will be final and binding.",
      "A minimum of four teams is required for the event to be conducted. If this condition is not met, the event may be cancelled.",
      "Registration fees are non-refundable if a team fails to attend after registering.",
      "The jackpot prize will be awarded only to the team that successfully completes all levels.",
    ],

    eligibility: [
      "Open only to students from other colleges.",
      "Participants must carry a valid student ID card.",
    ],

    whatToBring: [
      "Valid student ID card.",
      "Comfortable clothing and footwear suitable for movement across locations.",
    ],
  },

];
