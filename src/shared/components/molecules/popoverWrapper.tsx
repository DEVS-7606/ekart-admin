import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/shared/components/atoms/popover";

interface PopoverWrapperProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  triggerClassName?: string;
  contentClassName?: string;
  sideOffset?: number;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const PopoverWrapper = ({
  trigger,
  children,
  triggerClassName,
  contentClassName,
  sideOffset = 4,
  align = "center",
  side = "bottom",
  open,
  onOpenChange,
  ...props
}: PopoverWrapperProps) => {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild className={triggerClassName}>
        {trigger}
      </PopoverTrigger>
      <PopoverContent
        side={side}
        sideOffset={sideOffset}
        align={align}
        className={cn("w-auto min-w-fit max-w-sm", contentClassName)}
        {...props}
      >
        {children}
      </PopoverContent>
    </Popover>
  );
};

export default PopoverWrapper;
