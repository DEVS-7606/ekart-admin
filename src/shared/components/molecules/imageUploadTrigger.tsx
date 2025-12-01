import React from "react";
import ButtonWithIcon from "./buttonWithIcon";
import type { ButtonWithIconProps } from "./buttonWithIcon";

interface ImageUploadTriggerProps extends Omit<ButtonWithIconProps, "label"> {
  onClick: () => void;
  label?: React.ReactNode;
  className?: string;
  buttonClassName?: string;
}

const ImageUploadTrigger: React.FC<ImageUploadTriggerProps> = ({
  onClick,
  label = "upload",
  className = "",
  buttonClassName = "",
  iconName = "upload",
  iconPosition = "left",
  width = "5",
  height = "5",
  ...props
}) => {
  return (
    <div className={className}>
      <ButtonWithIcon
        onClick={onClick}
        variant="outline"
        iconName={iconName}
        iconPosition={iconPosition}
        label={label}
        width={width}
        height={height}
        className={buttonClassName}
        {...props}
      />
    </div>
  );
};

export default ImageUploadTrigger;
