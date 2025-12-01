import React from "react";
import { Input as InputShadcn } from "@/shared/components/shadcn/input";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof InputShadcn>
>(({ className, ...props }, ref) => (
  <InputShadcn ref={ref} className={cn("h-10", className)} {...props} />
));

Input.displayName = "InputAtom";

export default Input;
