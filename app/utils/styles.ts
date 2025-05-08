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
  itemContainer: {
    marginTop: 0,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  flexContainer: {
    flex: 1,
  },
  whiteBackground: {
    backgroundColor: Colors.white,
  },
  flexRow: {
    flexDirection: "row",
  },
  flexColumn: {
    flexDirection: "column",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  description: {
    fontSize: 13,
    color: `${Colors.grayBlack}40`,
  },
  boldText: {
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
  },
  inputContainer: {
    marginBottom: 10,
  },

  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  card: {
    borderRadius: 15,
    padding: 20,
    backgroundColor: Colors.white,
    marginBottom: 10,
    minHeight: 120,
  },
  cardContent: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 8,
  },

  gap: {
    gap: 16,
  },
  smallGap: {
    gap: 8,
  },
  marginBottom: {
    marginBottom: 16,
  },
  padding: {
    padding: 16,
  },
  paddingHorizontal: {
    paddingHorizontal: 20,
  },
  paddingVertical: {
    paddingVertical: 10,
  },
});
