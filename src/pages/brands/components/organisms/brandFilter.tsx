import { useState } from "react";

import Button from "@/shared/components/atoms/button";
import Input from "@/shared/components/atoms/input";
import { Label } from "@/shared/components/atoms/lable";
import { Typography } from "@/shared/components/atoms/Typography";
import ButtonWithIcon from "@/shared/components/molecules/buttonWithIcon";
import PopoverWrapper from "@/shared/components/molecules/popoverWrapper";
import { SelectField } from "@/shared/components/molecules/selectDropdown";

import type { IBrand } from "@/pages/brands/type/brandMaster";
import { MOCK_BRANDS } from "@/shared/constants/brandMaster.constant";

interface BrandFilterProps {
  data: IBrand[];
  onFilterChange: (filtered: IBrand[]) => void;
}

const initialFilters = {
  name: "",
  code: "",
  country: "",
  status: "all" as "all" | "active" | "inactive",
};

function BrandFilter({ data, onFilterChange }: BrandFilterProps) {
  const [filters, setFilters] = useState(initialFilters);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const updateFilter = (
    field: keyof typeof initialFilters,
    value: string | typeof initialFilters.status
  ) => {
    setFilters((previous) => ({ ...previous, [field]: value }));
  };

  const applyFilters = () => {
    const filtered = data.filter((row) => {
      const matchesName = filters.name
        ? row.name.toLowerCase().includes(filters.name.toLowerCase())
        : true;
      const matchesCode = filters.code
        ? row.code.toLowerCase().includes(filters.code.toLowerCase())
        : true;
      const matchesCountry = filters.country
        ? (row.country ?? "")
            .toLowerCase()
            .includes(filters.country.toLowerCase())
        : true;
      const matchesStatus =
        filters.status === "all"
          ? true
          : filters.status === "active"
          ? row.isActive
          : !row.isActive;

      return matchesName && matchesCode && matchesCountry && matchesStatus;
    });

    onFilterChange(filtered);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    onFilterChange(MOCK_BRANDS);
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
      <div className="space-y-1">
        <Typography
          component="h2"
          variant="xl"
          weight="semiBold"
          className="text-foreground"
        >
          Filter Brands
        </Typography>
        <Typography
          component="p"
          variant="sm"
          className="text-muted-foreground"
        >
          Refine your search results by specifying criteria.
        </Typography>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="brand-filter-name">Name</Label>
          <Input
            id="brand-filter-name"
            placeholder="e.g. Apple"
            value={filters.name}
            onChange={(event) => updateFilter("name", event.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="brand-filter-code">Code</Label>
          <Input
            id="brand-filter-code"
            placeholder="e.g. APL"
            value={filters.code}
            onChange={(event) => updateFilter("code", event.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="brand-filter-country">Country</Label>
          <Input
            id="brand-filter-country"
            placeholder="e.g. India"
            value={filters.country}
            onChange={(event) => updateFilter("country", event.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="brand-filter-status">Status</Label>
          <SelectField
            placeholder="All"
            options={[
              { label: "All", value: "all" },
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ]}
            value={filters.status}
            onChange={(value) =>
              updateFilter("status", value as typeof initialFilters.status)
            }
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
}

export default BrandFilter;
