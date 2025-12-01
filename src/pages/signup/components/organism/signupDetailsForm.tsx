import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useMemo, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/atoms/form";
import Input from "@/shared/components/atoms/input";
import PasswordField from "@/shared/components/molecules/passwordField";
import SubmitButton from "@/shared/components/molecules/submitButton";
import InputField from "@/shared/components/molecules/InputField";
import Button from "@/shared/components/atoms/button";
import { Typography } from "@/shared/components/atoms/Typography";
import {
  isOnlyDigits,
  isValidEmail,
  isValidPhoneLength,
} from "@/shared/utils/validation.utils";
import CountryCodeDropDown from "@/shared/components/organisms/countryCodeDropDown";
import type { Country } from "@/shared/interfaces";
import type { SignupFormData } from "../../types";
import { Checkbox } from "@/shared/components/atoms/checkbox";

export type SignupDetailsSubmitPayload = {
  formValues: SignupFormData;
  phoneWithCode: string;
};

type Props = {
  onSubmit: (payload: SignupDetailsSubmitPayload) => void;
  initialValues?: SignupFormData | null;
};

const SignupDetailsForm = ({ onSubmit, initialValues }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    code: "IN",
    countryCode: "+91",
    label: "India",
    flag: "🇮🇳",
  });

  const schema = useMemo(() => {
    return z.object({
      fullName: z.string().min(1, "Full name is required"),
      sjoNumber: z.string().min(1, "SJO number is required"),
      email: z
        .string()
        .min(1, "Email is required")
        .refine((v) => isValidEmail(v), "Please enter a valid email address"),
      password: z.string().min(1, "Enter your password"),
      phone: z
        .string()
        .min(1, "Phone number is required")
        .refine(
          (v) => isOnlyDigits(v) && isValidPhoneLength(v),
          "Enter a valid 10-digit phone number"
        ),
      agree: z.boolean().refine((v) => v === true, {
        message: "You must agree to the Terms and Privacy Policy",
      }),
    });
  }, []);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialValues ?? {
      fullName: "",
      sjoNumber: "",
      email: "",
      password: "",
      phone: "",
      agree: false,
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [initialValues, form]);

  async function handleSubmit(values: SignupFormData) {
    setIsLoading(true);
    try {
      const phoneWithCode = `${selectedCountry.countryCode}${values.phone}`;
      onSubmit({ formValues: values, phoneWithCode });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <InputField
          control={form.control}
          name="fullName"
          label={{
            component: (
              <Typography
                component="span"
                variant="sm"
                className="text-slate-800"
              >
                Full Name
                <Typography
                  component="span"
                  variant="sm"
                  className="text-red-500 ml-0.5"
                >
                  *
                </Typography>
              </Typography>
            ),
          }}
        >
          {({ field }) => (
            <Input
              placeholder="Enter your full name"
              {...field}
              disabled={isLoading}
              className="border-input focus:border-primary focus:ring-1 focus:ring-primary"
            />
          )}
        </InputField>

        <InputField
          control={form.control}
          name="sjoNumber"
          label={{
            component: (
              <Typography
                component="span"
                variant="sm"
                className="text-slate-800"
              >
                SJO Number
                <Typography
                  component="span"
                  variant="sm"
                  className="text-red-500 ml-0.5"
                >
                  *
                </Typography>
              </Typography>
            ),
          }}
        >
          {({ field }) => (
            <Input
              placeholder="Enter your SJO number"
              {...field}
              disabled={isLoading}
              className="border-input focus:border-primary focus:ring-1 focus:ring-primary"
            />
          )}
        </InputField>

        <InputField
          control={form.control}
          name="email"
          label={{
            component: (
              <Typography
                component="span"
                variant="sm"
                className="text-slate-800"
              >
                Email
                <Typography
                  component="span"
                  variant="sm"
                  className="text-red-500 ml-0.5"
                >
                  *
                </Typography>
              </Typography>
            ),
          }}
        >
          {({ field }) => (
            <Input
              type="email"
              placeholder="Enter your email"
              {...field}
              disabled={isLoading}
              className="border-input focus:border-primary focus:ring-1 focus:ring-primary"
            />
          )}
        </InputField>

        <InputField
          control={form.control}
          name="password"
          label={{
            component: (
              <Typography
                component="span"
                variant="sm"
                className="text-slate-800"
              >
                Password
                <Typography
                  component="span"
                  variant="sm"
                  className="text-red-500 ml-0.5"
                >
                  *
                </Typography>
              </Typography>
            ),
          }}
        >
          {({ field }) => (
            <PasswordField
              value={field.value}
              onChange={field.onChange}
              disabled={isLoading}
              withToggle
            />
          )}
        </InputField>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground">
                <Typography
                  component="span"
                  variant="sm"
                  className="text-slate-800"
                >
                  Phone Number
                  <Typography
                    component="span"
                    variant="sm"
                    className="text-red-500 ml-0.5"
                  >
                    *
                  </Typography>
                </Typography>
              </FormLabel>
              <div className="flex gap-2">
                <CountryCodeDropDown
                  selectedCountry={selectedCountry}
                  setSelectedCountry={setSelectedCountry}
                />
                <FormControl className="flex-1">
                  <Input
                    placeholder="Enter your phone number"
                    {...field}
                    disabled={isLoading}
                    inputMode="numeric"
                    className="border-input focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </FormControl>
              </div>
              <FormMessage className="text-destructive text-sm mt-1" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="agree"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="agree"
                  checked={field.value}
                  onCheckedChange={(val) => field.onChange(!!val)}
                  disabled={isLoading}
                />
                <FormLabel
                  htmlFor="agree"
                  className="cursor-pointer text-foreground"
                >
                  <Typography component="span" variant="sm">
                    I agree to the{" "}
                    <Button
                      type="button"
                      variant="link"
                      className="text-primary px-0 align-baseline"
                      onClick={() => window.open("#", "_blank")}
                    >
                      Terms of Service
                    </Button>
                    <span> and </span>
                    <Button
                      type="button"
                      variant="link"
                      className="text-primary px-0 align-baseline"
                      onClick={() => window.open("#", "_blank")}
                    >
                      Privacy Policy
                    </Button>
                    .
                  </Typography>
                </FormLabel>
              </div>
              <FormMessage className="text-destructive text-sm mt-1" />
            </FormItem>
          )}
        />

        <SubmitButton
          isLoading={isLoading}
          labelIdle="Sign up"
          labelLoading="Signing up..."
        />
      </form>
    </Form>
  );
};

export default SignupDetailsForm;
