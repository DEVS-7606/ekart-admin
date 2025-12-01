import React, { useRef, useState } from "react";
import ImageUploadTrigger from "@/shared/components/molecules/imageUploadTrigger";
import ImagePreviewBox from "@/shared/components/molecules/imagePreviewBox";
import Input from "../atoms/input";

interface SingleImageUploadProps {
  buttonLabel?: string;
  onChange?: (file: File | null, previewUrl: string | null) => void;
  className?: string;
  buttonClassName?: string;
}

const SingleImageUpload: React.FC<SingleImageUploadProps> = ({
  buttonLabel = "upload",
  onChange,
  className = "",
  buttonClassName = ""
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleClick = () => inputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      onChange?.(file, url);
    } else {
      setPreviewUrl(null);
      onChange?.(null, null);
    }
  };

  const handleRemove = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onChange?.(null, null);
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <ImageUploadTrigger onClick={handleClick} label={buttonLabel} iconName="upload" buttonClassName={buttonClassName} />
      <ImagePreviewBox 
        src={previewUrl ?? undefined} 
        size={72} 
        onRemove={previewUrl ? handleRemove : undefined}
      />
    </div>
  );
};

export default SingleImageUpload;
