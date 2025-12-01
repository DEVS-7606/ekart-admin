import type { SignupFormData } from "../../types";
import SignupDetailsForm, {
  type SignupDetailsSubmitPayload,
} from "./signupDetailsForm";
import SignupVerificationForm, {
  type SignupVerificationFormData,
} from "./signupVerificationForm";

export type SignupStep = "details" | "verify";

type Props = {
  step: SignupStep;
  details: SignupFormData | null;
  phoneWithCode: string;
  onDetailsSubmit: (payload: SignupDetailsSubmitPayload) => void;
  onVerificationSubmit: (values: SignupVerificationFormData) => void;
  onChangeContactClick?: () => void;
};

const SignupForm = ({
  step,
  details,
  phoneWithCode,
  onDetailsSubmit,
  onVerificationSubmit,
  onChangeContactClick,
}: Props) => {
  if (step === "details") {
    return (
      <SignupDetailsForm onSubmit={onDetailsSubmit} initialValues={details} />
    );
  }

  return (
    <SignupVerificationForm
      email={details?.email ?? ""}
      phoneWithCode={phoneWithCode}
      onSubmit={onVerificationSubmit}
      onChangeContactClick={onChangeContactClick}
    />
  );
};

export default SignupForm;
