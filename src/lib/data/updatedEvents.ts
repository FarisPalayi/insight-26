import { type UnifiedEvent } from "./unifiedEvents";

export const unifiedEvents: UnifiedEvent[] = [
    {
        // Core Identity
        id: "technova",
        name: "Technova 8.0",
        fancyName: "Technova 8.0",
        tagline: "Build. Break. Innovate.",
        description:
            "Technova 8.0 is the flagship competitive event of Insight 26, designed to identify the ultimate tech champion. The event consists of five intense rounds — Initium, Techsense, Intersepto, Extremist, and Jackpot — testing participants’ logical thinking, technical expertise, problem-solving ability, and teamwork under pressure.",

        category: "competition",

        // Schedule
        schedule: {
            day: "2",
            startTime: "11:30",
            endTime: "16:00",
            displayTime: "11:30 AM - 04:00 PM",
        },

        // Location
        venue: "ems-electron",

        // Participation
        teamSize: "2-5",
        entryFee: "500",
        spotRegistration: false,

        // Visual
        imageUrl:
            "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=1200&q=80",

        // Flags
        isFeatured: true,
        isAllDay: false,
        isMultiPeriod: true,

        // Prizes
        prizePool: "33000",
        prizes: {
            jackpotPrize: "25000",
            first: "5000",
            second: "2000",
            third: "1000",
        },

        // Contact
        coordinators: [
            { name: "Faris P", phone: "9072402532" },
            { name: "Anjana", phone: "8606386771" },
        ],

        // Registration
        registrationLink: "https://tiqr.events/e/Technova-8.0-1792",
        registrationDeadline: "2026-02-17",

        // Other infos
        rulesAndGuidelines: [
            "Technova consists of five rounds: Initium, Techsense, Intersepto, Extremist, and Jackpot.",
            "Each round will contain multiple tasks with varying levels of difficulty.",
            "Only team participation is permitted. Each team may consist of two to five members.",
            "Participating teams must report to the venue at least 30 minutes prior to the scheduled start time.",
            "Each team must bring at least one laptop.",
            "Each team will be assigned one or more volunteers by the Technova core team.",
            "An elimination stage will take place during the competition.",
            "If registrations exceed the set limit, a preliminary round may be conducted.",
            "Internet access will be provided in varying capacities based on participant requirements.",
            "Participants must have basic knowledge of at least one programming language such as C, C++, Python, Java, PHP, or others.",
            "Participants may request a limited number of clues from their assigned volunteers.",
            "The use of any browser extensions is strictly prohibited.",
            "Any malpractice detected during the event will result in immediate disqualification.",
            "The jackpot prize of 25000 will be awarded to the team that successfully completes all levels first.",
            "A minimum of four teams is required for the event to be conducted. If this condition is not met, the event may be cancelled.",
            "Registration fees are non-refundable if a team fails to attend after registering.",
            "All final decisions will be made by the Technova core team and will be binding.",
        ],

        eligibility: [
            "Open to participants with basic programming knowledge.",
            "Team participation only (2–5 members per team).",
            "Participants must carry a valid student ID card.",
        ],

        whatToBring: [
            "At least one laptop per team.",
            "Earbuds (optional).",
            "Valid student ID card.",
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
            day: "1",
            startTime: "11:00",
            endTime: "13:00",
            displayTime: "11:00 AM - 01:00 PM",
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
        registrationLink: "https://tiqr.events/e/PAPER-PRESENTATION-(Papyrus)-1805",
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
        id: "inauguration",
        name: "Program Inauguration",
        fancyName: "Insight'26 Kickoff",
        tagline: "The official beginning",
        description:
            "Opening ceremony of INSIGHT 2026 with welcome address and inaugural speech by chief guests.",
        category: "inauguration",
        schedule: {
            day: '2',
            startTime: "09:00",
            endTime: "10:00",
            displayTime: "09:00 AM - 10:00 AM",
        },
        venue: "ems",
        teamSize: "any",
        entryFee: "Free",
        registrationLink: "/register",
        imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
        isFeatured: false,
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
        registrationLink: "https://tiqr.events/e/Treasure-hunt-(The-Cipher-Quest)-1804",
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
        registrationLink: "https://tiqr.events/e/ArgueX-(DEBATE)-1802",
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
        registrationLink: "https://tiqr.events/e/Vibe-Coding(Build-It-Right)-1812",
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
            startTime: "10:00",
            endTime: "11:00",
            displayTime: "10:00 AM - 11:00 AM",
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
        registrationLink: "https://tiqr.events/e/PROMPT-ENGINEERING-(Python-Snippet-Challenge)-1801",
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
        registrationLink: "https://tiqr.events/e/TalenX-3.0-1803",
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
        id: "spot-events",
        name: "Spot Games",
        fancyName: "Boom Bash",
        tagline: "Win in a blink.",
        description:
            "Boom Bash is a collection of fun and high-energy spot events conducted on the festival grounds. Participants engage in surprise tasks designed to spark excitement, laughter, and spontaneous competition. No prior preparation is required—just confidence, enthusiasm, and a willingness to jump in.",

        category: "cultural",

        // Schedule
        schedule: {
            day: "both",
            startTime: "09:00",
            endTime: "17:00",
            displayTime: "Full Day (Day 1 & Day 2)",
        },

        // Location
        venue: "trap",

        // Participation
        teamSize: "any",
        entryFee: "varies",
        spotRegistration: true,

        // Visual
        imageUrl:
            "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=1200&q=80",

        // Flags
        isFeatured: false,
        isAllDay: true,
        isMultiPeriod: true,

        // Prizes
        prizePool: "Varies",
        prizes: {
            first: "Varies",
        },

        // Contact
        coordinators: [
            { name: "Nizam", phone: "7306833994" },
        ],

        // Registration
        registrationLink: "",
        registrationDeadline: "2026-02-17",

        // Other infos
        rulesAndGuidelines: [
            "Participation is open on the spot. No prior registration is required.",
            "Team size depends on the specific game announced at the venue.",
            "Instructions for each game will be explained at the spot before it begins.",
            "Participants must follow the instructions of the event coordinators.",
            "Any form of misconduct or unfair practice will lead to disqualification.",
            "Prizes vary depending on the specific game.",
        ],

        eligibility: [
            "Open to all festival participants.",
            "Participants must carry a valid student ID card.",
        ],

        whatToBring: [
            "Valid student ID card.",
            "Enthusiasm and readiness to participate.",
        ],
    },

    {
        // Core Identity
        id: "video-making-reel",
        name: "Video Making",
        fancyName: "Reel It Up!",
        tagline: "Capture the vibe. Tell the story.",
        description:
            "Reel It Up! is a creative video-making contest where participants capture the energy and highlights of Insight 26 through short-form reels. Showcase your storytelling skills, editing creativity, and ability to bring moments to life on screen.",

        category: "competition",

        // Schedule
        schedule: {
            day: "2",
            startTime: "09:30",
            endTime: "20:00",
            displayTime: "09:30 AM - 08:00 PM",
        },

        // Location
        venue: "campus",

        // Participation
        teamSize: "solo",
        entryFee: "50",
        spotRegistration: true,

        // Visual
        imageUrl:
            "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1200&q=80",

        // Flags
        isFeatured: true,
        isAllDay: true,
        isMultiPeriod: false,

        // Prizes
        prizePool: "",
        prizes: {
            first: "",
            second: "",
            third: "",
        },

        // Contact
        coordinators: [],

        // Registration
        registrationLink: "https://tiqr.events/e/Videography-1807",
        registrationDeadline: "2026-02-17",

        // Other infos
        rulesAndGuidelines: [
            "The reel must be based on moments captured during Insight 26.",
            "The content should reflect the spirit of innovation, technology, and fest energy.",
            "The video must be original and created by the participant.",
            "Basic editing is allowed; however, the core footage must be self-recorded.",
            "Any offensive, inappropriate, or copyrighted content will lead to disqualification.",
            "Submission format and platform details will be announced at the venue.",
        ],

        eligibility: [
            "Open to all registered participants of the Tech Fest.",
            "Individual participation only.",
            "Participants must carry a valid student ID card.",
        ],

        whatToBring: [
            "Smartphone or camera for recording.",
            "Valid student ID card.",
        ],
    },

    {
        // Core Identity
        id: "photography-freeze",
        name: "Photography",
        fancyName: "Freeze Frame",
        tagline: "Y'all Got the Shot.",
        description:
            "Freeze Frame is a photography contest inviting participants to capture the most compelling moments of Insight 26. Through creative framing and storytelling, contestants showcase the spirit of innovation, technology, and digital culture across the campus.",

        category: "competition",

        // Schedule
        schedule: {
            day: "2",
            startTime: "09:30",
            endTime: "20:00",
            displayTime: "09:30 AM - 08:00 PM",
        },

        // Location
        venue: "campus",

        // Participation
        teamSize: "solo",
        entryFee: "50",
        spotRegistration: true,

        // Visual
        imageUrl:
            "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1200&q=80",

        // Flags
        isFeatured: true,
        isAllDay: true,
        isMultiPeriod: false,

        // Prizes
        prizePool: "",
        prizes: {
            first: "",
            second: "",
            third: "",
        },

        // Contact
        coordinators: [],

        // Registration
        registrationLink: "https://tiqr.events/e/Photography-(Freeze-Frame)-1806",
        registrationDeadline: "2026-02-17",

        // Other infos
        rulesAndGuidelines: [
            "Photos must align with the Tech Fest theme such as Innovation, Technology, Future, Digital Life, AI, Coding, or Robotics.",
            "Each participant may submit up to two photographs.",
            "Photographs must be original and captured by the participant.",
            "Accepted file formats are JPEG or PNG.",
            "Minimum resolution required is 1080 × 1080 pixels.",
            "Basic editing such as color correction and cropping is allowed.",
            "Heavy manipulation, AI-generated images, or composite images are strictly prohibited.",
            "No offensive, vulgar, political, or copyrighted content is permitted.",
            "Images must not contain watermarks, logos, or decorative borders.",
        ],

        eligibility: [
            "Open to all registered participants of the Tech Fest.",
            "Individual participation only.",
            "Participants must carry a valid student ID card.",
        ],

        whatToBring: [
            "Camera or smartphone.",
            "Valid student ID card.",
        ],
    },

    {
        // Core Identity
        id: "stage-program",
        name: "Stage Program",
        fancyName: "Sakalakala",
        tagline: "Unleash the Art Within You!",
        description:
            "Sakalakala is a grand stage program celebrating diverse talents and artistic creativity. The event offers performers a platform to showcase their skills, passion, and expressive abilities before a live audience. With an incentive prize worth 5000, the evening promises vibrant performances and unforgettable entertainment.",

        category: "cultural",

        // Schedule
        schedule: {
            day: "2",
            startTime: "17:30",
            endTime: "21:00",
            displayTime: "05:30 PM - 09:00 PM",
        },

        // Location
        venue: "trap",

        // Participation
        teamSize: "5",
        entryFee: "Free",
        spotRegistration: false,

        // Visual
        imageUrl:
            "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1200&q=80",

        // Flags
        isFeatured: true,
        isAllDay: false,
        isMultiPeriod: false,

        // Prizes
        prizePool: "5000",
        prizes: {
            first: "5000",
        },

        // Contact
        coordinators: [
            { name: "Shafreena", phone: "7306238073" },
        ],

        // Registration
        registrationLink: "https://tiqr.events/e/Sakalakala(Stage-Program)-1809",
        registrationDeadline: "2026-02-17",

        // Other infos
        rulesAndGuidelines: [
            "Each team is allotted a maximum of 10 minutes on stage.",
            "Out of the total time, 6 minutes are allocated for performance and 4 minutes for setup.",
            "Participants must report to the venue at least 5 minutes before their allotted time.",
            "Performances must adhere to festival decorum and content guidelines.",
            "The decision of the judges and organizing committee will be final and binding.",
        ],

        eligibility: [
            "Open to all students.",
            "Team participation allowed with a maximum of five members.",
            "Participants must carry a valid student ID card.",
        ],

        whatToBring: [
            "All required performance materials or props.",
            "Valid student ID card.",
        ],
    },
    {
        // Core Identity
        id: "cultural-night",
        name: "Cultural Night",
        fancyName: "Cultural Night",
        tagline: "Lights. Music. Energy.",
        description:
            "Cultural Night marks the grand closing celebration of Insight 26. The evening features electrifying performances, music, stage acts, and a vibrant atmosphere that brings the entire fest together for an unforgettable finale.",

        category: "cultural",

        // Schedule
        schedule: {
            day: "2",
            startTime: "21:00",
            endTime: "23:00",
            displayTime: "09:00 PM - 11:00 PM",
        },

        // Location
        venue: "trap",

        // Participation
        teamSize: "any",
        entryFee: "Free",
        spotRegistration: true,

        // Visual
        imageUrl:
            "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&q=80",

        // Flags
        isFeatured: true,
        isAllDay: false,
        isMultiPeriod: false,

        // Prizes
        prizePool: "",
        prizes: {
            first: "",
            second: "",
            third: "",
        },

        // Contact
        coordinators: [],

        // Registration
        registrationLink: "/register",
        registrationDeadline: "2026-02-17",

        // Other infos
        rulesAndGuidelines: [
            "Open to all registered participants of the fest.",
            "Participants are expected to maintain decorum during performances.",
            "The organizing committee reserves the right to manage crowd control and entry if required.",
        ],

        eligibility: [
            "Open to all fest attendees.",
        ],

        whatToBring: [
            "Valid student ID card.",
            "Entry pass (if applicable).",
        ],
    }
];