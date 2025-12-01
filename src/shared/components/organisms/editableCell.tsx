import React from "react";
import { EditableField } from "@/shared/components/molecules/editableField";

interface EditableCellProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  className?: string;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  value,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <EditableField
      value={value}
      onSave={onChange}
      placeholder={placeholder}
      className={className}
    />
  );
};
