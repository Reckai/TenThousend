import LanguageButton from "@/app/components/(tabs)/profile/LanguageButton";
import LogoutButton from "@/app/components/(tabs)/profile/LogOutButton";
import UserInfo from "@/app/components/(tabs)/profile/UserInfo";
import { RootState } from "@/app/redux/store";
import { Colors } from "@/app/utils/colors";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const Profile = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    return;
  }
  return (
    <View style={styles.profileContainer}>
      <FontAwesome
        name="angle-left"
        onPress={() => navigation.goBack()}
        size={32}
        color={Colors.grayBlack}
      />
      <Text style={styles.title}>{t("profile.title")}</Text>
      <UserInfo {...user} />
      <LanguageButton />
      <LogoutButton />
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
    paddingTop: 50,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.grayBlack,
    marginTop: 20,
  },
  itemTitle: {
    color: `${Colors.grayBlack}72`,
    fontSize: 15,
  },
  itemContent: {
    marginTop: 10,
  },
});

export default Profile;
