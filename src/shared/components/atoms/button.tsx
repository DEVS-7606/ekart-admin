import { cn } from "@/lib/utils";
import {
  Button as ButtonShadcn,
  type ButtonProps,
} from "@/shared/components/shadcn/button";

const Button = ({
  children,
  variant,
  size,
  asChild,
  className,
  ...props
}: ButtonProps) => {
  return (
    <ButtonShadcn
      variant={variant}
      size={size}
      asChild={asChild}
      className={cn("h-10", className)}
      {...props}
    >
      {children}
    </ButtonShadcn>
  );
};

export default Button;
