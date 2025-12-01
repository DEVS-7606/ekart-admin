import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/shared/components/atoms/form";
import Button from "@/shared/components/atoms/button";
import { Typography } from "@/shared/components/atoms/Typography";
import OtpField from "@/shared/components/molecules/otpField";
import SubmitButton from "@/shared/components/molecules/submitButton";
import InputField from "@/shared/components/molecules/InputField";
import { toast } from "sonner";
import ContactDisplay from "@/pages/forgot-password/components/molecules/ContactDisplay";

export type SignupVerificationFormData = {
  emailOtp: string;
  phoneOtp: string;
};

type Props = {
  email: string;
  phoneWithCode: string;
  onSubmit: (values: SignupVerificationFormData) => void;
  onChangeContactClick?: () => void;
};

const SignupVerificationForm = ({
  email,
  phoneWithCode,
  onSubmit,
  onChangeContactClick,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const schema = useMemo(
    () =>
      z.object({
        emailOtp: z
          .string()
          .min(6, "Enter 6-digit OTP")
          .max(6, "Enter 6-digit OTP")
          .refine((v) => /^\d{6}$/.test(v), "OTP must be digits"),
        phoneOtp: z
          .string()
          .min(6, "Enter 6-digit OTP")
          .max(6, "Enter 6-digit OTP")
          .refine((v) => /^\d{6}$/.test(v), "OTP must be digits"),
      }),
    []
  );

  const form = useForm<SignupVerificationFormData>({
    resolver: zodResolver(schema),
    defaultValues: { emailOtp: "", phoneOtp: "" },
    mode: "onBlur",
  });

  const handleResendOtp = (type: "email" | "phone") => {
    toast.success(
      `OTP sent successfully to ${
        type === "email"
          ? email || "your email"
          : phoneWithCode || "your mobile number"
      }`
    );

    if (type === "email") {
      form.reset({ ...form.getValues(), emailOtp: "" });
    } else {
      form.reset({ ...form.getValues(), phoneOtp: "" });
    }
  };

  async function handleSubmit(values: SignupVerificationFormData) {
    setIsLoading(true);
    try {
      onSubmit(values);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Typography
              component="span"
              variant="sm"
              className="text-slate-800"
            >
              Email
            </Typography>
          </div>

          <ContactDisplay
            contact={email || ""}
            onChangeClick={onChangeContactClick ?? (() => {})}
          />

          <InputField control={form.control} name="emailOtp">
            {({ field }) => (
              <OtpField
                value={field.value as string}
                onChange={field.onChange}
                disabled={isLoading}
              />
            )}
          </InputField>

          <div className="flex items-center justify-end -mt-2">
            <Button
              type="button"
              variant="link"
              className="text-primary px-0 text-sm font-medium hover:underline"
              onClick={() => handleResendOtp("email")}
            >
              Resend OTP
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Typography
              component="span"
              variant="sm"
              className="text-slate-800"
            >
              Mobile
            </Typography>
          </div>

          <ContactDisplay
            contact={phoneWithCode || ""}
            onChangeClick={onChangeContactClick ?? (() => {})}
          />

          <InputField control={form.control} name="phoneOtp">
            {({ field }) => (
              <OtpField
                value={field.value as string}
                onChange={field.onChange}
                disabled={isLoading}
              />
            )}
          </InputField>

          <div className="flex items-center justify-end -mt-2">
            <Button
              type="button"
              variant="link"
              className="text-primary px-0 text-sm font-medium hover:underline"
              onClick={() => handleResendOtp("phone")}
            >
              Resend OTP
            </Button>
          </div>
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

export default SignupVerificationForm;
