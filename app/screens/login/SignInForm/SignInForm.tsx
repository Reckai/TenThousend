import i18n from "@/app/translations/i18n";
import { Colors } from "@/app/utils/colors";
import { CommonStyles } from "@/app/utils/styles";
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
    <View style={[CommonStyles.flexContainer, CommonStyles.gap]}>
      <Controller
        control={form.control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <View style={CommonStyles.inputContainer}>
            <TextInput
              style={CommonStyles.input}
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
          <View style={CommonStyles.inputContainer}>
            <TextInput
              style={CommonStyles.input}
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
        style={[
          CommonStyles.button,
          CommonStyles.centerContent,
          {
            backgroundColor: Colors.orange,
            opacity: isLoading ? 0.5 : 1,
            marginTop: 10,
          },
        ]}
        onPress={onSubmit}
        disabled={isLoading}
      >
        <Text style={CommonStyles.buttonText}>
          {i18n.t("auth.signIn.submitButton")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default SignInForm;
