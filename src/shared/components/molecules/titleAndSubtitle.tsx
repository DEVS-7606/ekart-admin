import {
  Typography,
  type TypographyComponent,
  type TypographyVariant,
  type TypographyWeight,
} from "../atoms/Typography";

interface TitleAndSubtitleProps {
  title: {
    component: TypographyComponent;
    variant: TypographyVariant;
    weight?: TypographyWeight;
    className?: string;
    text: string;
  };
  subtitle?: {
    component: TypographyComponent;
    variant: TypographyVariant;
    weight?: TypographyWeight;
    className?: string;
    text: string;
  };
  className?: string;
}

const TitleAndSubtitle = ({
  title,
  subtitle,
  className,
}: TitleAndSubtitleProps) => {
  return (
    <div
      className={`${
        subtitle ? "mb-8" : ""
      } flex flex-col items-start p-0 ${className}`}
    >
      <Typography
        component={title.component}
        variant={title.variant}
        weight={title.weight}
        className={title.className}
      >
        {title.text}
      </Typography>
      {subtitle && (
        <Typography
          component={subtitle.component}
          variant={subtitle.variant}
          weight={subtitle.weight}
          className={subtitle.className}
        >
          {subtitle.text}
        </Typography>
      )}
    </div>
  );
};

export default TitleAndSubtitle;
