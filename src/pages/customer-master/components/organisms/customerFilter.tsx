import { useState } from "react";
import Button from "@/shared/components/atoms/button";
import ButtonWithIcon from "@/shared/components/molecules/buttonWithIcon";
import PopoverWrapper from "@/shared/components/molecules/popoverWrapper";
import Input from "@/shared/components/atoms/input";
import { Label } from "@/shared/components/atoms/lable";
import { Typography } from "@/shared/components/atoms/Typography";
import { customerMasterMockData } from "@/shared/constants/customerMaster.constant";
import type { CustomerRow } from "@/pages/customer-master/type/customerMaster";

interface CustomerFilterProps {
  data: CustomerRow[];
  onFilterChange: (filtered: CustomerRow[]) => void;
}

const initialFilters = {
  name: "",
  code: "",
};

function CustomerFilter({ data, onFilterChange }: CustomerFilterProps) {
  const [filters, setFilters] = useState(initialFilters);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const updateFilter = (field: keyof typeof initialFilters, value: string) => {
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

      return matchesName && matchesCode;
    });

    onFilterChange(filtered);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    onFilterChange(customerMasterMockData);
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
        <Typography component="h2" variant="xl" weight="semiBold">
          Filter Customers
        </Typography>
        <Typography component="p" variant="sm">
          Refine your search results by specifying criteria.
        </Typography>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="customer-filter-name">Name</Label>
          <Input
            id="customer-filter-name"
            placeholder="e.g., Ashish Gupta"
            value={filters.name}
            onChange={(event) => updateFilter("name", event.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="customer-filter-code">Code</Label>
          <Input
            id="customer-filter-code"
            placeholder="e.g., 001"
            value={filters.code}
            onChange={(event) => updateFilter("code", event.target.value)}
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

export default CustomerFilter;
