import { signInForm, signInSchema } from "@/app/schemas/signInSchema";


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLogInMutation } from "./useLogInMutation";

export const useSignInForm = () => {
    const signInForm = useForm<signInForm>({
        defaultValues: {
          name: "",
          password: "",
        },
        resolver: zodResolver(signInSchema),
      });

      const logInMutation = useLogInMutation();
      const onSubmit = signInForm.handleSubmit(async(data)=>{
try {
     logInMutation.mutateAsync({username: data.name, password: data.password});
} catch (error) {
    console.error('Login failed:', error);
}
})
return {
    form:signInForm,
    onSubmit,
    isLoading: logInMutation.isPending,
}
}