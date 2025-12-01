import { Typography } from "../atoms/Typography";

interface SheetHeaderProps {
  title: string;
  description?: string;
  containerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const SheetHeader = ({
  title,
  description,
  containerClassName = "",
  titleClassName = "",
  descriptionClassName = "",
}: SheetHeaderProps) => {
  return (
    <div className={`border-b border-border px-6 py-4 ${containerClassName}`}>
      <Typography
        component="h2"
        variant="xl"
        weight="semiBold"
        className={`text-foreground ${titleClassName}`}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          component="p"
          variant="sm"
          className={`text-muted-foreground ${descriptionClassName}`}
        >
          {description}
        </Typography>
      )}
    </div>
  );
};

export default SheetHeader;
