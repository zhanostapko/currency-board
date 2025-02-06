import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "../../components/LoginForm";

jest.mock("../../components/OTPForm", () => {
  const MockOTPForm = () => <div data-testid="otp-form">OTP Form</div>;
  MockOTPForm.displayName = "MockOTPForm";
  return MockOTPForm;
});

test("Login form renders correctly", () => {
  const { asFragment } = render(<LoginForm />);
  expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  expect(asFragment()).toMatchSnapshot();
});

test("Shows error message for incorrect email", async () => {
  const { asFragment } = render(<LoginForm />);

  const emailInput = screen.getByLabelText(/email address/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const signInButton = screen.getByRole("button", { name: /sign in/i });

  fireEvent.change(emailInput, { target: { value: "incorrect@email.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.click(signInButton);

  await waitFor(() => {
    expect(screen.getByText("Invalid email or password")).toBeInTheDocument();
  });
  expect(asFragment()).toMatchSnapshot();
});

test("Shows error message for incorrect password", async () => {
  const { asFragment } = render(<LoginForm />);

  const emailInput = screen.getByLabelText(/email address/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const signInButton = screen.getByRole("button", { name: /sign in/i });

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "incorrect-password" } });
  fireEvent.click(signInButton);

  await waitFor(() => {
    expect(screen.getByText("Invalid email or password")).toBeInTheDocument();
  });
  expect(asFragment()).toMatchSnapshot();
});

test("Shows error message for invalid email format", async () => {
  const { asFragment } = render(<LoginForm disableValidation={true} />);

  const emailInput = screen.getByLabelText(/email address/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const signInButton = screen.getByRole("button", { name: /sign in/i });

  fireEvent.change(emailInput, { target: { value: "invalid-email" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.click(signInButton);

  await waitFor(() => {
    expect(screen.getByText("Invalid email format")).toBeInTheDocument();
  });
  expect(asFragment()).toMatchSnapshot();
});
