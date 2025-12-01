import { Card } from "@/shared/components/atoms/card";
import CompanyImageWithTitle from "@/shared/components/molecules/companyImageWithTitle";
import TitleAndSubtitle from "@/shared/components/molecules/titleAndSubtitle";
import ForgotPasswordForm from "./forgotPasswordForm";

const ForgotPasswordCard = () => {
  return (
    <Card className="w-full max-w-md shadow-lg pt-8 pb-8 px-8">
      <CompanyImageWithTitle
        title="ekart"
        className="mb-4"
        titleClassName="hidden sm:block"
      />
      <TitleAndSubtitle
        title={{
          component: "h2",
          variant: "xl",
          weight: "semiBold",
          className: "text-foreground mb-2 mt-4",
          text: "Forgot Password",
        }}
      />
      <ForgotPasswordForm />
    </Card>
  );
};

export default ForgotPasswordCard;
