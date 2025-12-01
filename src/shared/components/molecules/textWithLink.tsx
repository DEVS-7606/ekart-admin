import { Typography } from "@/shared/components/atoms/Typography";
import { Button } from "@/shared/components/shadcn/button";
import { useNavigate } from "react-router-dom";

type TextWithLinkProps = {
  text: string;
  linkText: string;
  linkPath: string;
};

const TextWithLink = ({ text, linkText, linkPath }: TextWithLinkProps) => {
  const navigate = useNavigate();
  return (
    <div className="text-left mt-4">
      <Typography component="p" variant="sm" className="text-gray-700">
        {text}
        <Button
          variant={"link"}
          onClick={() => navigate(linkPath)}
          className="text-primary pl-0.5 hover:underline cursor-pointer"
        >
          {linkText}
        </Button>
      </Typography>
    </div>
  );
};
export default TextWithLink;
