"use client";
import { useActionState, useEffect, useState } from "react";
import Input from "./Shared/Input";
import { verifyOtpAction } from "@/app/actions/verifyOtp";
import SubmitButton from "./SubmitButton";
import Spinner from "./Spinner";

type OTPFormProps = { email: string | null; otpCode: number | null };

const OTPForm = ({ email, otpCode }: OTPFormProps) => {
  const [state, formAction] = useActionState(verifyOtpAction, {
    error: null,
    step: "otp",
  });

  const [showOTP, setShowOTP] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOTP(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <form
      autoComplete="off"
      className="flex flex-col gap-4"
      action={formAction}
    >
      <p className="text-gray-500 text-sm">Enter the OTP sent to {email}</p>
      <Input
        label="OTP Code"
        type="text"
        name="enteredOtp"
        required
        maxLength={6}
      />
      {state.error && <p className="text-red-500 text-xs">{state.error}</p>}
      <SubmitButton title="Verify code" />
      {/* For testing */}
      {showOTP && otpCode ? (
        <div className="mt-10 text-gray-500 text-sm transition-opacity duration-500 ease-in-out">
          Test code: <span className="font-bold">{otpCode}</span>
        </div>
      ) : (
        <Spinner size={24} />
      )}
      <input type="hidden" name="serverOtp" value={otpCode ?? ""} />
    </form>
  );
};

export default OTPForm;
