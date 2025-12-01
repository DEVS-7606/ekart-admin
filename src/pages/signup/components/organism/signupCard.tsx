import { useState } from "react";
import { Card } from "@/shared/components/atoms/card";
import CompanyImageWithTitle from "@/shared/components/molecules/companyImageWithTitle";
import TitleAndSubtitle from "@/shared/components/molecules/titleAndSubtitle";
import TextWithLink from "@/shared/components/molecules/textWithLink";
import SignupForm, { type SignupStep } from "./signupForm";
import { toast } from "sonner";
import type { SignupFormData } from "../../types";
import type { SignupDetailsSubmitPayload } from "./signupDetailsForm";
import type { SignupVerificationFormData } from "./signupVerificationForm";
import { useNavigate } from "react-router-dom";

const SignupCard = () => {
  const [step, setStep] = useState<SignupStep>("details");
  const [details, setDetails] = useState<SignupFormData | null>(null);
  const [phoneWithCode, setPhoneWithCode] = useState<string>("");
  const navigate = useNavigate();
  const handleDetailsSubmit = ({
    formValues,
    phoneWithCode: formattedPhone,
  }: SignupDetailsSubmitPayload) => {
    setDetails(formValues);
    setPhoneWithCode(formattedPhone);
    setStep("verify");
    toast.success("OTP sent successfully");
  };

  const handleVerificationSubmit = (values: SignupVerificationFormData) => {
    if (!details) return;

    const payload = {
      ...details,
      phone: phoneWithCode,
      emailOtp: values.emailOtp,
      phoneOtp: values.phoneOtp,
    };

    console.log("Signup payload:", payload);
    toast.success("Account created successfully");
    navigate("/login");
  };

  const handleBack = () => {
    if (step === "verify") {
      setStep("details");
    }
  };

  const isVerificationStep = step === "verify";

  return (
    <Card className="w-full max-w-lg shadow-lg pt-8 pb-8 px-8">
      <CompanyImageWithTitle
        title="ekart"
        titleClassName="hidden sm:block"
        className="mb-4"
      />
      <TitleAndSubtitle
        title={{
          component: "h2",
          variant: "2xl",
          weight: "semiBold",
          className: "text-foreground mb-1",
          text: isVerificationStep ? "Email / Mobile Verification" : "Sign up",
        }}
        subtitle={{
          component: "p",
          variant: "sm",
          className: "text-muted-foreground",
          text: "to access the insight",
        }}
      />
      <SignupForm
        step={step}
        details={details}
        phoneWithCode={phoneWithCode}
        onDetailsSubmit={handleDetailsSubmit}
        onVerificationSubmit={handleVerificationSubmit}
        onChangeContactClick={handleBack}
      />
      <TextWithLink
        linkPath="/login"
        linkText="Sign in"
        text="Already have an account?"
      />
    </Card>
  );
};

export default SignupCard;
