import { unifiedEvents } from "@/lib/data/unifiedEvents";

const USE_FIREBASE = false;

export const fetchEventById = async (id: string) => {
  if (!USE_FIREBASE) {
    // Current Static Logic
    return unifiedEvents.find(e => e.id === id) || null;
  }

  // Future Firebase Logic
  // const docRef = doc(db, "events", id);
  // const docSnap = await getDoc(docRef);
  // return docSnap.exists() ? docSnap.data() : null;
};
