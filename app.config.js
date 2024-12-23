import "dotenv/config";

export default {
  expo: {
    plugins: [
      [
        "expo-camera",
        {
          cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
        },
      ],
    ],
    name: "wellbeing-app",
    slug: "wellbeing-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/splashScreen/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splashScreen/icon.png",
      resizeMode: "contain",
      backgroundColor: "#0e5aa5",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/splashScreen/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/splashScreen/icon.png",
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
    },
  },
};
