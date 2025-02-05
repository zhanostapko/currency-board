export type RegisterActionType = {
  error: string | null;
  success: boolean;
  email: string;
};

export type LoginActionType = {
  error: string | null;
  step: "login" | "otp";
  email: string;
  otp: number | null;
};

export type OtpActionType = {
  error: string | null;
  step: "otp";
};
