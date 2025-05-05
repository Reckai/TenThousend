import i18n from "@/app/translations/i18n";
import { Colors } from "@/app/utils/colors";
import { Controller } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSignInForm } from "./hooks/useSignInForm";
const READY_USER = {
  name: "emilys",
  password: "emilyspass",
};
const SignInForm = () => {
  const { form, onSubmit, isLoading } = useSignInForm();

  return (
    <View style={styles.container}>
      <Controller
        control={form.control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={i18n.t("auth.signIn.name")}
              value={value}
              onChangeText={onChange}
            />
            {form.formState.errors.name && (
              <Text style={styles.errorText}>
                {form.formState.errors.name.message}
              </Text>
            )}
          </View>
        )}
      />

      <Controller
        control={form.control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={i18n.t("auth.signIn.password")}
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
            {form.formState.errors.password && (
              <Text style={styles.errorText}>
                {form.formState.errors.password.message}
              </Text>
            )}
          </View>
        )}
      />

      <TouchableOpacity
        style={[styles.button, { opacity: isLoading ? 0.5 : 1 }]}
        onPress={onSubmit}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {i18n.t("auth.signIn.submitButton")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: Colors.orange,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SignInForm;
