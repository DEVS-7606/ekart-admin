import { useMemo, useRef, useState } from "react";
import Button from "@/shared/components/atoms/button";
import ButtonWithIcon from "@/shared/components/molecules/buttonWithIcon";
import PopoverWrapper from "@/shared/components/molecules/popoverWrapper";
import Input from "@/shared/components/atoms/input";
import { Label } from "@/shared/components/atoms/lable";
import TitleAndSubtitle from "@/shared/components/molecules/titleAndSubtitle";
import TagSelection from "@/shared/components/organisms/tagSelection";
import type { ITag } from "@/pages/tags-master/type/tagMaster";
import type { AlarmRow } from "@/shared/types/alarmMaster";

interface AlarmFilterProps {
  data: AlarmRow[];
  initialData: AlarmRow[];
  onFilterChange: (rows: AlarmRow[]) => void;
  onFilterAppliedChange?: (applied: boolean) => void;
}

const initialFilters = {
  name: "",
};

const AlarmFilter = ({
  data,
  initialData,
  onFilterChange,
  onFilterAppliedChange,
}: AlarmFilterProps) => {
  const [filters, setFilters] = useState(initialFilters);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const selectedTagsRef = useRef<ITag[]>([]);
  const [appliedTags, setAppliedTags] = useState<ITag[]>([]);

  const tagOptions = useMemo<ITag[]>(() => {
    const labelValuesMap = new Map<string, Set<string>>();

    initialData.forEach((row) => {
      row.tags?.forEach((tag) => {
        if (!labelValuesMap.has(tag.label)) {
          labelValuesMap.set(tag.label, new Set());
        }
        labelValuesMap.get(tag.label)!.add(tag.value);
      });
    });

    return Array.from(labelValuesMap.entries()).map(([label, valuesSet]) => ({
      name: label,
      code: label,
      datatype: "string[]",
      isMultiSelect: true,
      description: undefined,
      values: Array.from(valuesSet),
    }));
  }, [initialData]);

  const updateFilter = (field: keyof typeof initialFilters, value: string) => {
    setFilters((previous) => ({ ...previous, [field]: value }));
  };

  const applyFilters = () => {
    const selectedTags = selectedTagsRef.current;
    const hasNameFilter = filters.name.trim() !== "";
    const hasTagFilters = selectedTags.length > 0;
    const isApplied = hasNameFilter || hasTagFilters;

    const filtered = data.filter((row) => {
      const matchesName = filters.name
        ? row.name.toLowerCase().includes(filters.name.toLowerCase())
        : true;

      const matchesTags =
        selectedTags.length > 0
          ? selectedTags.every((filterTag) => {
              const valuesArray = Array.isArray(filterTag.values)
                ? filterTag.values.map(String)
                : [String(filterTag.values)];

              return valuesArray.some((val) =>
                row.tags.some(
                  (tag) => tag.label === filterTag.name && tag.value === val
                )
              );
            })
          : true;

      return matchesName && matchesTags;
    });

    onFilterChange(isApplied ? filtered : initialData);
    setAppliedTags(selectedTags);
    if (onFilterAppliedChange) {
      onFilterAppliedChange(isApplied);
    }
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    selectedTagsRef.current = [];
    setAppliedTags([]);
    onFilterChange(initialData);
    if (onFilterAppliedChange) {
      onFilterAppliedChange(false);
    }
  };

  return (
    <PopoverWrapper
      trigger={
        <ButtonWithIcon
          size="sm"
          variant="outline"
          iconName="filter"
          label="Filters"
        />
      }
      contentClassName="w-[420px] p-6 space-y-6"
      open={isFilterOpen}
      onOpenChange={setIsFilterOpen}
    >
      <TitleAndSubtitle
        title={{
          component: "h2",
          variant: "xl",
          weight: "semiBold",
          text: "Filter Alarm Templates",
        }}
        subtitle={{
          component: "p",
          variant: "sm",
          text: "Refine your alarm templates by name and attached tags.",
        }}
      />

      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="alarm-filter-name">Name</Label>
          <Input
            id="alarm-filter-name"
            placeholder="e.g., Motor RPM"
            value={filters.name}
            onChange={(event) => updateFilter("name", event.target.value)}
          />
        </div>

        <div className="space-y-1">
          <TagSelection
            options={tagOptions}
            placeholder="Search and filter by attached labels"
            defaultValue={appliedTags}
            onChange={(selectedTags) => {
              selectedTagsRef.current = selectedTags;
            }}
            attachedTagsClassName="max-w-80"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFilterOpen(false)}
        >
          Cancel
        </Button>
        <Button variant="outline" size="sm" onClick={resetFilters}>
          Reset
        </Button>
        <Button size="sm" onClick={applyFilters}>
          Apply Filters
        </Button>
      </div>
    </PopoverWrapper>
  );
};

export default AlarmFilter;
