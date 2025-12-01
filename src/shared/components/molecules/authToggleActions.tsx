import Button from "@/shared/components/atoms/button";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  mode: "password" | "otp";
  onToggleMode: () => void;
  onRightAction: () => void;
  rightLabel?: string;
  className?: string;
};

const AuthToggleActions: React.FC<Props> = ({
  mode,
  onToggleMode,
  onRightAction,
  rightLabel,
  className,
}) => {
  return (
    <div className={cn("flex items-center justify-between -mt-2", className)}>
      <Button
        type="button"
        onClick={onToggleMode}
        variant={"link"}
        className="text-primary px-0 text-sm font-medium hover:underline"
      >
        {mode === "password" ? "Sign in using OTP" : "Sign in using password"}
      </Button>
      <Button
        type="button"
        onClick={onRightAction}
        variant={"link"}
        className="text-primary px-0 text-sm font-medium hover:underline"
      >
        {rightLabel ??
          (mode === "password" ? "Forgot password?" : "Resend OTP")}
      </Button>
    </div>
  );
};

export default AuthToggleActions;
