import { useState, useCallback } from "react";
import { Text, View, TouchableOpacity, SafeAreaView, ActivityIndicator, Vibration } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useFocusEffect } from "@react-navigation/native";
import { useUserAuth } from "../../context/firebase/FirestoreAuthContext";
import { firestoreCollections } from "../../utils/constants/constants";
import { getFirebaseDocument, joinEvent } from "../../utils/firestore/firestoreFunctions";
import { convertDateTimeToLocale, checkEventStartTime } from "../../utils/dateTime/dateTimeFunctions";
import { alertMessages } from "../../utils/constants/constants";
import Spinner from "../spinner/Spinner";
import useLoading from "../../hooks/loading/useLoading";
import QrScannerAlert from "../alert/Alert";

const QrScanner = () => {
  const { user } = useUserAuth();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanningEnabled, setScanningEnabled] = useState(false);
  const { loading, setLoading } = useLoading();

  useFocusEffect(
    useCallback(() => {
      setScanningEnabled(true);
      console.log("Camera Enabled");

      return () => {
        setScanningEnabled(false);
        console.log("Camera Disabled");
      };
    }, []),
  );

  if (permission === null) {
    return <Spinner />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center p-4">
        <View className="gap-5">
          <Text className="text-xl text-gray-700">{alertMessages.cameraAccess}</Text>
          <TouchableOpacity onPress={requestPermission} className="bg-blue-500 p-3 rounded">
            <Text className="text-white text-lg text-center">{alertMessages.allowCamera}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const onBarcodeScanned = async (data) => {
    if (!scanningEnabled || loading("scanning")) return;
    try {
      setLoading("scanning", true);
      Vibration.vibrate();
      setScanningEnabled(false);

      const docData = await getFirebaseDocument(firestoreCollections.events, data.data);

      // Check if the data or event name is not available
      if (!docData || !docData.eventName) {
        return showScanAlert({ title: alertMessages.error, message: alertMessages.eventNameError });
      }

      // Get the event date and check if it is valid
      const eventDate = convertDateTimeToLocale(docData.eventDate);
      const eventEndDate = convertDateTimeToLocale(docData.eventEndDate);

      if (!checkEventStartTime(eventDate, eventEndDate)) {
        return QrScannerAlert({
          title: docData.eventName,
          message: alertMessages.eventNotAvailable,
          onTouch: () => setScanningEnabled(true),
        });
      }

      if (docData.signedUp.includes(user)) {
        return QrScannerAlert({
          title: docData.eventName,
          message: alertMessages.alreadySignedUp,
          onTouch: () => setScanningEnabled(true),
        });
      }

      if (docData.signedUp.length >= docData.groupLimit) {
        return QrScannerAlert({
          title: docData.eventName,
          message: alertMessages.eventFull,
          onTouch: () => setScanningEnabled(true),
        });
      }

      await joinEvent(firestoreCollections.events, data.data, user);
      QrScannerAlert({ title: docData.eventName, message: alertMessages.success, onTouch: () => setScanningEnabled(true) });
    } catch (error) {
      showScanAlert({ title: alertMessages.error, message: error.message });
    } finally {
      setLoading("scanning", false);
    }
  };

  return (
    <SafeAreaView className={"flex-1 p-4 items-center"}>
      <Text className={"mt-4 text-lg font-bold"}>Scan QR Code</Text>
      <View className={"w-full h-3/5"}>
        {loading("scanning") ? (
          <ActivityIndicator size={"large"} color={"#0000ff"} />
        ) : (
          <CameraView
            className={"flex-1"}
            facing={"back"}
            onBarcodeScanned={onBarcodeScanned}
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default QrScanner;
