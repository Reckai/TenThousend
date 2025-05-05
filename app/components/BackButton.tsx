import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../utils/colors";
export const BackButton = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text onPress={() => navigation.goBack()} style={styles.backButton}>
        {"<"}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    fontSize: 24,
    fontWeight: "bold",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.orange,
    color: Colors.orange,
  },
});
