import { registerAction } from "@/app/actions/register";
import { RegisterActionType } from "../../types/FormTypes";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../../utils/validate";

jest.mock("../../utils/validate");

describe("registerAction", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const emptyState: RegisterActionType = {
    error: null,
    success: false,
    email: "",
  };

  test("returns error if email is invalid", async () => {
    (validateEmail as jest.Mock).mockReturnValue("Invalid email");

    const formData = new FormData();
    formData.append("email", "invalid-email");
    formData.append("password", "ValidPass123");
    formData.append("confirmPassword", "ValidPass123");

    const result = await registerAction(emptyState, formData);

    expect(result).toEqual({
      error: "Invalid email",
      success: false,
      email: "invalid-email",
    });
  });

  test("returns error if password is invalid", async () => {
    (validateEmail as jest.Mock).mockReturnValue(null);
    (validatePassword as jest.Mock).mockReturnValue("Invalid password");

    const formData = new FormData();
    formData.append("email", "test@example.com");
    formData.append("password", "123");
    formData.append("confirmPassword", "123");

    const result = await registerAction(emptyState, formData);

    expect(result).toEqual({
      error: "Invalid password",
      success: false,
      email: "test@example.com",
    });
  });

  test("returns error if passwords do not match", async () => {
    (validateEmail as jest.Mock).mockReturnValue(null);
    (validatePassword as jest.Mock).mockReturnValue(null);
    (validateConfirmPassword as jest.Mock).mockReturnValue(
      "Passwords do not match"
    );

    const formData = new FormData();
    formData.append("email", "test@example.com");
    formData.append("password", "ValidPass123");
    formData.append("confirmPassword", "DifferentPass123");

    const result = await registerAction(emptyState, formData);

    expect(result).toEqual({
      error: "Passwords do not match",
      success: false,
      email: "test@example.com",
    });
  });

  test("returns success when data is valid", async () => {
    (validateEmail as jest.Mock).mockReturnValue(null);
    (validatePassword as jest.Mock).mockReturnValue(null);
    (validateConfirmPassword as jest.Mock).mockReturnValue(null);

    const formData = new FormData();
    formData.append("email", "test@example.com");
    formData.append("password", "ValidPass123");
    formData.append("confirmPassword", "ValidPass123");

    const result = await registerAction(emptyState, formData);

    expect(result.error).toBeNull();
    expect(result.success).toBe(true);
    expect(result.email).toBe("test@example.com");
  });
});
