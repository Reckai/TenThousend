import { Colors } from "@/app/utils/colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SettingsItem = ({
  title,
  children,
  onPress,
}: {
  title?: string;
  children: React.ReactNode;
  onPress: () => void;
}) => {
  return (
    <View style={{ marginTop: 32 }}>
      {title && <Text style={styles.itemTitle}>{title}</Text>}
      <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
        {children}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.secondaryGray,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  itemTitle: {
    color: `${Colors.grayBlack}72`,
    fontSize: 15,
  },
});
export default SettingsItem;
