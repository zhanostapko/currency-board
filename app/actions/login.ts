"use server";
import { LoginActionType } from "@/types/FormTypes";
import { validateEmail, validatePassword } from "@/utils/validate";

export async function loginAction(
  prevState: LoginActionType,
  formData: FormData
): Promise<LoginActionType> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      error: "Email and password are required",
      step: "login",
      email,
      otp: null,
    };
  }

  const emailError = validateEmail(email);
  const passwordError = validatePassword(password, "login");

  if (emailError || passwordError) {
    return {
      error: emailError || passwordError,
      step: "login",
      email,
      otp: null,
    };
  }

  if (email === "incorrect@email.com" || password === "incorrect-password") {
    return {
      error: "Invalid email or password",
      step: "login",
      email,
      otp: null,
    };
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  await new Promise((res) => setTimeout(res, 1500));

  return { error: null, step: "otp", email, otp: otp };
}
