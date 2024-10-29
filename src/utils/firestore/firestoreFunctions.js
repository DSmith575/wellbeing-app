import { collection, query, onSnapshot, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { firestore } from "../../config/firebase";

export const getEvents = async ({ collectionName, callback }) => {
  try {
    const eventRef = collection(firestore, collectionName);
    const eventQuery = query(eventRef);
    return onSnapshot(eventQuery, callback);
  } catch (error) {
    console.error("Error getting events", error);
  }
};

export const getFirebaseDocument = async (collectionName, docData) => {
  try {
    const collectionRef = doc(firestore, collectionName, docData);
    const eventSnapshot = await getDoc(collectionRef);

    if (eventSnapshot.exists()) {
      return eventSnapshot.data();
    } else {
      throw new Error("QR Code is invalid");
    }
  } catch (error) {
    throw new Error("Error getting event", error);
  }
};

export const joinEvent = async (collectionName, docData, user) => {
  try {
    const collectionRef = doc(firestore, collectionName, docData);

    await updateDoc(collectionRef, {
      signedUp: arrayUnion(user),
    });
  } catch (error) {
    throw new Error("Error joining event", error);
  }
};
