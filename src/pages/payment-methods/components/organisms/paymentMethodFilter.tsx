import { useState } from "react";

import Button from "@/shared/components/atoms/button";
import Input from "@/shared/components/atoms/input";
import { Label } from "@/shared/components/atoms/lable";
import { Typography } from "@/shared/components/atoms/Typography";
import ButtonWithIcon from "@/shared/components/molecules/buttonWithIcon";
import PopoverWrapper from "@/shared/components/molecules/popoverWrapper";
import { SelectField } from "@/shared/components/molecules/selectDropdown";

import type { IPaymentMethod } from "@/pages/payment-methods/type/paymentMethodMaster";
import { MOCK_PAYMENT_METHODS } from "@/shared/constants/paymentMethodMaster.constant";

interface PaymentMethodFilterProps {
  data: IPaymentMethod[];
  onFilterChange: (filtered: IPaymentMethod[]) => void;
}

const initialFilters = {
  name: "",
  code: "",
  methodType: "",
  provider: "",
  status: "all" as "all" | "active" | "inactive",
  online: "all" as "all" | "yes" | "no",
  cod: "all" as "all" | "yes" | "no",
};

function PaymentMethodFilter({
  data,
  onFilterChange,
}: PaymentMethodFilterProps) {
  const [filters, setFilters] = useState(initialFilters);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const updateFilter = (
    field: keyof typeof initialFilters,
    value:
      | string
      | typeof initialFilters.status
      | typeof initialFilters.online
      | typeof initialFilters.cod
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
      const matchesType = filters.methodType
        ? row.methodType
            .toLowerCase()
            .includes(filters.methodType.toLowerCase())
        : true;
      const matchesProvider = filters.provider
        ? (row.provider ?? "")
            .toLowerCase()
            .includes(filters.provider.toLowerCase())
        : true;
      const matchesStatus =
        filters.status === "all"
          ? true
          : filters.status === "active"
          ? row.isActive
          : !row.isActive;
      const matchesOnline =
        filters.online === "all"
          ? true
          : filters.online === "yes"
          ? row.supportsOnline
          : !row.supportsOnline;
      const matchesCod =
        filters.cod === "all"
          ? true
          : filters.cod === "yes"
          ? row.supportsCod
          : !row.supportsCod;

      return (
        matchesName &&
        matchesCode &&
        matchesType &&
        matchesProvider &&
        matchesStatus &&
        matchesOnline &&
        matchesCod
      );
    });

    onFilterChange(filtered);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    onFilterChange(MOCK_PAYMENT_METHODS);
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
          Filter Payment Methods
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
          <Label htmlFor="payment-filter-name">Name</Label>
          <Input
            id="payment-filter-name"
            placeholder="e.g. UPI via Razorpay"
            value={filters.name}
            onChange={(event) => updateFilter("name", event.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="payment-filter-code">Code</Label>
          <Input
            id="payment-filter-code"
            placeholder="e.g. UPI-RPAY"
            value={filters.code}
            onChange={(event) => updateFilter("code", event.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="payment-filter-type">Method Type</Label>
          <Input
            id="payment-filter-type"
            placeholder="e.g. UPI, Card, COD"
            value={filters.methodType}
            onChange={(event) => updateFilter("methodType", event.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="payment-filter-provider">Provider</Label>
          <Input
            id="payment-filter-provider"
            placeholder="e.g. Razorpay"
            value={filters.provider}
            onChange={(event) => updateFilter("provider", event.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="payment-filter-status">Status</Label>
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
          <Label htmlFor="payment-filter-online">Online Supported</Label>
          <SelectField
            placeholder="All"
            options={[
              { label: "All", value: "all" },
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
            value={filters.online}
            onChange={(value) =>
              updateFilter("online", value as typeof initialFilters.online)
            }
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="payment-filter-cod">COD Supported</Label>
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

export default PaymentMethodFilter;
