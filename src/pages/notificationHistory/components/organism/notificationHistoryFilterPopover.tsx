import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/shared/components/atoms/button";
import Input from "@/shared/components/atoms/input";
import { Typography } from "@/shared/components/atoms/Typography";
import PopoverWrapper from "@/shared/components/molecules/popoverWrapper";
import ButtonWithIcon from "@/shared/components/molecules/buttonWithIcon";
import { SelectField } from "@/shared/components/molecules/selectDropdown";
import type {
  Notification,
  NotificationFilters,
} from "@/pages/notificationHistory/types";
import { matchesNotificationFilters } from "@/pages/notificationHistory/utils/notificationFilters";
import { MOCK_NOTIFICATIONS } from "@/shared/constants/notificationHistory.constant";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/shared/components/atoms/form";

interface NotificationHistoryFilterPopoverProps {
  notifications: Notification[];
  onFiltersChange: (notifications: Notification[]) => void;
}

const NotificationHistoryFilterPopover = ({
  notifications,
  onFiltersChange,
}: NotificationHistoryFilterPopoverProps) => {
  const form = useForm<NotificationFilters>({
    defaultValues: {
      customer: "",
      machine: "",
      notificationType: "all",
      alarm: "",
      dateFrom: "",
      dateTo: "",
      lastN: "",
    },
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filters = form.watch();

  const filteredNotifications = useMemo(() => {
    let result = notifications.filter((notification) =>
      matchesNotificationFilters(notification, filters)
    );

    if (filters.lastN) {
      const n = Number(filters.lastN);
      if (!Number.isNaN(n) && n > 0) {
        result = result.slice(0, n);
      }
    }

    return result;
  }, [filters, notifications]);

  const handleReset = () => {
    const cleared: NotificationFilters = {
      customer: "",
      machine: "",
      notificationType: "all",
      alarm: "",
      dateFrom: "",
      dateTo: "",
      lastN: "",
    };

    form.reset(cleared);
    onFiltersChange(MOCK_NOTIFICATIONS);
  };

  const handleApply = () => {
    onFiltersChange(filteredNotifications);
  };

  const renderTitle = () => {
    return (
      <Typography component="span" variant="base" weight="medium">
        Filter Notifications
      </Typography>
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

  const renderMachineFilter = () => {
    return (
      <FormField
        control={form.control}
        name="machine"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Machine</FormLabel>
            <FormControl>
              <Input placeholder="Search machine" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    );
  };

  const renderNotificationTypeFilter = () => {
    return (
      <FormField
        control={form.control}
        name="notificationType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notification Type</FormLabel>
            <SelectField
              options={[
                { label: "All", value: "all" },
                { label: "Email", value: "Email" },
                { label: "SMS", value: "SMS" },
                { label: "Whatsapp", value: "Whatsapp" },
              ]}
              value={field.value}
              onChange={(val) =>
                field.onChange(val as NotificationFilters["notificationType"])
              }
              placeholder="All"
            />
          </FormItem>
        )}
      />
    );
  };

  const renderAlarmFilter = () => {
    return (
      <FormField
        control={form.control}
        name="alarm"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Alarm</FormLabel>
            <FormControl>
              <Input placeholder="Search alarm" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    );
  };

  const renderDateFromFilter = () => {
    return (
      <FormField
        control={form.control}
        name="dateFrom"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date From</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    );
  };

  const renderDateToFilter = () => {
    return (
      <FormField
        control={form.control}
        name="dateTo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date To</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    );
  };

  const renderLastNFilter = () => {
    return (
      <FormField
        control={form.control}
        name="lastN"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last N Records</FormLabel>
            <FormControl>
              <Input type="number" min={""} placeholder="e.g. 10" {...field} />
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
          className="flex flex-col gap-6 w-[32rem] max-w-[90vw]"
          onSubmit={form.handleSubmit(() => handleApply())}
        >
          <div className="flex items-center justify-between">
            {renderTitle()}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {renderCustomerFilter()}
            {renderMachineFilter()}
            {renderNotificationTypeFilter()}
            {renderAlarmFilter()}
            {renderDateFromFilter()}
            {renderDateToFilter()}
            {renderLastNFilter()}
          </div>

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

export default NotificationHistoryFilterPopover;
