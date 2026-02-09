// src/data/venueData.ts
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

// Campus center coordinates (fallback/default view)
export const CAMPUS_CENTER = {
    lat: 11.1271,
    lng: 75.8357,
};

// All venue data
export const venueData: VenueData[] = [
    {
        id: 'aryabhatta',
        name: 'Aryabhatta Hall',
        shortName: 'ARYABHATTA',
        directions: 'Near Main Entrance, Ground Floor',
        coordinates: { lat: 11.0203, lng: 75.9364 },
        imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80'
    },
    {
        id: 'ems',
        name: 'EMS Hall',
        shortName: 'EMS',
        directions: 'Near Main Building, 2nd Floor',
        coordinates: { lat: 11.0205, lng: 75.9366 },
        imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80'
    },
    {
        id: 'ems-electron',
        name: 'EMS Hall - Electron',
        shortName: 'EMS ELECTRON',
        directions: 'Near Main Building, 2nd Floor',
        coordinates: { lat: 11.0207, lng: 75.9368 },
        imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80'
    },
    {
        id: 'ccsit',
        name: 'CCSIT CU Campus',
        shortName: 'CCSIT',
        directions: 'Near Main Building, 2nd Floor',
        coordinates: { lat: 11.0209, lng: 75.9370 },
        imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80'
    },
    {
        id: 'ccsit-lab',
        name: 'CCSIT Computer Lab',
        shortName: 'CCSIT LAB',
        directions: 'Near Main Building, 2nd Floor',
        coordinates: { lat: 11.0211, lng: 75.9372 },
        imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80'
    },
    {
        id: 'ccsit-seminar',
        name: 'CCSIT Seminar Hall',
        shortName: 'CCSIT SEMINAR',
        directions: 'Near Main Building, 2nd Floor',
        coordinates: { lat: 11.0213, lng: 75.9374 },
        imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80'
    },
    {
        id: 'trap',
        name: 'Student TRAP',
        shortName: 'STUDENT TRAP',
        directions: 'Near Main Building, 2nd Floor',
        coordinates: { lat: 11.0215, lng: 75.9376 },
        imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80'
    },
    {
        id: 'main-stage',
        name: 'Silver Jubilee Auditorium',
        shortName: 'MAIN STAGE',
        directions: 'Near Main Entrance, Ground Floor',
        coordinates: { lat: 11.0217, lng: 75.9378 },
        imageUrl: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&q=80'
    },
    {
        id: 'campus',
        name: 'Campus Wide',
        shortName: 'CAMPUS',
        directions: 'Throughout the Campus',
        coordinates: { lat: 11.0219, lng: 75.9380 },
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