import { useState, useCallback } from 'react';
import { Text, View, TouchableOpacity, Alert, SafeAreaView, ActivityIndicator, Vibration } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useFocusEffect } from '@react-navigation/native';

const QrScanner = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanningEnabled, setScanningEnabled] = useState(false);

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
    if (!scanningEnabled) return;
    try {
      Vibration.vibrate();
      setScanningEnabled(false);
      console.log('Scanned data:', data);
      Alert.alert('Success', data.data, [{ text: 'Ok', onPress: () => setScanningEnabled(true) }]);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 p-4 items-center">
      <Text className="mt-4 text-lg font-bold">Scan QR Code</Text>
      <View className="w-full h-3/5">
        <CameraView
          className="flex-1"
          facing={'back'}
          onBarcodeScanned={onBarcodeScanned}
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        />
      </View>
    </SafeAreaView>
  );
};

export default QrScanner;
