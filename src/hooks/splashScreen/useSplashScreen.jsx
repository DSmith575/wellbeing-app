/**
 * @name useSplashScreen
 * @description The useSplashScreen hook is used to manage the splash screen in the app.
 * @module useSplashScreen
 * @returns {Object} An object containing the visibility of the splash screen and a function to handle the layout of the root view.
 */

import { useState, useEffect, useCallback } from "react";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";

const useSplashScreen = () => {
  const [isVisible, setIsVisible] = useState(false);

  const onLayoutRootView = useCallback(async () => {
    if (isVisible) {
      await hideAsync();
    }
  }, [isVisible]);

  useEffect(() => {
    const prepare = async () => {
      try {
        await preventAutoHideAsync();
      } catch (error) {
        console.log(error);
      } finally {
        setIsVisible(true);
      }
    };
    prepare();
  }, []);

  return { isVisible, onLayoutRootView };
};

export default useSplashScreen;
