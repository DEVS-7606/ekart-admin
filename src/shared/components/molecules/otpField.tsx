import Input from "@/shared/components/atoms/input";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  maxLength?: number;
  placeholder?: string;
  className?: string;
};

const OtpField: React.FC<Props> = ({
  value,
  onChange,
  disabled,
  error,
  maxLength = 6,
  placeholder = "Enter OTP",
  className,
}) => {
  return (
    <div className={cn("space-y-1", className)}>
      <Input
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className="border-input focus:border-primary focus:ring-1 focus:ring-primary"
        inputMode="numeric"
        maxLength={maxLength}
      />
      {error ? <p className="text-destructive text-sm mt-1">{error}</p> : null}
    </div>
  );
};

export default OtpField;
