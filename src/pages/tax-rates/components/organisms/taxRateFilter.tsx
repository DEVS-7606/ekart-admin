import { useState } from "react";

import Button from "@/shared/components/atoms/button";
import Input from "@/shared/components/atoms/input";
import { Label } from "@/shared/components/atoms/lable";
import { Typography } from "@/shared/components/atoms/Typography";
import ButtonWithIcon from "@/shared/components/molecules/buttonWithIcon";
import PopoverWrapper from "@/shared/components/molecules/popoverWrapper";
import { SelectField } from "@/shared/components/molecules/selectDropdown";

import type { ITaxRate } from "@/pages/tax-rates/type/taxRateMaster";
import { MOCK_TAX_RATES } from "@/shared/constants/taxRateMaster.constant";

interface TaxRateFilterProps {
  data: ITaxRate[];
  onFilterChange: (filtered: ITaxRate[]) => void;
}

const initialFilters = {
  name: "",
  code: "",
  country: "",
  state: "",
  taxType: "",
  status: "all" as "all" | "active" | "inactive",
};

function TaxRateFilter({ data, onFilterChange }: TaxRateFilterProps) {
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
      const matchesState = filters.state
        ? (row.state ?? "").toLowerCase().includes(filters.state.toLowerCase())
        : true;
      const matchesTaxType = filters.taxType
        ? (row.taxType ?? "")
            .toLowerCase()
            .includes(filters.taxType.toLowerCase())
        : true;
      const matchesStatus =
        filters.status === "all"
          ? true
          : filters.status === "active"
          ? row.isActive
          : !row.isActive;

      return (
        matchesName &&
        matchesCode &&
        matchesCountry &&
        matchesState &&
        matchesTaxType &&
        matchesStatus
      );
    });

    onFilterChange(filtered);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    onFilterChange(MOCK_TAX_RATES);
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
          Filter Tax Rates
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
          <Label htmlFor="tax-filter-name">Name</Label>
          <Input
            id="tax-filter-name"
            placeholder="e.g. India GST Standard"
            value={filters.name}
            onChange={(event) => updateFilter("name", event.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="tax-filter-code">Code</Label>
          <Input
            id="tax-filter-code"
            placeholder="e.g. IN-GST-STD"
            value={filters.code}
            onChange={(event) => updateFilter("code", event.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="tax-filter-country">Country</Label>
          <Input
            id="tax-filter-country"
            placeholder="e.g. India"
            value={filters.country}
            onChange={(event) => updateFilter("country", event.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="tax-filter-state">State</Label>
          <Input
            id="tax-filter-state"
            placeholder="e.g. Gujarat"
            value={filters.state}
            onChange={(event) => updateFilter("state", event.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="tax-filter-type">Tax Type</Label>
          <Input
            id="tax-filter-type"
            placeholder="e.g. GST, VAT"
            value={filters.taxType}
            onChange={(event) => updateFilter("taxType", event.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="tax-filter-status">Status</Label>
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

export default TaxRateFilter;
