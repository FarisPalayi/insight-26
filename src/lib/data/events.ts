export type EventCategory = 'seminar' | 'competition' | 'cultural' | 'allday';

export type RegistrationStatus = 'open' | 'filling-fast' | 'closed' | 'coming-soon';

export type TeamSize = 'solo' | 'duo' | '2-4' | '3-5' | '4-6' | 'unlimited';

export interface EventPrizes {
  first?: string;
  second?: string;
  third?: string;
  special?: string;
}

export interface EventData {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: EventCategory;

  // Media
  image: string;
  thumbnail?: string;

  // Timing
  date: string; // Display date (e.g., "Feb 15, 2026")
  time: string; // Display time (e.g., "11:00 AM - 5:00 PM")
  duration?: string; // e.g., "6 hours"

  // Venue
  venue: string;
  venueShort: string;

  // Registration
  teamSize: TeamSize;
  teamSizeDisplay: string; // e.g., "2-4 Members"
  entryFee: string;
  registrationStatus: RegistrationStatus;
  registrationDeadline?: string;
  spotsLeft?: number;
  totalSpots?: number;

  // Prizes
  prizes?: EventPrizes;
  prizePool?: string; // Total prize pool display

  // Flags
  isFeatured?: boolean;
  isNew?: boolean;
  isPopular?: boolean;

  // Additional
  rules?: string[];
  requirements?: string[];
  coordinators?: { name: string; phone?: string }[];
}

export interface EventGroup {
  id: string;
  title: string;
  description?: string;
  events: EventData[];
}

// Category metadata with colors
export const eventCategories: { id: EventCategory; name: string; color: string }[] = [
  { id: 'competition', name: 'Competition', color: 'event-competition' },
  { id: 'seminar', name: 'Seminar', color: 'event-seminar' },
  { id: 'cultural', name: 'Cultural', color: 'event-cultural' },
  { id: 'allday', name: 'All Day', color: 'event-allday' },
];

// Team size display mapping
export const teamSizeLabels: Record<TeamSize, string> = {
  'solo': 'Solo',
  'duo': '2 Members',
  '2-4': '2-4 Members',
  '3-5': '3-5 Members',
  '4-6': '4-6 Members',
  'unlimited': 'Unlimited',
};

// Registration status display - using semantic token references
export const registrationStatusLabels: Record<RegistrationStatus, { label: string; color: string }> = {
  'open': { label: 'Open', color: 'bg-[hsl(var(--event-competition))]/20 text-[hsl(var(--event-competition))] border-[hsl(var(--event-competition))]/30' },
  'filling-fast': { label: 'Filling Fast', color: 'bg-[hsl(var(--event-allday))]/20 text-[hsl(var(--event-allday))] border-[hsl(var(--event-allday))]/30' },
  'closed': { label: 'Closed', color: 'bg-destructive/20 text-destructive border-destructive/30' },
  'coming-soon': { label: 'Coming Soon', color: 'bg-[hsl(var(--event-seminar))]/20 text-[hsl(var(--event-seminar))] border-[hsl(var(--event-seminar))]/30' },
};

