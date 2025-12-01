import type { CSSProperties, ReactNode } from "react";

export type TypographyFontFamily = "primary" | "secondary";

export type TypographyVariant =
  | "caption"
  | "xs"
  | "sm"
  | "med"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "2.5xl"
  | "3xl"
  | "3.5xl"
  | "4xl"
  | "5xl"
  | "7xl"
  | "1.75xl";

export type TypographyWeight = "regular" | "medium" | "semiBold" | "bold";

export type TypographyComponent =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span";

export interface TypographyProps {
  component?: TypographyComponent;
  fontFamily?: TypographyFontFamily;
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  children?: ReactNode;
  className?: string;
  title?: string;
  "data-testid"?: string;
  style?: CSSProperties;
  dangerouslySetInnerHTML?: { __html: string };
}

const variantClassNames: Record<TypographyVariant, string> = {
  caption: "text-xs uppercase",
  xs: "text-xs",
  sm: "text-sm",
  med: "text-med",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "2.5xl": "text-2.5xl",
  "3xl": "text-3xl",
  "3.5xl": "text-3.5xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "7xl": "text-7xl",
  "1.75xl": "text-1.75xl",
};

const weightClassNames: Record<TypographyWeight, string> = {
  regular: "font-normal",
  medium: "font-medium",
  semiBold: "font-semibold",
  bold: "font-bold",
};

const fontFamilyClassNames: Record<TypographyFontFamily, string> = {
  primary: "font-primary",
  secondary: "font-secondary",
};

export const Typography = ({
  component: Component = "span",
  variant = "base",
  weight = "regular",
  fontFamily = "primary",
  children,
  className = "",
  dangerouslySetInnerHTML,
  ...props
}: TypographyProps) => {
  const variantClassName = variantClassNames[variant];
  const weightClassName = weightClassNames[weight];
  const fontFamilyClassName = fontFamilyClassNames[fontFamily];

  const combinedClassName = [
    variantClassName,
    weightClassName,
    fontFamilyClassName,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (dangerouslySetInnerHTML) {
    return (
      <Component
        className={combinedClassName}
        dangerouslySetInnerHTML={dangerouslySetInnerHTML}
        {...props}
      />
    );
  }

  return (
    <Component className={combinedClassName} {...props}>
      {children}
    </Component>
  );
};
