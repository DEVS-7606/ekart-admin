import { useState } from "react";
import { Check, X, Pencil } from "lucide-react";
import Button from "@/shared/components/atoms/button";
import Input from "@/shared/components/atoms/input";

interface EditableFieldProps {
  value: string;
  onSave: (newValue: string) => void;
  placeholder?: string;
  className?: string;
}

export const EditableField: React.FC<EditableFieldProps> = ({
  value,
  onSave,
  placeholder = "Enter value",
  className,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleSave = () => {
    onSave(tempValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={`flex items-center gap-2 ${className ?? ""}`}>
        <Input
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder={placeholder}
        />
        <Button size="icon" variant="ghost" onClick={handleSave} title="Save">
          <Check className="h-4 w-4 text-green-600" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={handleCancel}
          title="Cancel"
        >
          <X className="h-4 w-4 text-red-600" />
        </Button>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-2 cursor-pointer group ${
        className ?? ""
      }`}
      onClick={() => setIsEditing(true)}
    >
      <span className="truncate">
        {value || <span className="text-gray-400">{placeholder}</span>}
      </span>
      <Pencil className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition" />
    </div>
  );
};
