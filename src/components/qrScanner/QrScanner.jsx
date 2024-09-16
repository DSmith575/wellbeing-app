import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView, Pressable, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

const QrScanner = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanningEnabled, setScanningEnabled] = useState(false);

  if (!permission) {
    return <Text>Test</Text>;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView>
        <View className={'gap-5'}>
          <Pressable onPress={requestPermission}>
            <Text>Request Permissions</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const onBarcodeScanned = async (data) => {
    if (!scanningEnabled) return;
    try {
      console.log(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  return (
    <CameraView
      style={{ flex: 1 }}
      facing={'back'}
      onBarcodeScanned={onBarcodeScanned}
      barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
    />
  );
};

export default QrScanner;
