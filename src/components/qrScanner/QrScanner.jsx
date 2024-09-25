import { useState, useCallback } from 'react';
import { Text, View, TouchableOpacity, Alert, SafeAreaView, ActivityIndicator, Vibration } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useFocusEffect } from '@react-navigation/native';
import { firestore } from '../../config/firebase';
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useUserAuth } from '../../context/firebase/FirestoreAuthContext';
import useLoading from '../../hooks/loading/useLoading';

const QrScanner = () => {
  const { user } = useUserAuth();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanningEnabled, setScanningEnabled] = useState(false);
  const { loading, setLoading } = useLoading();

  useFocusEffect(
    useCallback(() => {
      setScanningEnabled(true);
      console.log('Camera Enabled');

      return () => {
        setScanningEnabled(false);
        console.log('Camera Disabled');
      };
    }, []),
  );

  if (permission === null) {
    return <Text>Loading...</Text>;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center p-4">
        <View className="gap-5">
          <Text className="text-xl text-gray-700">Camera access is required to scan.</Text>
          <TouchableOpacity onPress={requestPermission} className="bg-blue-500 p-3 rounded">
            <Text className="text-white text-lg text-center">Allow Camera Access</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const onBarcodeScanned = async (data) => {
    if (!scanningEnabled || loading('scanning')) return;
    try {
      setLoading('scanning', true);
      Vibration.vibrate();
      setScanningEnabled(false);
      const collectionRef = doc(firestore, 'events', data.data);
      const docSnap = await getDoc(collectionRef);

      if (!docSnap.exists()) {
        Alert.alert('Error', 'QR Code is invalid');
        return;
      }

      const docData = docSnap.data();

      if (!docData || !docData.eventName) {
        Alert.alert('Error', 'Event name is not available');
        return;
      }

      if (docData.signedUp.includes(user)) {
        Alert.alert('Error', 'You have already signed up for this event', [
          {
            text: 'OK',
            onPress: () => {
              setScanningEnabled(true);
            },
          },
          {
            text: 'Leave Event',
            onPress: async () => {
              await updateDoc(collectionRef, {
                signedUp: arrayRemove(user),
              });
              setScanningEnabled(true);
            },
            style: 'cancel',
          },
        ]);
        return;
      }

      if (docData.signedUp.length >= docData.groupLimit) {
        Alert.alert('Error', 'Event is full', [
          {
            text: 'OK',
            onPress: () => {
              setScanningEnabled(true);
            },
          },
        ]);
        return;
      }

      //  show alert if groupLimit is undefined aka "unlimited"
      if (docData.groupLimit === undefined) {
        Alert.alert(docData.eventName, 'This event has unlimited spots', [
          {
            text: 'Join',
            onPress: async () => {
              // Add logic for joining the event
              const eventRef = doc(firestore, 'events', data.data);

              await updateDoc(eventRef, {
                signedUp: arrayUnion(user),
              });

              setScanningEnabled(true);
            },
          },
          {
            text: 'Cancel',
            onPress: () => {
              setScanningEnabled(true);
            },
            style: 'cancel',
          },
        ]);
        return;
      }
      Alert.alert(docData.eventName, `${docData.signedUp.length} out of ${docData.groupLimit} spots filled`, [
        {
          text: 'Join',
          onPress: async () => {
            // Add logic for joining the event
            const eventRef = doc(firestore, 'events', data.data);

            await updateDoc(eventRef, {
              signedUp: arrayUnion(user),
            });

            setScanningEnabled(true);
          },
        },
        {
          text: 'Cancel',
          onPress: () => {
            setScanningEnabled(true);
          },
          style: 'cancel',
        },
      ]);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading('scanning', false);
    }
  };

  return (
    <SafeAreaView className="flex-1 p-4 items-center">
      <Text className="mt-4 text-lg font-bold">Scan QR Code</Text>
      <View className="w-full h-3/5">
        {loading('scanning') ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <CameraView
            className="flex-1"
            facing={'back'}
            onBarcodeScanned={onBarcodeScanned}
            barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default QrScanner;
