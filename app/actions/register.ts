"use server";

import { RegisterActionType } from "@/types/FormTypes";
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
} from "@/utils/validate";

export async function registerAction(
  prevState: RegisterActionType,
  formData: FormData
): Promise<RegisterActionType> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const emailError = validateEmail(email);
  const passwordError = validatePassword(password, "register");
  const confirmPasswordError = validateConfirmPassword(
    password,
    confirmPassword
  );

  if (emailError || passwordError || confirmPasswordError) {
    return {
      error: emailError || passwordError || confirmPasswordError,
      success: false,
      email,
    };
  }

  await new Promise((res) => setTimeout(res, 1500));

  return { error: null, success: true, email };
}
