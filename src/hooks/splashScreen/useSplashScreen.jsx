/**
 * Custom hook for managing the visibility of a splash screen.
 *
 * @returns {Object} An object containing the visibility state and the onLayoutRootView function.
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
