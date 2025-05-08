import { Colors } from "@/app/utils/colors";
import { CommonStyles } from "@/app/utils/styles";
import { Fontisto } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import SettingsItem from "../../SettingsItem";

const LanguageButton = () => {
  const { t } = useTranslation();

  return (
    <SettingsItem
      title={t("profile.other")}
      onPress={() => {
        router.push("/profile/language");
      }}
    >
      <View style={CommonStyles.itemContainer}>
        <Fontisto name="world-o" size={24} color={Colors.orange} />
        <Text>{t("profile.language")}</Text>
      </View>
    </SettingsItem>
  );
};

export default LanguageButton;
