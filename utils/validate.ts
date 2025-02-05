// utils/validation.ts

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export function validateEmail(email: string): string | null {
  if (!email) return "Email is required";
  if (email.length > 255) return "Email is too long";
  if (!emailRegex.test(email)) return "Invalid email format";
  return null;
}

export function validatePassword(
  password: string,
  mode: "register" | "login" = "register"
): string | null {
  if (!password) return "Password is required";
  if (mode === "register") {
    if (password.length < 8) return "Password must be at least 8 characters";
    if (password.length > 128) return "Password is too long";
    if (!passwordRegex.test(password)) {
      return "Password must contain upper, lower, number, and special character";
    }
  }
  return null;
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string
): string | null {
  if (password !== confirmPassword) return "Passwords do not match";
  return null;
}
