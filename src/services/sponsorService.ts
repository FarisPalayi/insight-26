import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase_config";
import { type SponsorTier } from "@/types";

/**
 * Fetches all sponsor tiers from Firebase
 * Collection structure:
 * - sponsors/{tierId}
 *   - name: string
 *   - order: number (for sorting)
 *   - icon: string (icon name from lucide-react)
 *   - description: string
 *   - accentColor: string (tailwind gradient classes)
 *   - sponsors: array of { name, website, logo }
 *     - logo is a Cloudinary URL
 */
export const fetchSponsorTiers = async (): Promise<SponsorTier[]> => {
  try {
    const sponsorsQuery = query(
      collection(db, "sponsors"),
      orderBy("order", "asc")
    );
    
    const snapshot = await getDocs(sponsorsQuery);
    
    const tiers: SponsorTier[] = [];
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      tiers.push({
        id: doc.id,
        name: data.name,
        icon: data.icon, // This will be a string, you'll need to map it to the actual icon component
        description: data.description,
        accentColor: data.accentColor,
        sponsors: data.sponsors || [],
        order: data.order
      });
    });
    
    return tiers;
  } catch (error) {
    console.error("Error fetching sponsor tiers:", error);
    return [];
  }
};

/**
 * Check if there are any sponsors in the database
 */
export const hasSponsors = async (): Promise<boolean> => {
  try {
    const snapshot = await getDocs(collection(db, "sponsors"));
    return !snapshot.empty;
  } catch (error) {
    console.error("Error checking sponsors:", error);
    return false;
  }
};