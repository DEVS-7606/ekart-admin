import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../atoms/select";

type SelectFieldProps = {
  /** Label for the dropdown group */
  label?: string;

  /** Placeholder text shown when no value is selected */
  placeholder?: string;

  /** Options array (each string or object with label/value) */
  options: string[] | { label: string; value: string }[];

  /** Controlled value */
  value?: string;

  /** Default value (for uncontrolled usage) */
  defaultValue?: string;

  /** Callback when value changes */
  onChange?: (value: string) => void;

  /** Optional blur handler for validation */
  onBlur?: () => void;

  /** Whether dropdown is disabled */
  disabled?: boolean;

  /** Optional custom classes for styling */
  className?: string;
};

/**
 * SelectField Molecule
 * Combines Select atom + logic for flexible use across app
 */
export const SelectField = ({
  label,
  placeholder = "Select an option",
  options,
  value,
  defaultValue,
  onChange,
  onBlur,
  disabled = false,
  className = "",
}: SelectFieldProps) => {
  // Handle controlled/uncontrolled state
  const [internalValue, setInternalValue] = useState(defaultValue || "");

  const currentValue = value ?? internalValue;

  const handleValueChange = (val: string) => {
    if (!value) setInternalValue(val); // only update if uncontrolled
    onChange?.(val);
  };

  // normalize options
  const normalizedOptions =
    typeof options[0] === "string"
      ? (options as string[]).map((opt) => ({ label: opt, value: opt }))
      : (options as { label: string; value: string }[]);

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <Select
        value={currentValue}
        onValueChange={handleValueChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-full" onBlur={onBlur}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent className="max-h-64 overflow-y-auto">
          <SelectGroup>
            {label && <SelectLabel>{label}</SelectLabel>}
            {normalizedOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
