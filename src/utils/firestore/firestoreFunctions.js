import { collection, query, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../config/firebase';

export const getEvents = async ({ collectionName, callback }) => {
  try {
    const eventRef = collection(firestore, collectionName);
    const eventQuery = query(eventRef);

    return onSnapshot(eventQuery, callback);
  } catch (error) {
    console.error('Error getting events', error);
  }
};
