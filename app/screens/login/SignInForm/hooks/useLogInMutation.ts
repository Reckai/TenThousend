import { logIn, LoginCredentials, LoginResponse } from "@/app/api/axios/auth/requests/logIn";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";

export const useLogInMutation = ()=> useMutation({
    mutationKey: ['logIn'],
    mutationFn: (credentials: LoginCredentials)=> logIn(credentials),
    onSuccess: (data: LoginResponse)=>{
        const {accessToken, refreshToken, ...userData} = data;
    },
    onError: (error)=>{
        Alert.alert('Login failed', error.message);
    }
})