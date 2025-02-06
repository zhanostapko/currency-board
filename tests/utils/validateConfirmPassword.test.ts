import { validateConfirmPassword } from "../../utils/validate";

describe("validateConfirmPassword", () => {
  test("returns error if passwords do not match", () => {
    expect(validateConfirmPassword("password123!", "password321!")).toBe(
      "Passwords do not match"
    );
  });

  test("returns null if passwords match", () => {
    expect(
      validateConfirmPassword("SamePassword1!", "SamePassword1!")
    ).toBeNull();
  });
});
