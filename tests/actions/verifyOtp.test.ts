import { verifyOtpAction } from "../../app/actions/verifyOtp";
import { OtpActionType } from "../../types/FormTypes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("crypto", () => ({
  randomBytes: jest.fn(() => ({
    toString: jest.fn(() => "mocked-token"),
  })),
}));

describe("verifyOtpAction", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const emptyState: OtpActionType = {
    error: null,
    step: "otp",
  };

  test("returns error if OTP is missing", async () => {
    const formData = new FormData();
    const result = await verifyOtpAction(emptyState, formData);

    expect(result).toEqual({
      error: "OTP is required",
      step: "otp",
    });
  });

  test("returns error if OTP is incorrect", async () => {
    const formData = new FormData();
    formData.append("enteredOtp", "123456");
    formData.append("serverOtp", "654321");

    const result = await verifyOtpAction(emptyState, formData);

    expect(result).toEqual({
      error: "Invalid OTP",
      step: "otp",
    });
  });

  test("sets a cookie with a token if OTP is correct", async () => {
    const mockSet = jest.fn();
    (cookies as jest.Mock).mockReturnValue({ set: mockSet });

    const formData = new FormData();
    formData.append("enteredOtp", "123456");
    formData.append("serverOtp", "123456");

    await verifyOtpAction(emptyState, formData);

    expect(mockSet).toHaveBeenCalledWith("token", "mocked-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600,
      path: "/",
    });
  });

  test("redirects to /dashboard if OTP is correct", async () => {
    const formData = new FormData();
    formData.append("enteredOtp", "123456");
    formData.append("serverOtp", "123456");

    await verifyOtpAction(emptyState, formData);

    expect(redirect).toHaveBeenCalledWith("/dashboard");
  });
});
