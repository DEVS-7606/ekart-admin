import { useState } from "react";

import Button from "@/shared/components/atoms/button";
import Input from "@/shared/components/atoms/input";
import { Label } from "@/shared/components/atoms/lable";
import { Typography } from "@/shared/components/atoms/Typography";
import ButtonWithIcon from "@/shared/components/molecules/buttonWithIcon";
import PopoverWrapper from "@/shared/components/molecules/popoverWrapper";
import { SelectField } from "@/shared/components/molecules/selectDropdown";

import type { ICustomerGroup } from "@/pages/customer-groups/type/customerGroupMaster";
import { MOCK_CUSTOMER_GROUPS } from "@/shared/constants/customerGroupMaster.constant";

interface CustomerGroupFilterProps {
  data: ICustomerGroup[];
  onFilterChange: (filtered: ICustomerGroup[]) => void;
}

const initialFilters = {
  name: "",
  code: "",
  groupType: "",
  status: "all" as "all" | "active" | "inactive",
  isDefault: "all" as "all" | "yes" | "no",
};

function CustomerGroupFilter({
  data,
  onFilterChange,
}: CustomerGroupFilterProps) {
  const [filters, setFilters] = useState(initialFilters);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const updateFilter = (
    field: keyof typeof initialFilters,
    value:
      | string
      | typeof initialFilters.status
      | typeof initialFilters.isDefault
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
      const matchesGroupType = filters.groupType
        ? (row.groupType ?? "")
            .toLowerCase()
            .includes(filters.groupType.toLowerCase())
        : true;
      const matchesStatus =
        filters.status === "all"
          ? true
          : filters.status === "active"
          ? row.isActive
          : !row.isActive;
      const matchesDefault =
        filters.isDefault === "all"
          ? true
          : filters.isDefault === "yes"
          ? !!row.isDefault
          : !row.isDefault;

      return (
        matchesName &&
        matchesCode &&
        matchesGroupType &&
        matchesStatus &&
        matchesDefault
      );
    });

    onFilterChange(filtered);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    onFilterChange(MOCK_CUSTOMER_GROUPS);
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
          Filter Customer Groups
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
          <Label htmlFor="customer-group-filter-name">Name</Label>
          <Input
            id="customer-group-filter-name"
            placeholder="e.g. Retail Customers"
            value={filters.name}
            onChange={(event) => updateFilter("name", event.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="customer-group-filter-code">Code</Label>
          <Input
            id="customer-group-filter-code"
            placeholder="e.g. RET"
            value={filters.code}
            onChange={(event) => updateFilter("code", event.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="customer-group-filter-type">Group Type</Label>
          <Input
            id="customer-group-filter-type"
            placeholder="e.g. Wholesale"
            value={filters.groupType}
            onChange={(event) => updateFilter("groupType", event.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="customer-group-filter-status">Status</Label>
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

        <div className="space-y-1">
          <Label htmlFor="customer-group-filter-default">Default Group</Label>
          <SelectField
            placeholder="All"
            options={[
              { label: "All", value: "all" },
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
            value={filters.isDefault}
            onChange={(value) =>
              updateFilter(
                "isDefault",
                value as typeof initialFilters.isDefault
              )
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

export default CustomerGroupFilter;
