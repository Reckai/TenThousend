import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import Button from "../../components/Button";
import { Colors } from "../../utils/colors";
import { CommonStyles } from "../../utils/styles";

const Login: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.content, CommonStyles.mainContainer]}>
        <Text style={styles.title}>Вход в аккаунт</Text>
        <Text style={styles.subtitle}>Введите свои данные для входа</Text>

        {/* Здесь будет форма входа */}
        <View style={styles.form}>
          <Text>Форма входа</Text>
        </View>

        <Button
          title="Войти"
          onPress={() => {}}
          backgroundColor={Colors.orange}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  form: {
    marginBottom: 30,
  },
});

export default Login;
