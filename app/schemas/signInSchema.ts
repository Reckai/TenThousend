import i18n from "@/app/translations/i18n";
import { z } from "zod";

export const signInSchema = z.object({
  name: z.string().min(1,i18n.t("auth.signIn.validation.nameRequired")),
  password: z
    .string().min(1,i18n.t("auth.signIn.validation.passwordRequired"))
});

export type signInForm = z.infer<typeof signInSchema>;
