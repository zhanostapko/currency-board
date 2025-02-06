import { validatePassword } from "../../utils/validate";

describe("validatePassword", () => {
  test("returns error if password is empty", () => {
    expect(validatePassword("")).toBe("Password is required");
  });

  test("returns error if password is too short", () => {
    expect(validatePassword("Short1!", "register")).toBe(
      "Password must be at least 8 characters"
    );
  });

  test("returns error if password is too long", () => {
    const longPassword = "A".repeat(129);
    expect(validatePassword(longPassword, "register")).toBe(
      "Password is too long"
    );
  });

  test("returns error if password does not meet complexity requirements", () => {
    expect(validatePassword("password", "register")).toBe(
      "Password must contain upper, lower, number, and special character"
    );
  });

  test("returns null for valid password", () => {
    expect(validatePassword("ValidPass1!", "register")).toBeNull();
  });

  test("allows simple password for login", () => {
    expect(validatePassword("123456", "login")).toBeNull();
  });
});
