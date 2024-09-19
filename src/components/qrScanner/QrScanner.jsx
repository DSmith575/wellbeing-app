import { useState, useCallback } from 'react';
import { Text, View, TouchableOpacity, Alert, SafeAreaView, ActivityIndicator, Vibration } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useFocusEffect } from '@react-navigation/native';
import { firestore } from '../../config/firebase';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useUserAuth } from '../../context/firebase/FirestoreAuthContext';

const QrScanner = () => {
  const { user } = useUserAuth();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanningEnabled, setScanningEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

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
    if (!scanningEnabled || loading) return;
    try {
      setLoading(true);
      Vibration.vibrate();
      setScanningEnabled(false);
      console.log('Scanned data:', data.data);
      const collectionRef = doc(firestore, 'events', data.data);
      const docSnap = await getDoc(collectionRef);
      if (!docSnap.exists()) {
        Alert.alert('Error', 'QR Code is invalid');
        return;
      }

      const docData = docSnap.data();
      console.log(docData);

      if (!docData || !docData.eventName) {
        Alert.alert('Error', 'Event name is not available');
        return;
      }

      Alert.alert(docData.eventName, `${docData.signedUp.length} out of ${docData.groupLimit} spots filled`, [
        {
          text: 'Join',
          onPress: async () => {
            // Add logic for joining the event
            console.log('User joined the event');
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
            console.log('User cancelled');
            setScanningEnabled(true);
          },
          style: 'cancel', // This makes it look like a cancel button (iOS only)
        },
      ]);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 p-4 items-center">
      <Text className="mt-4 text-lg font-bold">Scan QR Code</Text>
      <View className="w-full h-3/5">
        {loading ? (
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