// Mock Events Data
export const eventsData: EventData[] = [
  // Featured Event
  {
    id: 'technova-8',
    slug: 'technova-8',
    name: 'Technova 8.0',
    tagline: 'The ultimate tech showdown returns bigger than ever',
    description: 'Premier flagship technology competition showcasing innovative projects, cutting-edge solutions, and groundbreaking ideas. Teams compete across multiple rounds including ideation, prototype development, and final presentation.',
    category: 'competition',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    date: 'Feb 15-16, 2026',
    time: '11:00 AM - 5:00 PM',
    duration: '2 Days',
    venue: 'EMS Hall',
    venueShort: 'EMS',
    teamSize: '2-4',
    teamSizeDisplay: '2-4 Members',
    entryFee: '₹1,000',
    registrationStatus: 'filling-fast',
    registrationDeadline: 'Feb 10, 2026',
    spotsLeft: 12,
    totalSpots: 50,
    prizes: {
      first: '₹25,000',
      second: '₹15,000',
      third: '₹10,000',
    },
    prizePool: '₹50,000+',
    isFeatured: true,
    isPopular: true,
  },

  // Competitions
  {
    id: 'vibe-coding',
    slug: 'vibe-coding',
    name: 'Vibe Coding',
    tagline: 'Code to the rhythm, solve to the beat',
    description: 'A unique competitive coding experience where participants solve algorithmic challenges while immersed in an energetic atmosphere with music and collaborative vibes.',
    category: 'competition',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    date: 'Feb 16, 2026',
    time: '2:00 PM - 4:00 PM',
    duration: '2 hours',
    venue: 'CCSIT Lab',
    venueShort: 'CCSIT LAB',
    teamSize: 'duo',
    teamSizeDisplay: '2 Members',
    entryFee: '₹200',
    registrationStatus: 'open',
    spotsLeft: 35,
    totalSpots: 50,
    prizes: {
      first: '₹2,500',
      second: '₹1,000',
    },
    prizePool: '₹3,500',
    isNew: true,
  },
  {
    id: 'prompt-engineering',
    slug: 'prompt-engineering',
    name: 'Prompt Engineering',
    tagline: 'Master the art of AI communication',
    description: 'Test your skills in crafting effective prompts for AI models. Solve challenges using creative and precise prompt engineering techniques.',
    category: 'competition',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    date: 'Feb 16, 2026',
    time: '1:00 PM - 2:00 PM',
    duration: '1 hour',
    venue: 'CCSIT Lab',
    venueShort: 'CCSIT LAB',
    teamSize: 'solo',
    teamSizeDisplay: 'Solo',
    entryFee: '₹100',
    registrationStatus: 'open',
    spotsLeft: 40,
    totalSpots: 60,
    prizes: {
      first: '₹2,000',
      second: '₹1,000',
    },
    prizePool: '₹3,000',
    isNew: true,
    isPopular: true,
  },
  {
    id: 'treasure-hunt',
    slug: 'treasure-hunt',
    name: 'Treasure Hunt',
    tagline: 'Decode clues, discover treasures',
    description: 'An exciting campus-wide adventure where teams decode cryptic clues, solve puzzles, and race against time to find hidden treasures.',
    category: 'competition',
    image: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?w=800&q=80',
    date: 'Feb 16, 2026',
    time: '12:30 PM - 5:00 PM',
    duration: '4.5 hours',
    venue: 'Campus Wide',
    venueShort: 'TRAP',
    teamSize: '3-5',
    teamSizeDisplay: '3-5 Members',
    entryFee: '₹2,000',
    registrationStatus: 'filling-fast',
    spotsLeft: 8,
    totalSpots: 30,
    prizes: {
      first: '₹5,000',
      second: '₹2,000',
    },
    prizePool: '₹7,000',
    isPopular: true,
  },
  {
    id: 'debate',
    slug: 'debate',
    name: 'Debate Competition',
    tagline: 'Battle of words and ideas',
    description: 'A classic debate competition where participants argue compelling cases on contemporary topics. Showcase your rhetoric skills and critical thinking.',
    category: 'competition',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
    date: 'Feb 15, 2026',
    time: '1:30 PM - 3:00 PM',
    duration: '1.5 hours',
    venue: 'Student TRAP',
    venueShort: 'TRAP',
    teamSize: 'duo',
    teamSizeDisplay: '2 Members',
    entryFee: '₹500',
    registrationStatus: 'open',
    spotsLeft: 20,
    totalSpots: 32,
    prizes: {
      first: '₹1,000',
    },
    prizePool: '₹1,000',
  },
  {
    id: 'talenx',
    slug: 'talenx',
    name: "Talen'X",
    tagline: 'Unleash your hidden talents',
    description: 'A platform to showcase your unique talents - be it singing, dancing, stand-up comedy, magic, or any other performing art.',
    category: 'cultural',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    date: 'Feb 15, 2026',
    time: '11:00 AM - 5:00 PM',
    duration: '6 hours',
    venue: 'CCSIT/SC Block',
    venueShort: 'CCSIT',
    teamSize: 'solo',
    teamSizeDisplay: 'Solo / Group',
    entryFee: '₹1,000',
    registrationStatus: 'open',
    spotsLeft: 25,
    totalSpots: 40,
    prizes: {
      first: '₹2,500',
      second: '₹1,000',
    },
    prizePool: '₹3,500',
  },

  // Seminars
  {
    id: 'opening-seminar',
    slug: 'opening-seminar',
    name: 'Opening Keynote',
    tagline: 'Insights from industry leaders',
    description: 'Kick off the fest with an inspiring keynote session featuring renowned speakers sharing insights on the future of technology and innovation.',
    category: 'seminar',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    date: 'Feb 15, 2026',
    time: '9:30 AM - 11:00 AM',
    duration: '1.5 hours',
    venue: 'Aryabhatta Hall',
    venueShort: 'ARYABHATTA',
    teamSize: 'solo',
    teamSizeDisplay: 'Individual',
    entryFee: 'Free',
    registrationStatus: 'open',
    totalSpots: 200,
  },
  {
    id: 'tech-seminar',
    slug: 'tech-seminar',
    name: 'Tech Seminar',
    tagline: 'Future trends & industry insights',
    description: 'Deep dive into emerging technologies, industry trends, and career opportunities with expert speakers from leading tech companies.',
    category: 'seminar',
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80',
    date: 'Feb 16, 2026',
    time: '11:00 AM - 12:30 PM',
    duration: '1.5 hours',
    venue: 'EMS Hall',
    venueShort: 'EMS',
    teamSize: 'solo',
    teamSizeDisplay: 'Individual',
    entryFee: 'Free',
    registrationStatus: 'open',
    totalSpots: 150,
  },
  {
    id: 'paper-presentation',
    slug: 'paper-presentation',
    name: 'Paper Presentation',
    tagline: 'Present your research to the world',
    description: 'Present your research papers and innovative ideas to a panel of experts. Get valuable feedback and recognition for your work.',
    category: 'seminar',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80',
    date: 'Feb 15, 2026',
    time: '1:30 PM - 3:00 PM',
    duration: '1.5 hours',
    venue: 'Aryabhatta Hall',
    venueShort: 'ARYABHATTA',
    teamSize: 'duo',
    teamSizeDisplay: '1-2 Members',
    entryFee: '₹300',
    registrationStatus: 'open',
    spotsLeft: 18,
    totalSpots: 25,
    prizes: {
      first: '₹3,000',
    },
    prizePool: '₹3,000',
  },

  // Cultural
  {
    id: 'cultural-evening',
    slug: 'cultural-evening',
    name: 'Cultural Evening',
    tagline: 'A night of spectacular performances',
    description: 'An enchanting evening filled with dance performances, musical acts, drama, and entertainment that celebrates art and culture.',
    category: 'cultural',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    date: 'Feb 15, 2026',
    time: '7:00 PM - 10:00 PM',
    duration: '3 hours',
    venue: 'Main Stage',
    venueShort: 'MAIN STAGE',
    teamSize: 'unlimited',
    teamSizeDisplay: 'Open to All',
    entryFee: 'Free',
    registrationStatus: 'open',
  },
  {
    id: 'cultural-night',
    slug: 'cultural-night',
    name: 'Grand Cultural Night',
    tagline: 'The grand finale celebration',
    description: 'The ultimate closing celebration featuring star performances, prize distribution, and a night to remember.',
    category: 'cultural',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    date: 'Feb 16, 2026',
    time: '7:00 PM - 10:00 PM',
    duration: '3 hours',
    venue: 'Main Stage',
    venueShort: 'MAIN STAGE',
    teamSize: 'unlimited',
    teamSizeDisplay: 'Open to All',
    entryFee: 'Free',
    registrationStatus: 'open',
    isFeatured: true,
  },

  // All Day Events
  {
    id: 'photo-competition',
    slug: 'photo-competition',
    name: 'Photo Competition',
    tagline: 'Capture the moments that matter',
    description: 'Capture the best moments of the fest through your lens. Submit your photos online and compete for exciting prizes.',
    category: 'allday',
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80',
    date: 'Feb 15-16, 2026',
    time: 'All Day',
    venue: 'CU Campus',
    venueShort: 'CAMPUS',
    teamSize: 'solo',
    teamSizeDisplay: 'Solo',
    entryFee: 'Free',
    registrationStatus: 'open',
    prizes: {
      first: '₹1,000',
    },
    prizePool: '₹1,000',
  },
  {
    id: 'video-competition',
    slug: 'video-competition',
    name: 'Video Competition',
    tagline: 'Tell stories through moving frames',
    description: 'Create compelling video coverage of the fest. Showcase your videography and editing skills.',
    category: 'allday',
    image: 'https://images.unsplash.com/photo-1579566346927-c68383817a25?w=800&q=80',
    date: 'Feb 15-16, 2026',
    time: 'All Day',
    venue: 'CU Campus',
    venueShort: 'CAMPUS',
    teamSize: 'duo',
    teamSizeDisplay: '1-2 Members',
    entryFee: 'Free',
    registrationStatus: 'open',
    prizes: {
      first: '₹1,000',
    },
    prizePool: '₹1,000',
  },
  {
    id: 'spot-events',
    slug: 'spot-events',
    name: 'Spot Events',
    tagline: 'Surprise challenges await',
    description: 'Participate in spontaneous mini-events and challenges throughout the fest. No prior registration needed!',
    category: 'allday',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
    date: 'Feb 15-16, 2026',
    time: 'All Day',
    venue: 'Student TRAP',
    venueShort: 'TRAP',
    teamSize: 'solo',
    teamSizeDisplay: 'Varies',
    entryFee: 'Varies',
    registrationStatus: 'open',
  },
];

// Group events by category for display
export function getEventsByCategory(): EventGroup[] {
  const categoryOrder: EventCategory[] = ['competition', 'seminar', 'cultural', 'allday'];

  return categoryOrder.map(catId => {
    const category = eventCategories.find(c => c.id === catId)!;
    return {
      id: catId,
      title: category.name + 's',
      events: eventsData.filter(e => e.category === catId && !e.isFeatured),
    };
  }).filter(group => group.events.length > 0);
}

// Get featured events
export function getFeaturedEvents(): EventData[] {
  return eventsData.filter(e => e.isFeatured);
}

// Get all events (for search/filter)
export function getAllEvents(): EventData[] {
  return eventsData;
}
