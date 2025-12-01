import { Toaster } from "@/shared/components/shadcn/sonner";
import SignupCard from "../organism/signupCard";

const SignupTemplate = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Toaster richColors position="top-center" theme="light" />
      <SignupCard />
    </div>
  );
};

export default SignupTemplate;
