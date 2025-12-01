export type Step = "identifier" | "password" | "otp";

export type LoginFormData = {
  emailOrPhone: string;
  password: string | undefined;
  otp: string | undefined;
};
