import { Toaster } from "@/shared/components/shadcn/sonner";
import LoginCard from "../organism/loginCard";

const LoginTemplate = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Toaster richColors position="top-center" theme="light" />
      <LoginCard />
    </div>
  );
};
export default LoginTemplate;
