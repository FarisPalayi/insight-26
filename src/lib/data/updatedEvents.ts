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
        venue: "ems-electron",
        teamSize: "2-5",
        entryFee: "200",
        prizePool: "25,000",
        prizes: {
            first: "15,000",
            second: "7,000",
            third: "3,000",
        },
        registrationLink: "/register",
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
        venue: "aryabhatta",
        teamSize: "solo",
        entryFee: "Free",
        registrationLink: "/register",
        imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952',
        isFeatured: true,
        coordinators: [
            { name: "Dr. Anil Kumar", phone: "9876543210" },
        ],
    },

    {
        // Core Identity
        id: "paper-presentation",
        name: "Paper Presentation",
        fancyName: "Papyrus",
        tagline: "Where ideas speak louder than words.",
        description:
            "Papyrus provides a platform for young minds to present innovative ideas, research findings, and technical insights. Participants can showcase their knowledge, communication skills, and creativity before an expert panel.",
        category: "competition",

        // Schedule
        schedule: {
            day: "2",
            startTime: "14:00",
            endTime: "15:00",
            displayTime: "02:00 PM - 03:00 PM",
        },

        // Location
        venue: "aryabhatta",

        // Participation
        teamSize: "solo",
        entryFee: "100",
        spotRegistration: true,

        // Visual
        imageUrl:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",

        // Flags
        isFeatured: false,
        isAllDay: false,
        isMultiPeriod: false,

        // Prizes
        prizePool: "6000",
        prizes: {
            first: "3000",
            second: "2000",
            third: "1000",
        },

        // Contact
        coordinators: [
            { name: "Parvathi", phone: "7559829575" },
            { name: "Anjana", phone: "8606386771" },
        ],

        // Registration
        registrationLink: "",
        registrationDeadline: "2026-02-17",

        // Other infos
        rulesAndGuidelines: [
            "Participants may choose any recent technical topic in the field of Computer Science or Information Technology.",
            "The paper or abstract must be submitted in PDF format and strictly follow the IEEE format.",
            "Selected participants must bring one hard copy of the paper for the judges and their presentation slides on a flash drive.",
            "Each participant will be allotted 15 minutes for the presentation followed by 5 minutes for a Q&A with the judges.",
            "A projector and laptop will be provided at the venue.",
            "The decision of the judges will be final and binding.",
        ],

        eligibility: [
            "Open to undergraduate (UG) and postgraduate (PG) students.",
        ],

        whatToBring: [
            "Soft copy of the presentation (PPT) on a flash drive.",
            "One hard copy of the paper.",
            "Valid student ID card.",
        ],
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
        venue: "aryabhatta",
        teamSize: "solo",
        entryFee: "Free",
        registrationLink: "/register",
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
        venue: "trap",
        teamSize: "any",
        entryFee: "Free",
        registrationLink: "/register",
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
        venue: "ems",
        teamSize: "any",
        entryFee: "Free",
        registrationLink: "/register",
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
        venue: "trap",
        teamSize: "any",
        entryFee: "100",
        registrationLink: "/register",
        prizePool: "5,000",
        imageUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2000&auto=format&fit=crop',
    },

    {
        id: "debate",
        name: "Debate",
        fancyName: "ArgueX",
        tagline: "Speak. Defend. Dominate.",
        description: "Competitive debating platform that challenges participants to think critically, \
                     argue logically, and speak persuasively. \
                     The event promotes healthy discussion on contemporary and thought-provoking topics.",
        category: "competition",
        schedule: {
            day: "2",
            startTime: "15:00",
            endTime: "16:00",
            displayTime: "03:00 PM - 04:00 PM",
        },

        // Location
        venue: "trap",

        // Participation
        teamSize: "solo",
        entryFee: "100",
        spotRegistration: true,

        // Visual
        imageUrl:
            "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1200&q=80",

        // Flags
        isFeatured: false,
        isAllDay: false,
        isMultiPeriod: false,

        // Prizes
        prizePool: "5,000",
        prizes: {
            first: "2,000",
            second: "",
            third: "",
        },

        // Contact
        coordinators: [
            { name: "Parvathi", phone: "7559829575" },
            { name: "Anjana", phone: "8606386771" },
        ],

        // Registration
        registrationLink: "",
        registrationDeadline: "2026-02-17",

        // Other infos
        rulesAndGuidelines: [
            "Debate topics will be announced on the spot.",
            "Each participant will be given 3-4 minutes to present their arguments.",
            "Use of offensive or inappropriate language is strictly prohibited.",
            "The decision of the judges will be final and binding.",
            "Participants must strictly adhere to the allotted time limit.",
        ],

        eligibility: [
            "Open to undergraduate (UG) and postgraduate (PG) students from all departments.",
            "Participants must carry a valid student ID card.",
        ],

        whatToBring: [
            "Valid student ID card.",
            "Basic stationery for noting key points (optional).",
        ],
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
        venue: "ccsit-lab",
        teamSize: "solo",
        entryFee: "100",
        registrationLink: "/register",
        prizePool: "4,000",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475",
        spotRegistration: true,
    },
    {
        // Core Identity
        id: "prompt-engineering",
        name: "Prompt Engineering",
        fancyName: "Python Snippet Prompt Challenge",
        tagline: "Say it once. Mean it exactly.",
        description:
            "In this precision-based challenge, participants are given a Python code snippet and must craft a single prompt that makes ChatGPT generate the exact same code. Even the smallest difference in characters results in failure, testing participants' prompt design skills, attention to detail, and understanding of structured output generation.",
        category: "competition",

        // Schedule
        schedule: {
            day: "2",
            startTime: "15:00",
            endTime: "16:00",
            displayTime: "03:00 PM - 04:00 PM",
        },

        // Location
        venue: "ccsit-lab",

        // Participation
        teamSize: "solo",
        entryFee: "100",
        spotRegistration: true,

        // Visual
        imageUrl:
            "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&q=80",

        // Flags
        isFeatured: false,
        isAllDay: false,
        isMultiPeriod: false,

        // Prizes
        prizePool: "",
        prizes: {
            first: "",
            second: "",
        },

        // Contact
        coordinators: [
            { name: "Hrishinandan P", phone: "8547620138" },
            { name: "Akhila", phone: "9061251299" },
            { name: "Navaneeth", phone: "9995499150" },
        ],

        // Registration
        registrationLink: "",
        registrationDeadline: "2026-02-17",

        // Other infos
        rulesAndGuidelines: [
            "Individual participation only.",
            "Participants will be provided with a Python code snippet.",
            "The objective is to write a single prompt that makes ChatGPT generate the exact same code snippet.",
            "Total time limit is 10 minutes, including understanding the problem, writing the prompt, and generating the output.",
            "Only one prompt submission is allowed. Regenerating, editing, continuing, or submitting another prompt will result in immediate disqualification.",
            "The generated output must exactly match the provided code character-for-character, including indentation and quotation marks.",
            "If no participant achieves an exact match, evaluation will be based on the highest number of correctly matched lines in the correct order with no extra lines.",
            "Evaluation is based strictly on textual matching of the output. Program logic, behavior, or correctness will not be considered.",
            "Logical equivalence, partial matches, or alternative implementations are not accepted.",
            "The output must contain only Python code. Any additional text such as explanations, headings, markdown formatting, or extra symbols will result in disqualification.",
            "Participants are evaluated only on the final output; the method used to construct the prompt is not considered.",
            "Any violation of the rules will result in immediate disqualification.",
            "The final decision of the organizing committee will be binding.",
        ],

        eligibility: [
            "Open to all participants except students of Calicut University.",
        ],

        whatToBring: [
            "Notebook and pen (optional).",
            "Valid ID card.",
        ],
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
        venue: "ccsit-seminar",
        teamSize: "any",
        entryFee: "Free",
        registrationLink: "/register",
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
        venue: "main-stage",
        teamSize: "any",
        entryFee: "Free",
        registrationLink: "/register",
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
        venue: "trap",
        teamSize: "any",
        entryFee: "Varies",
        registrationLink: "/register",
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
        venue: "trap",
        teamSize: "solo",
        entryFee: "50",
        registrationLink: "/register",
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
        venue: "trap",
        teamSize: "any",
        entryFee: "Varies",
        registrationLink: "/register",
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