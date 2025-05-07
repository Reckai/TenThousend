import SettingsItem from "@/app/components/SettingsItem";
import { changeLocalization } from "@/app/redux/slices/auth.slice";
import { RootState } from "@/app/redux/store";
import LanguageList from "@/app/translations/languageList.json";
import { Colors } from "@/app/utils/colors";
import { AntDesign, Fontisto } from "@expo/vector-icons";
import { changeLanguage } from "i18next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

interface CheckboxProps {
  isSelected: boolean;
}

const Checkbox = ({ isSelected }: CheckboxProps) => {
  return (
    <View style={styles.checkboxContainer}>
      <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
        {isSelected && (
          <AntDesign name="check" size={24} color={Colors.white} />
        )}
      </View>
    </View>
  );
};

const Language = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { localization } = useSelector((state: RootState) => state.auth);
  const userLocalization = localization ? localization : "en";
  const [selectedLanguage, setSelectedLanguage] =
    useState<string>(userLocalization);

  const handleToggle = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    changeLanguage(languageCode);
    dispatch(changeLocalization(languageCode));
  };

  return (
    <View style={styles.Container}>
      <Text style={styles.title}>{t("language")}</Text>
      {Object.entries(LanguageList).map(([code, language]) => (
        <SettingsItem key={code} onPress={() => handleToggle(code)}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Fontisto name="world-o" size={24} color={Colors.orange} />
              <Text>{language.nativeName}</Text>
            </View>
            <Checkbox isSelected={selectedLanguage === code} />
          </View>
        </SettingsItem>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.grayBlack,
    marginTop: 20,
  },
  Container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
    paddingTop: 50,
  },
  checkboxContainer: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: {
    backgroundColor: Colors.orange,
  },
});

export default Language;
