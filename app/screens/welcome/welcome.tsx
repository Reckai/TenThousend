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
    <SafeAreaView
      style={[CommonStyles.flexContainer, CommonStyles.whiteBackground]}
    >
      <View
        style={[
          CommonStyles.flexContainer,
          CommonStyles.mainContainer,
          styles.topMargin,
        ]}
      >
        <View style={[CommonStyles.flexContainer, styles.paddingTop]}>
          {
            <BlockList
              cards={data.cards}
              handleCardPress={functions.handleCardPress}
            />
          }
        </View>

        <View style={[styles.buttonContainer, CommonStyles.centerContent]}>
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
  topMargin: {
    marginTop: 50,
    paddingBottom: 80,
  },
  paddingTop: {
    paddingTop: 20,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    left: -20,
    right: -20,
  },
});

export default Welcome;
