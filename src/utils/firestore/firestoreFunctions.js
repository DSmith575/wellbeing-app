import { collection, query, onSnapshot, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { firestore } from "../../config/firebase";

/**
 * Retrieves events from a Firestore collection and listens for real-time updates.
 * @param {Object} options - The options for retrieving events.
 * @param {string} options.collectionName - The name of the Firestore collection.
 * @param {Function} options.callback - The callback function to be called when there are updates to the events.
 * @returns {function} - The unsubscribe function to stop listening for updates.
 * @throws {Error} - If there is an error retrieving the events.
 */

export const getEvents = async ({ collectionName, callback }) => {
  try {
    const eventRef = collection(firestore, collectionName);
    const eventQuery = query(eventRef);
    return onSnapshot(eventQuery, callback);
  } catch (error) {
    console.error("Error getting events", error);
  }
};

/**
 * Retrieves a document from a Firestore collection.
 * @param {string} collectionName - The name of the Firestore collection.
 * @param {string} docData - The ID of the document to retrieve.
 * @returns {Object} - The data of the retrieved document.
 * @throws {Error} - If the document does not exist or there is an error retrieving the document.
 */

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

/**
 * Joins a user to an event in a Firestore collection.
 * @param {string} collectionName - The name of the Firestore collection.
 * @param {string} docData - The ID of the document representing the event.
 * @param {string} user - The user to join the event.
 * @throws {Error} - If there is an error joining the event.
 */

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
