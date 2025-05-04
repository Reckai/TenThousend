import i18n from "@/app/translations/i18n";
import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().nonempty(i18n.t("auth.signUp.validation.nameRequired")),
  email: z.string().email(i18n.t("auth.signUp.validation.invalidEmail")),
  password: z
    .string()
    .min(8, i18n.t("auth.signUp.validation.passwordMinLength"))
    .max(64, i18n.t("auth.signUp.validation.passwordMaxLength"))
    .regex(/[A-Z]/, i18n.t("auth.signUp.validation.passwordUppercase"))
    .regex(/[a-z]/, i18n.t("auth.signUp.validation.passwordLowercase"))
    .regex(/[0-9]/, i18n.t("auth.signUp.validation.passwordNumber"))
    .regex(/[\W_]/, i18n.t("auth.signUp.validation.passwordSpecial")),
});

export type signUpValues = z.infer<typeof signUpSchema>;
