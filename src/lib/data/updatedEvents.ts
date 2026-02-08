import { type UnifiedEvent } from "./unifiedEvents";

export const unifiedEvents: UnifiedEvent[] = [
        {
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
        isMultiPeriod: true,
        whatToBring: ["Laptop", "Chargers", "Extension board", "Ideas"],
    },
    {
        id: "seminar-1",
        name: "Expert Talk: Future of AI",
        fancyName: "AI Unveiled",
        tagline: "Where intelligence meets imagination",
        description:
            "A keynote seminar exploring modern AI, industry trends, and research opportunities. Ideal for students interested in machine learning, automation, and future technologies.",
        category: "seminar",
        schedule: {
            day: '1',
            startTime: "10:00",
            endTime: "11:00",
            displayTime: "10:00 AM - 11:00 AM",
        },
        venue: "Aryabhatta Hall",
        teamSize: "solo",
        entryFee: "Free",
        imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952',
        isFeatured: true,
        coordinators: [
            { name: "Dr. Anil Kumar", phone: "9876543210" },
        ],
    },

    {
        id: "paper-presentation",
        name: "Paper Presentation",
        fancyName: "TechTalks",
        tagline: "Present. Impress. Inspire.",
        description:
            "Participants present technical papers on innovative topics. Judges evaluate based on originality, clarity, and technical depth.",
        category: "competition",
        schedule: {
            day: '1',
            startTime: "11:00",
            endTime: "13:00",
            displayTime: "11:00 AM - 01:00 PM",
        },
        venue: "Aryabhatta Hall",
        teamSize: "solo",
        entryFee: "100",
        prizePool: "6,000",
        prizes: {
            first: "3,000",
            second: "2,000",
            third: "1,000",
        },
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
        coordinators: [
            { name: "Rahul S", phone: "9876501234" },
            { name: "Megha R", phone: "9895012345" },
        ],
        rulesAndGuidelines: [
            "Max 10 slides",
            "Presentation time: 8 minutes",
            "Bring PPT in pen drive",
        ],
        whatToBring: ["Laptop", "Presentation file"],
    },

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
        id: "movie-night",
        name: "Movie Night",
        fancyName: "CineTech",
        tagline: "Relax. Refresh. Reboot.",
        description:
            "A fun movie screening for all participants. Chill, socialize, and unwind after a day of technical sessions.",
        category: "cultural",
        schedule: {
            day: '1',
            startTime: "19:30",
            endTime: "22:00",
            displayTime: "07:30 PM - 10:00 PM",
        },
        venue: "Student TRAP",
        teamSize: "any",
        entryFee: "Free",
        imageUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2000&auto=format&fit=crop',
    },

    {
        id: "inauguration",
        name: "Program Inauguration",
        fancyName: "Insight'26 Kickoff",
        tagline: "The official beginning",
        description:
            "Opening ceremony of INSIGHT 2026 with welcome address and inaugural speech by chief guests.",
        category: "inauguration",
        schedule: {
            day: '2',
            startTime: "09:30",
            endTime: "10:30",
            displayTime: "09:30 AM - 10:30 AM",
        },
        venue: "EMS Hall",
        teamSize: "any",
        entryFee: "Free",
        imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
        isFeatured: true,
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
        id: "debate",
        name: "Tech Debate",
        fancyName: "Debate Arena",
        tagline: "Speak. Argue. Dominate.",
        description:
            "Participants debate on trending technology and societal issues. Judged on clarity, argument strength, and confidence.",
        category: "competition",
        schedule: {
            day: '2',
            startTime: "13:30",
            endTime: "15:00",
            displayTime: "01:30 PM - 03:00 PM",
        },
        venue: "Student TRAP",
        teamSize: "solo",
        entryFee: "50",
        prizePool: "2,000",
        imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
    },

    {
        id: "vibe-coding",
        name: "Vibe Coding",
        fancyName: "Vibe Coding",
        tagline: "Code with rhythm",
        description:
            "A fast-paced coding challenge focused on logic, speed, and clean problem-solving skills.",
        category: "competition",
        schedule: {
            day: '2',
            startTime: "13:45",
            endTime: "14:45",
            displayTime: "01:45 PM - 02:45 PM",
        },
        venue: "CCSIT Lab",
        teamSize: "solo",
        entryFee: "100",
        prizePool: "4,000",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    },

    {
        id: "prompt-engineering",
        fancyName: "AskRight",
        name: "Prompt Engineering",
        tagline: "Talk to AI like a pro",
        description:
            "Participants compete to craft the most effective prompts to solve creative and technical challenges using AI tools.",
        category: "competition",
        schedule: {
            day: '2',
            startTime: "15:00",
            endTime: "17:00",
            displayTime: "03:00 PM - 05:00 PM",
        },
        venue: "CCSIT Lab",
        teamSize: "solo",
        entryFee: "100",
        prizePool: "3,000",
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
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
        isMultiPeriod: true,
    },

    {
        id: "cultural-night",
        name: "Cultural Night",
        fancyName: "Cultural Night",
        tagline: "Lights. Music. Energy.",
        description:
            "Grand closing cultural night with music, performances, and celebration.",
        category: "cultural",
        schedule: {
            day: '2',
            startTime: "22:00",
            endTime: "23:59",
            displayTime: "10:00 PM",
        },
        venue: "Main Stage",
        teamSize: "any",
        entryFee: "Free",
        imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80',
        isFeatured: true,
    },
    {
        id: "spot-events",
        name: "Spot Events",
        fancyName: "Spot Events",
        tagline: "Spontaneous fun. Instant competition.",
        description:
            "A series of surprise mini-events conducted throughout the day. Participants can join on the spot and compete in quick, fun challenges.",
        category: "competition",
        schedule: {
            day: '2',
            startTime: "10:00",
            endTime: "17:00",
            displayTime: "10:00 AM - 05:00 PM",
        },
        venue: "Student TRAP",
        teamSize: "any",
        entryFee: "Varies",
        spotRegistration: true,
        imageUrl:
            "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b",
        isAllDay: true,
        prizePool: "Surprise prizes",
        rulesAndGuidelines: [
            "Register on the spot before each mini-event",
            "Follow instructions given by coordinators",
            "Each event will have different rules",
        ],
        coordinators: [
            { name: "Akshay P", phone: "9895123456" },
            { name: "Nimisha K", phone: "9847012345" },
        ],
    },

    {
        id: "video-photo-competition",
        name: "Video & Photo Competition",
        fancyName: "CaptureX",
        tagline: "Capture the moment. Tell the story.",
        description:
            "Participants capture creative photos and short videos based on given themes. Judged on creativity, composition, and storytelling.",
        category: "competition",
        schedule: {
            day: '2',
            startTime: "10:00",
            endTime: "17:00",
            displayTime: "10:00 AM - 05:00 PM",
        },
        venue: "Student TRAP",
        teamSize: "solo",
        entryFee: "50",
        imageUrl:
            "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
        isAllDay: true,
        prizePool: "3,000",
        prizes: {
            first: "1,500",
            second: "1,000",
            third: "500",
        },
        rulesAndGuidelines: [
            "Photos and videos must be original",
            "Editing is allowed but no AI-generated media",
            "Submit before deadline",
        ],
        whatToBring: ["Camera or smartphone", "Creativity"],
        coordinators: [
            { name: "Fahad M", phone: "9895987654" },
        ],
    },

    {
        id: "spot-competitions",
        name: "Spot Competitions",
        fancyName: "Spot Competitions",
        tagline: "Quick battles. Instant glory.",
        description:
            "Short, fast-paced competitions conducted in the afternoon. Includes quizzes, mini-games, and rapid challenges.",
        category: "competition",
        schedule: {
            day: '2',
            startTime: "15:00",
            endTime: "17:00",
            displayTime: "03:00 PM - 05:00 PM",
        },
        venue: "Student TRAP",
        teamSize: "any",
        entryFee: "Varies",
        spotRegistration: true,
        imageUrl:
            "https://images.unsplash.com/photo-1511632765486-a01980e01a18",
        rulesAndGuidelines: [
            "Register before each competition begins",
            "Decisions by judges are final",
            "Maintain fair play",
        ],
        coordinators: [
            { name: "Akhil Raj", phone: "9876549876" },
        ],
    },
];