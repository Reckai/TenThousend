import { Colors } from "@/app/utils/colors";
import { ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface MainHeaderProps {
  children?: ReactNode;
  backgroundColor?: string;
  style?: ViewStyle;
}

const MainHeader = ({
  children,
  backgroundColor = Colors.orange,
  style,
}: MainHeaderProps) => {
  return (
    <View style={[styles.header, { backgroundColor }, style]}>{children}</View>
  );
};

const styles = StyleSheet.create({
  header: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
  },
});

export default MainHeader;
