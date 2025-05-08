import { PIN_CODE_SERVICE } from "@/app/(screens)/PinCode/_consts";
import { logOut } from "@/app/redux/slices";
import { unVerify } from "@/app/redux/slices/verify.slice";
import { RootState } from "@/app/redux/store";
import { Colors } from "@/app/utils/colors";
import { CommonStyles } from "@/app/utils/styles";
import { Feather } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SettingsItem from "../../SettingsItem";
const LogoutButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  if (!user) {
    return;
  }
  const logOutHandler = async () => {
    await SecureStore.deleteItemAsync(PIN_CODE_SERVICE);

    dispatch(logOut());
    dispatch(unVerify());
  };
  return (
    <SettingsItem
      title={t("profile.other")}
      onPress={() => {
        logOutHandler();
      }}
    >
      <View style={[CommonStyles.itemContainer]}>
        <Feather name="log-out" size={24} color={Colors.orange} />
        <Text>{t("profile.logout")}</Text>
      </View>
    </SettingsItem>
  );
};

export default LogoutButton;
