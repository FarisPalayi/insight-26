import { db } from "@/firebase/config";
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

const USE_FIREBASE = true;

export const fetchEventById = async (id: string) => {
  if (!USE_FIREBASE) {
    // return unifiedEvents.find(e => e.id === id) || null;
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
    // return unifiedEvents;
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
