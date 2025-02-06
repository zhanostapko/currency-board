import { validateEmail } from "../../utils/validate";

describe("validateEmail", () => {
  test("returns error if email is empty", () => {
    expect(validateEmail("")).toBe("Email is required");
  });

  test("returns error if email is too long", () => {
    const longEmail = "a".repeat(256) + "@example.com";
    expect(validateEmail(longEmail)).toBe("Email is too long");
  });

  test("returns error if email format is invalid", () => {
    expect(validateEmail("invalid-email")).toBe("Invalid email format");
  });

  test("returns null for valid email", () => {
    expect(validateEmail("test@example.com")).toBeNull();
  });
});
