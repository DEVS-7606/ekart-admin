import { isValidPhoneNumber } from "libphonenumber-js";

export const isValidEmail = (value: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

export const isOnlyDigits = (value: string): boolean => {
  return /^[0-9]+$/.test(value);
};

export const isValidPhoneLength = (phone: string): boolean => {
  return phone.length === 10;
};

export const getDigitCount = (value: string): number => {
  return value.replace(/[^0-9]/g, "").length;
};

export const validateInternationalPhone = (value: string): boolean => {
  try {
    return isValidPhoneNumber(value);
  } catch {
    return false;
  }
};

export const isValidEmailOrPhone = (value: string): boolean => {
  if (isValidEmail(value)) return true;

  if (isOnlyDigits(value)) {
    return isValidPhoneLength(value);
  }

  return validateInternationalPhone(value);
};

export const getValidationErrorMessage = (value: string): string => {
  if (isOnlyDigits(value)) {
    const digitCount = value.length;
    if (digitCount < 10) {
      return "Phone number should contain at least 10 digits";
    }
    if (digitCount > 10) {
      return "Phone number should contain exactly 10 digits";
    }
  }

  if (value.includes("@")) {
    return "Please enter a valid email address";
  }

  return "Please enter a valid email or 10-digit phone number";
};
