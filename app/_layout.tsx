import { Slot, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { changeLanguage } from "i18next";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Provider } from "./providers/provider";
import { RootState } from "./redux/store";
SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});
export default function RootLayout() {
  const router = useRouter();
  const [isAppReady, setIsAppReady] = useState(false);
  const InnerApp = () => {
    const userLocalization = useSelector(
      (state: RootState) => state.auth.localization,
    );
    const { Token } = useSelector((state: RootState) => state.auth);
    const isVerified = useSelector(
      (state: RootState) => state.verify.isVerified,
    );

    useEffect(() => {
      if (userLocalization) {
        changeLanguage(userLocalization);
      }

      const isAuth = !!Token;
      console.log(
        `Auth Status: isAuth=${isAuth}, isVerified=${isVerified}, token=${Token}, verifyStatus=${isVerified}`,
      );
      if (isAuth) {
        if (isVerified) {
          router.replace("/(main)/(tabs)/home");
        } else {
          router.replace("/(screens)/PinCode");
        }
      } else {
        router.replace("/(screens)");
      }
    }, [Token, isVerified, userLocalization]);
    return <Slot />;
  };

  useEffect(() => {
    async function prepare() {
      try {
        setIsAppReady(true);
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);
  const onLayoutRootView = useCallback(() => {
    if (isAppReady) {
      SplashScreen.hide();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  return (
    <Provider>
      <SafeAreaView onLayout={onLayoutRootView} style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <InnerApp />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
