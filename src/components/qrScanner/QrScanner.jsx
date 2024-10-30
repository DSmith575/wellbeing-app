import { useState, useCallback } from "react";
import { Text, View, TouchableOpacity, Alert, SafeAreaView, ActivityIndicator, Vibration } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useFocusEffect } from "@react-navigation/native";
import { useUserAuth } from "../../context/firebase/FirestoreAuthContext";
import useLoading from "../../hooks/loading/useLoading";
import { eventCollection } from "../../utils/constants/constants";
import { checkDate, convertDateTimeToLocale } from "../../utils/dateTime/dateTimeFunctions";
import { getFirebaseDocument, joinEvent } from "../../utils/firestore/firestoreFunctions";
import { alertMessages } from "../../utils/constants/constants";
import Spinner from "../spinner/Spinner";
import customAlert from "../alert/Alert";

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

      const docData = await getFirebaseDocument(eventCollection, data.data);

      // if (!docSnap.exists()) {
      //   Alert.alert("Error", "QR Code is invalid");
      //   return;
      //
      // }

      const eventDate = convertDateTimeToLocale(docData.eventDate);

      const eventDateCheck = checkDate(eventDate);

      if (!eventDateCheck) {
        customAlert({
          title: docData.eventName,
          message: alertMessages.eventNotAvailable,
          buttonText: "OK",
          onTouch: () => {
            setScanningEnabled(true);
          },
        });
        return;
      }

      if (!docData || !docData.eventName) {
        customAlert({
          title: alertMessages.error,
          message: alertMessages.eventNameError,
          buttonText: "OK",
          onTouch: () => {
            setScanningEnabled(true);
          },
        });
        return;
      }

      if (docData.signedUp.includes(user)) {
        customAlert({
          title: docData.eventName,
          message: alertMessages.alreadySignedUp,
          buttonText: "OK",
          onTouch: () => {
            setScanningEnabled(true);
          },
        });
        return;
      }

      if (docData.signedUp.length >= docData.groupLimit) {
        customAlert({
          title: docData.eventName,
          message: alertMessages.eventFull,
          buttonText: "OK",
          onTouch: () => {
            setScanningEnabled(true);
          },
        });
        return;
      }

      customAlert({
        title: docData.eventName,
        message: "Code successfully scanned",
        buttonText: "OK",
        onTouch: () => {
          setScanningEnabled(true);
        },
      });
    } catch (error) {
      Alert.alert("Error", error.message);
      setScanningEnabled(true);
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
