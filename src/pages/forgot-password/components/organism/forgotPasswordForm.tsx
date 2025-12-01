import { useEffect, useRef, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/shared/components/atoms/form";
import Button from "@/shared/components/atoms/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import ContactDisplay from "@/pages/forgot-password/components/molecules/ContactDisplay";
import OtpField from "@/shared/components/molecules/otpField";
import SubmitButton from "@/shared/components/molecules/submitButton";
import InputField from "@/shared/components/molecules/InputField";
import type { ForgotPasswordFormData } from "../../types";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [contact, setContact] = useState<string>("");

  // To prevent multiple toasts, it is used to track whether the toast has already been shown
  const toastShownRef = useRef(false);

  useEffect(() => {
    const stored = localStorage.getItem("emailOrPhone") || "";
    setContact(stored);
    if (!toastShownRef.current && stored) {
      toast.success("OTP sent successfully");
      toastShownRef.current = true;
    }
    if (!stored) {
      navigate("/login");
    }
  }, [navigate]);

  const schema = useMemo(
    () =>
      z.object({
        otp: z
          .string()
          .min(6, "Enter 6-digit OTP")
          .max(6, "Enter 6-digit OTP")
          .refine((v) => /^\d{6}$/.test(v), "OTP must be digits"),
      }),
    []
  );

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(schema),
    defaultValues: { otp: "" },
    mode: "onBlur",
  });

  async function onSubmit(values: ForgotPasswordFormData) {
    setIsLoading(true);
    try {
      const payload = { identifier: contact, otp: values.otp };
      console.log("Verifying forgot-password OTP:", payload);
      toast.success("OTP verified successfully");
    } catch {
      form.setError("otp", { message: "Invalid OTP. Please try again." });
    } finally {
      setIsLoading(false);
    }
  }

  const handleResendOtp = () => {
    toast.success("OTP sent successfully");
    form.reset({ otp: "" });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <ContactDisplay
          contact={contact}
          onChangeClick={() => navigate("/login")}
        />

        <InputField control={form.control} name="otp">
          {({ field }) => (
            <OtpField
              value={field.value as string}
              onChange={field.onChange}
              disabled={isLoading}
            />
          )}
        </InputField>

        <div className="flex items-center justify-between -mt-2">
          <div />
          <Button
            type="button"
            variant={"link"}
            className="text-primary px-0 text-sm font-medium hover:underline"
            onClick={handleResendOtp}
          >
            Resend OTP
          </Button>
        </div>

        <SubmitButton
          isLoading={isLoading}
          labelIdle="Verify"
          labelLoading="Verifying..."
        />
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
