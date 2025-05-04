import { StyleSheet } from "react-native";
import { Colors } from "./colors";

export const AppStyleValues = {
  maxWidth: "100%",
  maxHeight: "100%",
} as const;

export const CommonStyles = StyleSheet.create({
  blockContainer: {
    width: AppStyleValues.maxWidth,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: Colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
  },
  mainContainer: { margin: 20 },
  itemWidth: { width: AppStyleValues.maxWidth },
});
