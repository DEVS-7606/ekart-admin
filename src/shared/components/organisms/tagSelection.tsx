import { useEffect, useState } from "react";
import BadgeWithClose from "@/shared/components/molecules/badgeWithClose";
import {
  Typography,
  type TypographyProps,
} from "@/shared/components/atoms/Typography";
import { Checkbox } from "@/shared/components/atoms/checkbox";
import SearchAutocomplete from "./searchAutocomplete";
import type { ITag } from "@/shared/types";

interface TagSelectionProps {
  options: ITag[];
  placeholder?: string;
  label?: {
    label: string;
    component: TypographyProps["component"];
    className?: string;
    variant?: TypographyProps["variant"];
    weight?: TypographyProps["weight"];
  };
  className?: string;
  defaultValue?: ITag[];
  attachedTagsClassName?: string;
  needAttachmentLabel?: boolean;
  onChange?: (selectedTags: ITag[]) => void;
}

const TagSelection = ({
  options,
  placeholder = "Search to attach",
  label = { label: "Labels Attachments", component: "h3" },
  className,
  defaultValue = [],
  attachedTagsClassName,
  needAttachmentLabel = true,
  onChange,
}: TagSelectionProps) => {
  const [selectedTags, setSelectedTags] = useState<ITag[]>(defaultValue);
  const [selectedTag, setSelectedTag] = useState<ITag | null>(null);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setSelectedTags(defaultValue);
  }, [defaultValue]);

  const availableTagLabels = options.map((o) => o.name);

  const convertValueToString = (value: ITag["values"]): string => {
    return Array.isArray(value) ? value.join(",") : String(value);
  };

  const formatValueForDisplay = (value: ITag["values"]): string => {
    return Array.isArray(value) ? value.join(", ") : String(value);
  };

  const getValueOptions = (tag: ITag): string[] => {
    return Array.isArray(tag.values)
      ? tag.values.map(String)
      : [String(tag.values)];
  };

  const handleTagLabelSelect = (tagName: string) => {
    const tag = options.find((t) => t.name === tagName);
    if (!tag) return;

    setErrorMessage("");
    setSelectedTag(tag);
    setSelectedValues([]);
  };

  const handleCheckboxToggle = (value: string, checked: boolean) => {
    if (!selectedTag) return;

    setSelectedValues((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const createTag = (values: string | string[]): ITag => {
    return { ...selectedTag!, values };
  };

  const isTagDuplicate = (tag: ITag): boolean => {
    return selectedTags.some((existingTag) => {
      return (
        existingTag.name === tag.name &&
        convertValueToString(existingTag.values) ===
          convertValueToString(tag.values)
      );
    });
  };

  const showDuplicateError = (tag: ITag) => {
    const displayValue = formatValueForDisplay(tag.values);
    setErrorMessage(`"${tag.name}: ${displayValue}" is already added`);
  };

  const addTag = (tag: ITag) => {
    if (isTagDuplicate(tag)) {
      showDuplicateError(tag);
      return;
    }

    setErrorMessage("");
    setSelectedTags((prev) => {
      const next = [...prev, tag];
      if (onChange) onChange(next);
      return next;
    });
  };

  const handleRadioSelect = (value: string) => {
    if (!selectedTag) return;
    addTag(createTag(value));
    resetSelection();
  };

  const handleAddMultiSelectChip = () => {
    if (!selectedTag || selectedValues.length === 0) return;
    addTag(createTag(selectedValues));
    resetSelection();
  };

  const removeTag = (tagToRemove: ITag) => {
    setSelectedTags((prev) => {
      const next = prev.filter((tag) => {
        const isSameTag =
          tag.name === tagToRemove.name &&
          convertValueToString(tag.values) ===
            convertValueToString(tagToRemove.values);
        return !isSameTag;
      });

      if (onChange) onChange(next);
      return next;
    });
  };

  const resetSelection = () => {
    setSelectedTag(null);
    setSelectedValues([]);
  };

  const renderValueOption = (value: string, isMultiSelect: boolean) => {
    const labelClass =
      "flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1.5 rounded";

    if (isMultiSelect) {
      return (
        <label key={value} className={labelClass}>
          <Checkbox
            checked={selectedValues.includes(value)}
            onCheckedChange={(checked) =>
              handleCheckboxToggle(value, checked as boolean)
            }
          />
          <span className="text-sm text-slate-700">{value}</span>
        </label>
      );
    }

    return (
      <label key={value} className={labelClass}>
        <input
          type="radio"
          name="tag-value"
          value={value}
          onChange={() => handleRadioSelect(value)}
          className="text-blue-600 hidden cursor-pointer"
        />
        <span className="text-sm text-slate-700">{value}</span>
      </label>
    );
  };

  const renderHeader = () => (
    <>
      <Typography
        component={label.component}
        className={`text-base font-semibold text-foreground ${label.className}`}
        variant={label.variant}
        weight={label.weight}
      >
        {label.label}
      </Typography>
      <Typography component="p" className="text-sm text-muted-foreground mb-3">
        Attach labels as key-value pairs to this template.
      </Typography>
    </>
  );

  const renderSearchInput = () => (
    <div>
      <SearchAutocomplete
        items={availableTagLabels}
        onSelect={handleTagLabelSelect}
        placeholder={placeholder}
      />
      {errorMessage && (
        <Typography component="p" className="text-sm text-red-600 mt-1">
          {errorMessage}
        </Typography>
      )}
    </div>
  );

  const renderValueSelection = () => {
    if (!selectedTag) return null;

    return (
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <BadgeWithClose
            label={selectedTag.name}
            onDelete={resetSelection}
            className="bg-blue-100 border-blue-300 text-blue-700"
          />

          <div className="flex-1 border rounded-md p-3 bg-white">
            <Typography component="p" className="text-xs text-slate-500 mb-2">
              {selectedTag.isMultiSelect
                ? "Select one or more values"
                : "Select a value"}
            </Typography>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {getValueOptions(selectedTag).map((value) =>
                renderValueOption(value, selectedTag.isMultiSelect)
              )}
            </div>
          </div>
        </div>

        {selectedTag.isMultiSelect && selectedValues.length > 0 && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAddMultiSelectChip}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Label ({selectedValues.length} selected)
            </button>
            <button
              type="button"
              onClick={resetSelection}
              className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderAttachedTags = () => (
    <div className={`${attachedTagsClassName || ""}`}>
      {needAttachmentLabel && (
        <Typography
          component="h4"
          className="text-sm font-semibold mb-2 text-slate-700"
        >
          Attached Labels
        </Typography>
      )}
      <div className="flex flex-wrap gap-2">
        {selectedTags.length === 0 ? (
          <Typography component="span" className="text-sm text-slate-500">
            No labels attached
          </Typography>
        ) : (
          selectedTags.map((tag, index) => (
            <BadgeWithClose
              key={index}
              label={`${tag.name}: ${formatValueForDisplay(tag.values)}`}
              onDelete={() => removeTag(tag)}
              className="bg-gray-100 border-gray-300 text-gray-700"
            />
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className={`w-full ${className ?? ""}`}>
      {renderHeader()}
      <div className="mb-4 space-y-3">
        {!selectedTag && renderSearchInput()}
        {renderValueSelection()}
      </div>
      {renderAttachedTags()}
    </div>
  );
};

export default TagSelection;
