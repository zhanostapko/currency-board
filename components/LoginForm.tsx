"use client";

import { useActionState } from "react";
import SubmitButton from "./SubmitButton";
import { loginAction } from "@/app/actions/login";
import Input from "./Shared/Input";
import AuthFormWrapper from "./AuthWrapper";
import OTPForm from "./OTPForm";
import Link from "next/link";

const LoginForm = () => {
  const [state, formAction] = useActionState(loginAction, {
    error: null,
    step: "login",
    email: "",
    otp: null,
  });

  return (
    <AuthFormWrapper
      title="Hello Again!"
      subtitle={state.step === "otp" ? "" : "Welcome Back"}
    >
      {state.step === "otp" ? (
        <>
          <OTPForm otpCode={state.otp} email={state.email} />
        </>
      ) : (
        <>
          <form className="flex flex-col gap-3 mb-4" action={formAction}>
            <Input
              label="Email Address"
              type="email"
              name="email"
              required
              defaultValue={state.email}
            />
            <Input label="Password" type="password" name="password" required />
            {state.error && (
              <p className="text-red-500 text-xs">{state.error}</p>
            )}
            <SubmitButton title="Sign In" />
          </form>

          <Link
            href="/register"
            className="text-blue-500 mt-6 text-sm cursor-pointer hover:underline"
          >
            Don&apos;t have an account? Sign up
          </Link>
          <p className="text-gray-500 mt-2 text-sm cursor-pointer hover:underline">
            Forgot Password
          </p>
        </>
      )}
    </AuthFormWrapper>
  );
};

export default LoginForm;
