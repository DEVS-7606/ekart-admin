import { useState } from "react";

import Button from "@/shared/components/atoms/button";
import Input from "@/shared/components/atoms/input";
import { Label } from "@/shared/components/atoms/lable";
import { Typography } from "@/shared/components/atoms/Typography";
import ButtonWithIcon from "@/shared/components/molecules/buttonWithIcon";
import PopoverWrapper from "@/shared/components/molecules/popoverWrapper";
import { SelectField } from "@/shared/components/molecules/selectDropdown";

import type { IShippingMethod } from "@/pages/shipping-methods/type/shippingMethodMaster";
import { MOCK_SHIPPING_METHODS } from "@/shared/constants/shippingMethodMaster.constant";

interface ShippingMethodFilterProps {
  data: IShippingMethod[];
  onFilterChange: (filtered: IShippingMethod[]) => void;
}

const initialFilters = {
  name: "",
  code: "",
  carrier: "",
  zone: "",
  status: "all" as "all" | "active" | "inactive",
  cod: "all" as "all" | "yes" | "no",
};

function ShippingMethodFilter({
  data,
  onFilterChange,
}: ShippingMethodFilterProps) {
  const [filters, setFilters] = useState(initialFilters);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const updateFilter = (
    field: keyof typeof initialFilters,
    value: string | typeof initialFilters.status | typeof initialFilters.cod
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
      const matchesCarrier = filters.carrier
        ? (row.carrier ?? "")
            .toLowerCase()
            .includes(filters.carrier.toLowerCase())
        : true;
      const matchesZone = filters.zone
        ? (row.zone ?? "").toLowerCase().includes(filters.zone.toLowerCase())
        : true;
      const matchesStatus =
        filters.status === "all"
          ? true
          : filters.status === "active"
          ? row.isActive
          : !row.isActive;
      const matchesCod =
        filters.cod === "all"
          ? true
          : filters.cod === "yes"
          ? !!row.isCodSupported
          : !row.isCodSupported;

      return (
        matchesName &&
        matchesCode &&
        matchesCarrier &&
        matchesZone &&
        matchesStatus &&
        matchesCod
      );
    });

    onFilterChange(filtered);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    onFilterChange(MOCK_SHIPPING_METHODS);
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
          Filter Shipping Methods
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
          <Label htmlFor="shipping-filter-name">Name</Label>
          <Input
            id="shipping-filter-name"
            placeholder="e.g. Delhivery Standard"
            value={filters.name}
            onChange={(event) => updateFilter("name", event.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="shipping-filter-code">Code</Label>
          <Input
            id="shipping-filter-code"
            placeholder="e.g. STD-DELH"
            value={filters.code}
            onChange={(event) => updateFilter("code", event.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="shipping-filter-carrier">Carrier</Label>
          <Input
            id="shipping-filter-carrier"
            placeholder="e.g. Delhivery"
            value={filters.carrier}
            onChange={(event) => updateFilter("carrier", event.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="shipping-filter-zone">Zone</Label>
          <Input
            id="shipping-filter-zone"
            placeholder="e.g. National, Local, International"
            value={filters.zone}
            onChange={(event) => updateFilter("zone", event.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="shipping-filter-status">Status</Label>
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
          <Label htmlFor="shipping-filter-cod">COD Supported</Label>
          <SelectField
            placeholder="All"
            options={[
              { label: "All", value: "all" },
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
            value={filters.cod}
            onChange={(value) =>
              updateFilter("cod", value as typeof initialFilters.cod)
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

export default ShippingMethodFilter;
