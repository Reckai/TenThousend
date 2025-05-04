import { Colors } from "@/app/utils/colors";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, i18n.language === "en" && styles.activeButton]}
        onPress={() => changeLanguage("en")}
      >
        <Text
          style={[styles.text, i18n.language === "en" && styles.activeText]}
        >
          EN
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, i18n.language === "uk" && styles.activeButton]}
        onPress={() => changeLanguage("uk")}
      >
        <Text
          style={[styles.text, i18n.language === "uk" && styles.activeText]}
        >
          UA
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.orange,
  },
  activeButton: {
    backgroundColor: Colors.orange,
  },
  text: {
    color: Colors.orange,
    fontWeight: "bold",
  },
  activeText: {
    color: "white",
  },
});

export default LanguageSwitcher;
