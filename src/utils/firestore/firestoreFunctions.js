import { collection, query, onSnapshot, doc, getDoc, updateDoc, arrayUnion, getDocs, where, setDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { alertMessages, eventCategories, userRoles, firestoreCollections } from "../constants/constants";

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
      throw new Error(alertMessages.qrInvalid);
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

    // Update event signedUp array with user
    await updateDoc(collectionRef, {
      signedUp: arrayUnion(user),
    });

    const x = eventCategories.map((category) => {
      console.log(category.eventName);
    });

    // Get event Category name for badge increment
    // const eventRef = await getDoc(collectionRef);
    // const event = eventRef.data();
    // const badgeCounterEventName = event.eventCategory;

    // const userRef = doc(firestore, firestoreCollections.users, user);

    // await updateDoc(userRef, {
    //   badges: arrayUnion(badgeCounterEventName),
    // })
  } catch (error) {
    throw new Error("Error joining event", error);
  }
};

export const queryUserJoinedEvents = async (collectionName, user) => {
  try {
    if (!user) {
      return [];
    }
    const collectionRef = collection(firestore, collectionName);
    const queryRef = query(collectionRef, where("signedUp", "array-contains", user));
    const querySnapshot = await getDocs(queryRef);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error(error);
  }
};

export const registerNewUser = async (firstName, lastName, email, password) => {
  try {
    const signUserUp = await createUserWithEmailAndPassword(auth, email, password);

    const newUserId = signUserUp.user.uid;

    await createUserInformation({
      newUserId: newUserId,
      newUserFirstName: firstName,
      newUserLastName: lastName,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createUserInformation = async ({ newUserId, newUserFirstName, newUserLastName }) => {
  try {
    const newUser = doc(firestore, firestoreCollections.users, newUserId);

    const newUserData = {
      badges: [],
      firstName: newUserFirstName,
      lastName: newUserLastName,
      role: userRoles.user,
      userId: newUserId,
    };

    await setDoc(newUser, newUserData);
  } catch (error) {
    throw new Error("Error creating user", error);
  }
};
