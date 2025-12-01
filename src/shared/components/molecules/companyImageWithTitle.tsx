import { Typography } from "../atoms/Typography";

interface CompanyImageWithTitleProps {
  title: string;
  className?: string;
  titleClassName?: string;
}

const CompanyImageWithTitle = ({
  title,
  className,
  titleClassName,
}: CompanyImageWithTitleProps) => {
  return (
    <div className={`flex flex-row items-center gap-2 ${className}`}>
      <img
        src="/ekart-favicon.svg"
        alt="Ekart logo"
        className="h-8 w-8 object-contain"
      />
      <Typography
        component="h1"
        variant="xl"
        weight="semiBold"
        className={`text-primary ${titleClassName}`}
      >
        {title}
      </Typography>
    </div>
  );
};
export default CompanyImageWithTitle;
