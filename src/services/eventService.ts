import { db } from "@/lib/firebase_config";
import { unifiedEvents } from "@/lib/data/updatedEvents";
import { collection, getDocs, doc, getDoc, } from 'firebase/firestore';
import type { Update } from "@/types";

const USE_FIREBASE = false;

export const fetchEventById = async (id: string) => {
  if (!USE_FIREBASE) {
    return unifiedEvents.find(e => e.id === id) || null;
  }

  try {
    const docRef = doc(db, "events", id); // Direct document reference by ID
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
};


export const fetchAllEvents = async () => {
  console.log('fetchAllEvents called');
  console.log('USE_FIREBASE:', USE_FIREBASE);
  if (!USE_FIREBASE) {
    console.log('Using static data');
    return unifiedEvents;
  }

  console.log('Using Firebase');

  try {
    const eventsCollectionRef = collection(db, "events");
    const querySnapshot = await getDocs(eventsCollectionRef);
    console.log('Number of docs:', querySnapshot.docs.length);

    const events = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log('Mapped events:', events);
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};
export const fetchUpdates = async (): Promise<Update[]> => {
  try {
    const updatesRef = collection(db, "updates");
    const snapshot = await getDocs(updatesRef);

    return snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Update, "id">),
      }))
      .filter((update) => update.isPublished)
      .sort(
        (a, b) =>
          (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0)
      );
  } catch (error) {
    console.error("Error fetching updates:", error);
    throw error;
  }
};