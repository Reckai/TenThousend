import React from "react";
import { useTranslation } from "react-i18next";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Button from "../../components/Button";
import { Colors } from "../../utils/colors";
import { CommonStyles } from "../../utils/styles";
import BlockList from "./components/BlockList/BlockList";
import { useBlocks } from "./components/hooks/useBlocks";

const Welcome: React.FC = () => {
  const { t } = useTranslation();
  const { data, functions } = useBlocks();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, CommonStyles.mainContainer]}>
        <View style={styles.content}>
          {
            <BlockList
              cards={data.cards}
              handleCardPress={functions.handleCardPress}
            />
          }
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={t("auth.signIn.submitButton")}
            onPress={functions.handleLogin}
          />
          <Button
            title={t("auth.signUp.submitButton")}
            backgroundColor={Colors.orange}
            onPress={functions.handleRegister}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    marginTop: 50,
    paddingBottom: 80,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    left: -20,
    right: -20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  columnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    width: "48%",
  },
  cardGap: {
    height: 16,
  },
});

export default Welcome;
