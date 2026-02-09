export interface VenueData {
    id: string;
    name: string;
    shortName: string;
    directions: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    imageUrl?: string;
}

// CCSIT coordinates (fallback/default view)
export const CCSIT = {
    lat: 11.136227083791793,
    lng: 75.88840349398161
};

// All venue data
export const venueData: VenueData[] = [
    {
        id: 'aryabhatta',
        name: 'Aryabhatta Hall',
        shortName: 'ARYABHATTA',
        directions: 'Near Computer Science Block',
        coordinates: { lat: 11.134364112286272, lng: 75.88804732195877 },
        imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80'
    },
    {
        id: 'ems',
        name: 'EMS Seminar Hall',
        shortName: 'EMS',
        directions: 'Main Hall of EMS Seminar Complex',
        coordinates: { lat: 11.133823216033345, lng: 75.89311231298794 },
        imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80'
    },
    {
        id: 'ems-electron',
        name: 'EMS Hall - Electron',
        shortName: 'EMS ELECTRON',
        directions: 'Left Hall of EMS Seminar Complex',
        coordinates: { lat: 11.133823216033345, lng: 75.89311231298794 },
        imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80'
    },
    {
        id: 'ccsit',
        name: 'CCSIT CU Campus',
        shortName: 'CCSIT',
        directions: 'Near CH Library',
        coordinates: { lat: 11.136227083791793, lng: 75.88840349398161 },
        imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80'
    },
    {
        id: 'ccsit-lab',
        name: 'CCSIT Computer Lab',
        shortName: 'CCSIT LAB',
        directions: 'Near CH Library, 2nd Floor',
        coordinates: { lat: 11.136227083791793, lng: 75.88840349398161 },
        imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80'
    },
    {
        id: 'ccsit-seminar',
        name: 'CCSIT Seminar Hall',
        shortName: 'CCSIT SEMINAR',
        directions: 'Near CH Library, 3rd Floor',
        coordinates: { lat: 11.136227083791793, lng: 75.88840349398161 },
        imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80'
    },
    {
        id: 'trap',
        name: 'Student TRAP',
        shortName: 'STUDENT TRAP',
        directions: 'Near Calicut University Park',
        coordinates: { lat: 11.135936892643628, lng: 75.88942328970543 },
        imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80'
    },
    {
        id: 'main-stage',
        name: 'Silver Jubilee Auditorium',
        shortName: 'Calicut University Open Auditorium',
        directions: 'Near Student Trap',
        coordinates: { lat: 11.136752341056354, lng: 75.8891521773991 },
        imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80'
    },
    {
        id: 'campus',
        name: 'Campus Wide',
        shortName: 'CAMPUS',
        directions: 'Throughout the Campus',
        coordinates: { lat: 11.136227083791793, lng: 75.88840349398161 },
        imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80'
    },
]

// Type for venue IDs
export type VenueId = typeof venueData[number]['id'];

// Helper: Get venue by ID
export function getVenueById(id: string): VenueData | undefined {
    return venueData.find((v) => v.id === id);
}

// Helper: Get venues that have events
export function getActiveVenues(eventVenueIds: string[]): VenueData[] {
    const activeIds = new Set(eventVenueIds);
    return venueData.filter((v) => activeIds.has(v.id));
}

// Helper: Generate Google Maps view URL
export function getGoogleMapsViewUrl(venue: VenueData): string {
    const { lat, lng } = venue.coordinates;
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodeURIComponent(venue.name)}`;
}

// Helper: Generate Google Maps directions URL
export function getGoogleMapsDirectionsUrl(venue: VenueData): string {
    const { lat, lng } = venue.coordinates;
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodeURIComponent(venue.name)}`;
}