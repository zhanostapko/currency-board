"use server";
import crypto from "crypto";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { OtpActionType } from "@/types/FormTypes";

export async function verifyOtpAction(
  prevState: OtpActionType,
  formData: FormData
): Promise<OtpActionType> {
  const enteredOtp = formData.get("enteredOtp") as string;
  const serverOtp = formData.get("serverOtp") as string;

  if (!enteredOtp) {
    return { error: "OTP is required", step: "otp" };
  }

  if (enteredOtp !== serverOtp) {
    return { error: "Invalid OTP", step: "otp" };
  }

  await new Promise((res) => setTimeout(res, 1500));

  const token = crypto.randomBytes(32).toString("hex");
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600,
    path: "/",
  });

  redirect("/dashboard");
}
