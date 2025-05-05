import React from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { BackButton } from "../../components/BackButton";
import { Colors } from "../../utils/colors";
import { CommonStyles } from "../../utils/styles";
import SignUpForm from "./signUpForm/SignUpForm";
const Register: React.FC = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <View style={[styles.content, CommonStyles.mainContainer]}>
        <Text style={styles.title}>{t("auth.signUp.title")}</Text>
        <Text style={styles.subtitle}>{t("auth.signUp.subtitle")}</Text>

        <View style={styles.form}>
          <SignUpForm />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  form: {
    marginBottom: 30,
    flex: 1,
  },
});

export default Register;
