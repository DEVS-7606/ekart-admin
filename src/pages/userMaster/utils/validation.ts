import { z } from "zod";
import {
  isValidEmail,
  isOnlyDigits,
  isValidPhoneLength,
} from "@/shared/utils/validation.utils";

export const userFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  customer: z.string().min(1, "Customer is required"),
  mobile: z
    .string()
    .min(1, "Mobile number is required")
    .refine((value) => isOnlyDigits(value) && isValidPhoneLength(value), {
      message: "Mobile number must contain exactly 10 digits",
    }),
  email: z
    .string()
    .min(1, "Email ID is required")
    .refine((value) => isValidEmail(value), {
      message: "Please enter a valid email address",
    }),
  active: z.boolean(),
  machineCodes: z.array(z.string()).optional(),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
