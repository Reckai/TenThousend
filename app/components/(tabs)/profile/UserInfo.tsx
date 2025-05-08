import { User } from "@/app/types/user";
import { CommonStyles } from "@/app/utils/styles";
import { Image, StyleSheet, Text, View } from "react-native";

const UserInfo = ({ image, firstName, lastName }: User) => {
  return (
    <View style={CommonStyles.itemContainer}>
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

const styles = StyleSheet.create({
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

export default UserInfo;
