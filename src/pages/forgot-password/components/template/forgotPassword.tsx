import { Toaster } from "@/shared/components/shadcn/sonner";
import ForgotPasswordCard from "../organism/forgotPasswordCard";

const ForgotPasswordTemplate = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Toaster richColors position="top-center" theme="light" />
      <ForgotPasswordCard />
    </div>
  );
};

export default ForgotPasswordTemplate;
