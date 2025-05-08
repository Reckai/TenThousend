import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { BackButton } from "@/app/components/BackButton";
import { useTranslation } from "react-i18next";
import { CommonStyles } from "../../utils/styles";
import SignInForm from "./SignInForm/SignInForm";

const Login: React.FC = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView
      style={[CommonStyles.flexContainer, CommonStyles.whiteBackground]}
    >
      <BackButton />
      <View
        style={[
          CommonStyles.flexContainer,
          CommonStyles.paddingHorizontal,
          CommonStyles.mainContainer,
          styles.contentWrapper,
        ]}
      >
        <Text style={[CommonStyles.title, styles.title]}>
          {t("auth.signIn.title")}
        </Text>
        <Text style={[CommonStyles.subtitle, styles.subtitleMargin]}>
          {t("auth.signIn.subtitle")}
        </Text>
        <View style={[CommonStyles.flexContainer, styles.formMargin]}>
          <SignInForm />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentWrapper: {
    marginTop: 50,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  subtitleMargin: {
    marginBottom: 30,
  },
  formMargin: {
    marginBottom: 30,
  },
});

export default Login;
