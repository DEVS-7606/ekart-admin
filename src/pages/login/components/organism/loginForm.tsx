import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useMemo, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/components/atoms/form";
import Input from "@/shared/components/atoms/input";
import Button from "@/shared/components/atoms/button";
import {
  getValidationErrorMessage,
  isOnlyDigits,
  isValidEmailOrPhone,
} from "@/shared/utils/validation.utils";
import CountryCodeDropDown from "@/shared/components/organisms/countryCodeDropDown";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import PasswordField from "@/shared/components/molecules/passwordField";
import OtpField from "@/shared/components/molecules/otpField";
import AuthToggleActions from "@/shared/components/molecules/authToggleActions";
import SubmitButton from "@/shared/components/molecules/submitButton";
import InputField from "@/shared/components/molecules/InputField";
import type { Country } from "@/shared/interfaces";
import type { Step, LoginFormData } from "../../types";

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<Step>("identifier");
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    code: "IN",
    countryCode: "+91",
    label: "India",
    flag: "🇮🇳",
  });

  useEffect(() => {
    if (step === "otp") toast.success("otp sent successfully");
  }, [step]);

  const schema = useMemo(() => {
    return z.object({
      emailOrPhone: z
        .string()
        .min(1, "Email or phone number is required")
        .superRefine((value, ctx) => {
          if (!isValidEmailOrPhone(value)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: getValidationErrorMessage(value),
            });
          }
        }),
      password:
        step === "password"
          ? z.string().min(1, "Enter your password")
          : z.string().optional(),
      otp:
        step === "otp"
          ? z
              .string()
              .min(6, "Enter 6-digit OTP")
              .max(6, "Enter 6-digit OTP")
              .refine((v) => isOnlyDigits(v), "OTP must be digits")
          : z.string().optional(),
    });
  }, [step]);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: { emailOrPhone: "", password: "", otp: "" },
    mode: "onBlur",
  });

  const { watch } = form;
  const emailOrPhoneValue = watch("emailOrPhone");

  async function onSubmit(values: LoginFormData) {
    const isEmail = values.emailOrPhone.includes("@");

    const payload = isEmail
      ? values.emailOrPhone
      : `${selectedCountry.countryCode}${values.emailOrPhone}`;

    if (step === "identifier") {
      localStorage.setItem("emailOrPhone", payload);
      setStep("password");
      return;
    }

    setIsLoading(true);
    try {
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      form.setError(step === "password" ? "password" : "otp", {
        message: "Invalid credentials. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleResendOtp = () => {
    if (step === "otp") {
      form.reset({ ...form.getValues(), otp: "" });
      toast.success("OTP sent successfully");
    } else if (step === "password") navigate("/forgot-password");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="emailOrPhone"
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-2">
                {step === "identifier" && isOnlyDigits(emailOrPhoneValue) && (
                  <CountryCodeDropDown
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                  />
                )}

                <FormControl className="flex-1">
                  <Input
                    placeholder="Enter your email or mobile number"
                    {...field}
                    value={
                      step !== "identifier" && isOnlyDigits(emailOrPhoneValue)
                        ? `${selectedCountry.countryCode} ${emailOrPhoneValue}`
                        : field.value
                    }
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    className="border-input focus:border-primary focus:ring-1 focus:ring-primary"
                    disabled={isLoading || step !== "identifier"}
                    type="text"
                  />
                </FormControl>
                <div className="flex justify-end">
                  {step !== "identifier" && (
                    <Button
                      type="button"
                      variant={"outline"}
                      className="text-primary text-sm font-medium hover:underline"
                      onClick={() => setStep("identifier")}
                    >
                      Change
                    </Button>
                  )}
                </div>
              </div>
              <FormMessage className="text-destructive text-sm mt-1" />
            </FormItem>
          )}
        />

        {step !== "identifier" && (
          <InputField
            control={form.control}
            name={step === "password" ? "password" : "otp"}
          >
            {({ field }) =>
              step === "password" ? (
                <PasswordField
                  value={field.value as string}
                  onChange={field.onChange}
                  disabled={isLoading}
                />
              ) : (
                <OtpField
                  value={field.value as string}
                  onChange={field.onChange}
                  disabled={isLoading}
                />
              )
            }
          </InputField>
        )}

        {step !== "identifier" && (
          <AuthToggleActions
            mode={step === "password" ? "password" : "otp"}
            onToggleMode={() => {
              setStep(step === "password" ? "otp" : "password");
              form.clearErrors();
            }}
            onRightAction={handleResendOtp}
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          labelIdle={
            step === "identifier"
              ? "Next"
              : step === "password"
              ? "Sign in"
              : "Verify"
          }
          labelLoading={step === "otp" ? "Verifying..." : "Signing in..."}
        />
      </form>
    </Form>
  );
};

export default LoginForm;
