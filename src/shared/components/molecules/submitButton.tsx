import Button from "@/shared/components/atoms/button";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  isLoading?: boolean;
  labelIdle: string;
  labelLoading?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
};

const SubmitButton: React.FC<Props> = ({
  isLoading,
  labelIdle,
  labelLoading = "Loading...",
  className,
  type = "submit",
  onClick,
  disabled,
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      className={cn(
        "w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition rounded-md",
        className
      )}
      disabled={disabled || isLoading}
    >
      {isLoading ? labelLoading : labelIdle}
    </Button>
  );
};

export default SubmitButton;
