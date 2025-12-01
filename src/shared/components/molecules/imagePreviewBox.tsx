import React from "react";
import { Card } from "../atoms/card";
import ButtonWithIcon from "./buttonWithIcon";

interface ImagePreviewBoxProps {
  src?: string;
  alt?: string;
  size?: number; // square size in px
  className?: string;
  onRemove?: () => void;
}

const ImagePreviewBox: React.FC<ImagePreviewBoxProps> = ({
  src,
  alt = "preview",
  size = 72,
  className = "",
  onRemove,
}) => {
  return (
    <Card
      className={`relative flex items-center justify-center overflow-hidden border rounded-md bg-muted/20 ${className}`}
      style={{ width: size, height: size }}
    >
      {src ? (
        <>
          <img src={src} alt={alt} className="h-full w-full object-cover" />
          {onRemove && (
            <ButtonWithIcon
              variant="ghost"
              size="icon-sm"
              iconName="remove"
              onClick={onRemove}
              className="w-5 h-5 absolute top-0 right-0 p-0 bg-destructive hover:bg-destructive/90 text-destructive-foreground hover:text-destructive-foreground"
              aria-label="Remove image"
            />
          )}
        </>
      ) : (
        <div className="h-full w-full flex items-center justify-center text-muted-foreground text-xs">
          No Image
        </div>
      )}
    </Card>
  );
};

export default ImagePreviewBox;
