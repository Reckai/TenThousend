import SettingsItem from "@/app/components/SettingsItem";
import { logOut } from "@/app/redux/slices";
import { unVerify } from "@/app/redux/slices/verify.slice";
import { RootState } from "@/app/redux/store";
import { User } from "@/app/types/user";
import { Colors } from "@/app/utils/colors";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { router, useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
// we have 2 choices:
// we can take user info in the component or pass it from the parent
// we don`t know will be this component re-used in the future or not
// so i will pass user info from the parent

const UserInfo = ({ image, firstName, lastName }: User) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: image }}
        style={styles.userAvatar}
        resizeMode="cover"
      />
      <View style={styles.nameColumn}>
        <Text>{firstName}</Text>
        <Text>{lastName}</Text>
      </View>
    </View>
  );
};

const LanguageButton = () => {
  const { t } = useTranslation();
  return (
    <SettingsItem
      title={t("profile.other")}
      onPress={() => {
        router.push("/profile/language");
      }}
    >
      <View style={styles.itemContainer}>
        <Fontisto name="world-o" size={24} color={Colors.orange} />
        <Text>{t("profile.language")}</Text>
      </View>
    </SettingsItem>
  );
};

const LogoutButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  if (!user) {
    return;
  }
  return (
    <SettingsItem
      title={t("profile.other")}
      onPress={() => {
        dispatch(logOut());
        dispatch(unVerify());
      }}
    >
      <View style={[styles.itemContainer]}>
        <Feather name="log-out" size={24} color={Colors.orange} />
        <Text>{t("profile.logout")}</Text>
      </View>
    </SettingsItem>
  );
};

const Profile = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { user } = useSelector((state: RootState) => state.auth);
  console.log(user);
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
  itemContainer: {
    marginTop: 0,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 40,
  },
  nameColumn: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "flex-start",
  },
});

export default Profile;
