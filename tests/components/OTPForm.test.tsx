import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OTPForm from "../../components/OTPForm";

jest.useFakeTimers();

jest.mock("../../app/actions/verifyOtp.ts", () => ({
  verifyOtpAction: jest.fn().mockImplementation(() => ({
    error: "Invalid OTP",
    step: "otp",
  })),
}));

describe("OTPForm Component", () => {
  const mockEmail = "test@example.com";
  const mockOtp = 123456;

  test("renders correctly with email", () => {
    const { asFragment } = render(
      <OTPForm email={mockEmail} otpCode={mockOtp} />
    );

    expect(
      screen.getByText(`Enter the OTP sent to ${mockEmail}`)
    ).toBeInTheDocument();
    expect(screen.getByLabelText("OTP Code")).toBeInTheDocument();
    expect(screen.getByText("Verify code")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test("allows entering OTP and submits form", async () => {
    const { asFragment } = render(
      <OTPForm email={mockEmail} otpCode={mockOtp} />
    );

    const otpInput = screen.getByLabelText("OTP Code");
    fireEvent.change(otpInput, { target: { value: "123456" } });

    expect(otpInput).toHaveValue("123456");

    fireEvent.click(screen.getByText("Verify code"));
    expect(asFragment()).toMatchSnapshot();
  });

  test("shows error message when OTP is incorrect", async () => {
    const { asFragment } = render(
      <OTPForm email={mockEmail} otpCode={123456} />
    );

    const otpInput = screen.getByLabelText("OTP Code");
    fireEvent.change(otpInput, { target: { value: "000000" } });
    fireEvent.click(screen.getByText("Verify code"));

    await waitFor(() => {
      expect(screen.getByText("Invalid OTP")).toBeInTheDocument();
    });
    expect(asFragment()).toMatchSnapshot();
  });

  test("displays test OTP after 3 seconds", async () => {
    const { asFragment } = render(
      <OTPForm email={mockEmail} otpCode={mockOtp} />
    );

    expect(screen.queryByTestId("spinner")).toBeInTheDocument();

    jest.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
      expect(screen.getAllByText(/Test code:/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/123456/i).length).toBeGreaterThan(0);
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
