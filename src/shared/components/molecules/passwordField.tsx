import Input from "@/shared/components/atoms/input";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
  className?: string;
  withToggle?: boolean;
};

const PasswordField: React.FC<Props> = ({
  value,
  onChange,
  disabled,
  error,
  placeholder = "Enter your password",
  className,
  withToggle = false,
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className={cn("space-y-1", className)}>
      <div className="relative">
        <Input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            "border-input focus:border-primary focus:ring-1 focus:ring-primary",
            withToggle ? "pr-10" : undefined
          )}
        />
        {withToggle && (
          <button
            type="button"
            aria-label={show ? "Hide password" : "Show password"}
            onClick={() => setShow((s) => !s)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-primary hover:underline disabled:opacity-50"
            disabled={disabled}
          >
            {show ? "Hide" : "Show"}
          </button>
        )}
      </div>
      {error ? <p className="text-destructive text-sm mt-1">{error}</p> : null}
    </div>
  );
};

export default PasswordField;
