import { Card } from "@/shared/components/atoms/card";
import CompanyImageWithTitle from "@/shared/components/molecules/companyImageWithTitle";
import TitleAndSubtitle from "@/shared/components/molecules/titleAndSubtitle";
import LoginForm from "./loginForm";
import TextWithLink from "@/shared/components/molecules/textWithLink";

const LoginCard = () => {
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
          variant: "2xl",
          weight: "semiBold",
          className: "text-foreground mb-1",
          text: "Sign in",
        }}
        subtitle={{
          component: "p",
          variant: "sm",
          className: "text-muted-foreground",
          text: "to access the insight",
        }}
      />
      <LoginForm />
      <TextWithLink
        linkPath="/signup"
        linkText="Sign up now"
        text="Don't have an account?"
      />
    </Card>
  );
};
export default LoginCard;
