import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/shared/components/atoms/button";
import Input from "@/shared/components/atoms/input";
import { Typography } from "@/shared/components/atoms/Typography";
import PopoverWrapper from "@/shared/components/molecules/popoverWrapper";
import ButtonWithIcon from "@/shared/components/molecules/buttonWithIcon";
import { SelectField } from "@/shared/components/molecules/selectDropdown";
import type { User } from "@/pages/userMaster/components/organism/userDataTable";
import { matchesFilters } from "@/pages/userMaster/utils/userFilters";
import { MOCK_USERS } from "@/shared/constants/userMaster.constant";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/shared/components/atoms/form";

export type UserFilters = {
  role: "all" | string;
  customer: string;
};

interface UserMasterFilterPopoverProps {
  users: User[];
  onFiltersChange: (users: User[]) => void;
}

const UserMasterFilterPopover = ({
  users,
  onFiltersChange,
}: UserMasterFilterPopoverProps) => {
  const form = useForm<UserFilters>({
    defaultValues: {
      role: "all",
      customer: "",
    },
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filters = form.watch();

  const filteredUsers = useMemo(
    () => users.filter((user) => matchesFilters(user, filters)),
    [users, filters]
  );

  const handleReset = () => {
    const cleared: UserFilters = {
      role: "all",
      customer: "",
    };

    form.reset(cleared);
    onFiltersChange(MOCK_USERS);
  };

  const handleApply = () => {
    onFiltersChange(filteredUsers);
  };
  const renderTitle = () => {
    return (
      <Typography component="h3" variant="base" weight="semiBold">
        Filter User
      </Typography>
    );
  };

  const renderRoleFilter = () => {
    return (
      <FormField
        control={form.control}
        name="role"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Role</FormLabel>
            <SelectField
              options={[
                { label: "All", value: "all" },
                { label: "Admin", value: "Admin" },
                { label: "User", value: "User" },
              ]}
              value={field.value}
              onChange={(value) => field.onChange(value)}
              placeholder="All roles"
            />
          </FormItem>
        )}
      />
    );
  };

  const renderCancelButton = () => {
    return (
      <Button
        variant="outline"
        size="sm"
        type="button"
        onClick={() => setIsFilterOpen(false)}
      >
        Cancel
      </Button>
    );
  };

  const renderCustomerFilter = () => {
    return (
      <FormField
        control={form.control}
        name="customer"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Customer</FormLabel>
            <FormControl>
              <Input placeholder="Search customer" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    );
  };

  const renderResetButton = () => {
    return (
      <Button variant="outline" size="sm" type="button" onClick={handleReset}>
        Reset
      </Button>
    );
  };

  const renderApplyButton = () => {
    return (
      <Button size="sm" type="submit">
        Apply Filter
      </Button>
    );
  };

  return (
    <PopoverWrapper
      trigger={
        <ButtonWithIcon
          size="sm"
          iconName="filter"
          label="filters"
          variant="outline"
        />
      }
      side="bottom"
      align="end"
      open={isFilterOpen}
      onOpenChange={setIsFilterOpen}
    >
      <Form {...form}>
        <form
          className="flex flex-col gap-4 w-64"
          onSubmit={form.handleSubmit(() => handleApply())}
        >
          <div className="flex items-center justify-between">
            {renderTitle()}
          </div>

          {renderRoleFilter()}
          {renderCustomerFilter()}

          <div className="flex justify-end gap-2 pt-2">
            {renderCancelButton()}
            {renderResetButton()}
            {renderApplyButton()}
          </div>
        </form>
      </Form>
    </PopoverWrapper>
  );
};

export default UserMasterFilterPopover;
