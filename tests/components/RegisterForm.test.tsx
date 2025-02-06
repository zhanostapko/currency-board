import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterForm from "../../components/RegisterForm";
import { useRouter } from "next/navigation";
import { registerAction } from "../../app/actions/register";
import { act, useActionState } from "react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../app/actions/register", () => ({
  registerAction: jest.fn(),
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useActionState: jest.fn(),
}));

describe("RegisterForm Component", () => {
  const mockRouter = { push: jest.fn() };
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useActionState as jest.Mock).mockReturnValue([
      { success: false, error: null, email: "" },
      jest.fn(),
    ]);
  });

  test("renders registration form", () => {
    const { asFragment } = render(<RegisterForm />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByText("Sign up")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  test("shows error when passwords do not match", async () => {
    const { asFragment } = render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "password321" },
    });

    fireEvent.click(screen.getByText("Sign up"));

    (useActionState as jest.Mock).mockReturnValueOnce([
      {
        success: false,
        error: "Passwords do not match",
        email: "test@example.com",
      },
      jest.fn(),
    ]);

    act(() => {
      render(<RegisterForm />);
    });

    await waitFor(() => {
      expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
    });
    expect(asFragment()).toMatchSnapshot();
  });

  test("calls registerAction on valid form submission", async () => {
    (registerAction as jest.Mock).mockResolvedValue({ success: true });

    const { asFragment } = render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });

    const [passwordInput, confirmPasswordInput] =
      screen.getAllByLabelText(/password/i);

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });

    const button = screen.getByRole("button", { name: /sign up/i });
    fireEvent.click(button);

    (useActionState as jest.Mock).mockReturnValueOnce([
      { success: true, error: null, email: "test@example.com" },
      jest.fn(),
    ]);

    act(() => {
      render(<RegisterForm />);
    });

    await waitFor(() => {
      expect(
        screen.getAllByText(
          /Your account has been successfully created! Redirecting to Sign In/i
        ).length
      ).toBeGreaterThan(0);
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
