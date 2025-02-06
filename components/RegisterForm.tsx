"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Shared/Input";
import SubmitButton from "./SubmitButton";
import { registerAction } from "@/app/actions/register";

import Link from "next/link";
import AuthFormWrapper from "./AuthWrapper";

const RegisterForm = () => {
  const [state, formAction] = useActionState(registerAction, {
    error: null,
    success: false,
    email: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      setTimeout(() => router.push("/login"), 2000);
    }
  }, [state.success, router]);

  return (
    <AuthFormWrapper
      title={`${state.success ? "" : "Create an Account"}`}
      subtitle={`${state.success ? "" : "Sign up to get started"}`}
    >
      {state.success ? (
        <p className="text-green-700 font-medium text-sm bg-green-100 p-3 rounded-lg border border-green-400">
          🎉 Your account has been successfully created! Redirecting to Sign
          In...
        </p>
      ) : (
        <form
          data-testid="register-form"
          className="flex flex-col gap-4"
          action={formAction}
        >
          <Input
            id="email"
            label="Email"
            type="email"
            name="email"
            required
            defaultValue={state.email}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            name="password"
            required
          />
          <Input
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            required
          />
          {state.error && <p className="text-red-500 text-xs">{state.error}</p>}
          <SubmitButton title="Sign up" />
        </form>
      )}
      <Link href="/login">
        <p className="text-gray-500 mt-2 text-sm cursor-pointer hover:underline">
          {`${
            state.success
              ? "Go to sign in page"
              : "Already have an account? Login"
          }`}
        </p>
      </Link>
    </AuthFormWrapper>
  );
};

export default RegisterForm;
