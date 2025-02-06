import { loginAction } from "@/app/actions/login";
import { LoginActionType } from "../../types/FormTypes";
import { validateEmail, validatePassword } from "../../utils/validate";

jest.mock("../../utils/validate");

describe("loginAction", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const emptyState: LoginActionType = {
    error: null,
    step: "login",
    email: "",
    otp: null,
  };

  test("returns error if email or password is missing", async () => {
    const formData = new FormData();
    const result = await loginAction(emptyState, formData);

    expect(result).toEqual({
      error: "Email and password are required",
      step: "login",
      email: null,
      otp: null,
    });
  });

  test("returns validation error if email or password is invalid", async () => {
    (validateEmail as jest.Mock).mockReturnValue("Invalid email");
    (validatePassword as jest.Mock).mockReturnValue(null);

    const formData = new FormData();
    formData.append("email", "invalid-email");
    formData.append("password", "ValidPass123");

    const result = await loginAction(emptyState, formData);

    expect(result).toEqual({
      error: "Invalid email",
      step: "login",
      email: "invalid-email",
      otp: null,
    });
  });

  test("returns error for incorrect email or password", async () => {
    (validateEmail as jest.Mock).mockReturnValue(null);
    (validatePassword as jest.Mock).mockReturnValue(null);
    const formData = new FormData();
    formData.append("email", "incorrect@email.com");
    formData.append("password", "password123");

    const result = await loginAction(emptyState, formData);

    expect(result).toEqual({
      error: "Invalid email or password",
      step: "login",
      email: "incorrect@email.com",
      otp: null,
    });
  });

  test("returns error for incorrect password with any valid email", async () => {
    (validateEmail as jest.Mock).mockReturnValue(null);
    (validatePassword as jest.Mock).mockReturnValue(null);

    const formData = new FormData();
    formData.append("email", "valid@example.com");
    formData.append("password", "incorrect-password");

    const result = await loginAction(emptyState, formData);

    expect(result).toEqual({
      error: "Invalid email or password",
      step: "login",
      email: "valid@example.com",
      otp: null,
    });
  });

  test("returns OTP step if credentials are valid", async () => {
    (validateEmail as jest.Mock).mockReturnValue(null);
    (validatePassword as jest.Mock).mockReturnValue(null);

    const formData = new FormData();
    formData.append("email", "test@example.com");
    formData.append("password", "ValidPass123");

    const result = await loginAction(emptyState, formData);

    expect(result.error).toBeNull();
    expect(result.step).toBe("otp");
    expect(result.email).toBe("test@example.com");
    expect(typeof result.otp).toBe("number");
  });

  test("waits for async operation before returning OTP", async () => {
    jest.useFakeTimers();

    (validateEmail as jest.Mock).mockReturnValue(null);
    (validatePassword as jest.Mock).mockReturnValue(null);

    const formData = new FormData();
    formData.append("email", "test@example.com");
    formData.append("password", "ValidPass123");

    const loginPromise = loginAction(emptyState, formData);

    jest.advanceTimersByTime(1500);

    const result = await loginPromise;

    expect(result.error).toBeNull();
    expect(result.step).toBe("otp");
    expect(typeof result.otp).toBe("number");

    jest.useRealTimers();
  });
});
