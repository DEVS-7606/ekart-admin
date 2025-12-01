import * as React from "react";
import { cn } from "@/lib/utils";
import type { ButtonProps } from "../shadcn/button";
import Button from "../atoms/button";
import {
  ArrowLeft,
  Funnel,
  Settings,
  Upload,
  User,
  X,
  Plus,
  Download,
} from "lucide-react";

const iconsMap = {
  user: User,
  setting: Settings,
  arrowleft: ArrowLeft,
  filter: Funnel,
  upload: Upload,
  remove: X,
  plus: Plus,
  download: Download,
} as const;

type IconName = keyof typeof iconsMap;

interface ButtonWithIconProps extends Omit<ButtonProps, "children"> {
  iconName?: IconName;
  iconPosition?: "left" | "right";
  iconClassName?: string;
  label?: React.ReactNode;
  width?: string;
  height?: string;
}

const ButtonWithIcon = ({
  iconName,
  iconPosition = "left",
  iconClassName,
  className,
  label,
  width,
  height,
  ...props
}: ButtonWithIconProps) => {
  const IconComponent = iconName ? iconsMap[iconName] : undefined;
  const hasLabel = Boolean(label);

  return (
    <Button
      className={`items-center justify-center
        ${hasLabel && IconComponent ? "gap-2" : ""} 
        ${className}`}
      {...props}
    >
      {IconComponent && iconPosition === "left" ? (
        <IconComponent
          className={cn("shrink-0", `!w-${width} !h-${height}`, iconClassName)}
        />
      ) : null}

      {hasLabel && label}

      {IconComponent && iconPosition === "right" ? (
        <IconComponent
          className={cn("shrink-0", `!w-${width} !h-${height}`, iconClassName)}
        />
      ) : null}
    </Button>
  );
};

export default ButtonWithIcon;
export { iconsMap };
export type { ButtonWithIconProps, IconName };
