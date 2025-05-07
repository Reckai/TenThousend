import { Slot, SplashScreen, useRouter } from "expo-router";
import { changeLanguage } from "i18next";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Provider } from "./providers/provider";
import { RootState } from "./redux/store";

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
      const initAndNavigate = async () => {
        await SplashScreen.hideAsync();
        setIsAppReady(true);
      };
      initAndNavigate();
    });

    useEffect(() => {
      if (!isAppReady) {
        return;
      }

      if (userLocalization) {
        changeLanguage(userLocalization);
      }

      const isAuth = !!Token;
      console.log(
        `Auth Status: isAuth=${isAuth}, isVerified=${isVerified}, token=${Token}, verifyStatus=${isVerified}`,
      );
      if (isAuth) {
        if (isVerified) {
          // MAKE main screen
          router.replace("/register");
        } else {
          router.replace("/PinCode");
        }
      } else {
        router.replace("/");
      }
    }, [Token, isVerified, userLocalization]);
    return <Slot />;
  };

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
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
    marginTop: StatusBar.currentHeight,
  },
});
