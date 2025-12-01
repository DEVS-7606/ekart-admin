import {
  Select as ShadcnSelect,
  SelectTrigger as ShadcnSelectTrigger,
  SelectValue as ShadcnSelectValue,
  SelectContent as ShadcnSelectContent,
  SelectItem as ShadcnSelectItem,
  SelectGroup as ShadcnSelectGroup,
  SelectLabel as ShadcnSelectLabel,
  SelectSeparator as ShadcnSelectSeparator,
  SelectScrollDownButton as ShadcnSelectScrollDownButton,
  SelectScrollUpButton as ShadcnSelectScrollUpButton,
} from "@/shared/components/shadcn/select";
import { cn } from "@/lib/utils";

export const Select = ShadcnSelect;
export const SelectValue = ShadcnSelectValue;
export const SelectContent = ShadcnSelectContent;
export const SelectItem = ShadcnSelectItem;
export const SelectGroup = ShadcnSelectGroup;
export const SelectLabel = ShadcnSelectLabel;
export const SelectSeparator = ShadcnSelectSeparator;
export const SelectScrollDownButton = ShadcnSelectScrollDownButton;
export const SelectScrollUpButton = ShadcnSelectScrollUpButton;

type AtomSelectTriggerProps = React.ComponentProps<typeof ShadcnSelectTrigger>;

export const SelectTrigger = ({
  className,
  style,
  ...props
}: AtomSelectTriggerProps) => {
  const shouldForceTall = className?.split(/\s+/).includes("h-12");

  const mergedStyle = shouldForceTall ? { height: "3rem", ...style } : style;

  return (
    <ShadcnSelectTrigger
      className={cn("data-[size=default]:h-10", className)}
      style={mergedStyle}
      {...props}
    />
  );
};
