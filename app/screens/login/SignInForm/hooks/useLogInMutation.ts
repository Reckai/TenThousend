import {
  logIn,
  LoginCredentials,
  LoginResponse,
} from "@/app/api/axios/auth/requests/logIn";
import { signIn } from "@/app/redux/slices";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
export const useLogInMutation = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  return useMutation({
    mutationKey: ["logIn"],
    mutationFn: (credentials: LoginCredentials) => logIn(credentials),
    onSuccess: (data: LoginResponse) => {
      const { accessToken, refreshToken, ...userData } = data;
      dispatch(signIn({ ...userData, accessToken, localization: "en" }));
    },
    onError: (error) => {
      Alert.alert("Login failed", error.message);
    },
  });
};
