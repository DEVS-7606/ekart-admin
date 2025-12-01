import { useForm } from "react-hook-form";

import Button from "@/shared/components/atoms/button";
import Input from "@/shared/components/atoms/input";
import { Checkbox } from "@/shared/components/atoms/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/atoms/form";

import type {
  IDiscount,
  DiscountType,
} from "@/pages/discounts/type/discountMaster";

interface DiscountDetailFormProps {
  onSave: (values: IDiscount) => void;
  onCancel: () => void;
  initialValues?: IDiscount | null;
}

const DiscountDetailForm = ({
  onSave,
  onCancel,
  initialValues,
}: DiscountDetailFormProps) => {
  const form = useForm<IDiscount>({
    defaultValues: initialValues ?? {
      name: "",
      code: "",
      type: "percentage",
      value: 0,
      minOrderValue: undefined,
      maxDiscountValue: undefined,
      startDate: "",
      endDate: "",
      maxRedemptions: undefined,
      perCustomerLimit: undefined,
      isActive: true,
      description: "",
    },
    mode: "onBlur",
  });

  const handleSubmit = (values: IDiscount) => {
    onSave(values);
  };

  const handleCancel = () => {
    form.reset();
    onCancel();
  };

  const renderTextField = (
    name: "name" | "code" | "description",
    label: string,
    placeholder: string,
    required = false
  ) => (
    <FormField
      control={form.control}
      name={name}
      rules={required ? { required: `${label} is required` } : undefined}
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const renderTypeField = () => (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel>Type</FormLabel>
          <FormControl>
            <Input
              placeholder="percentage, fixed, bogo, free_shipping"
              value={field.value}
              onChange={(event) =>
                field.onChange(event.target.value as DiscountType)
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const renderNumberField = (
    name:
      | "value"
      | "minOrderValue"
      | "maxDiscountValue"
      | "maxRedemptions"
      | "perCustomerLimit",
    label: string,
    placeholder: string
  ) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="number"
              value={field.value ?? ""}
              onChange={(event) => {
                const value = event.target.value;
                field.onChange(value === "" ? undefined : Number(value));
              }}
              placeholder={placeholder}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const renderDateField = (name: "startDate" | "endDate", label: string) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type="date" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const renderIsActiveField = () => (
    <FormField
      control={form.control}
      name="isActive"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormLabel className="mt-0">Active</FormLabel>
        </FormItem>
      )}
    />
  );

  const renderButtons = () => (
    <div className="flex justify-end gap-2 pt-4">
      <Button type="button" variant="outline" onClick={handleCancel}>
        Cancel
      </Button>
      <Button type="submit">{initialValues ? "Update" : "Create"}</Button>
    </div>
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {renderTextField("name", "Name", "Enter discount name", true)}
        {renderTextField("code", "Code", "Enter unique code", true)}
        {renderTypeField()}
        {renderNumberField("value", "Value", "e.g. 10 for 10% or 500 for flat")}
        {renderNumberField("minOrderValue", "Minimum Order Value", "e.g. 999")}
        {renderNumberField(
          "maxDiscountValue",
          "Maximum Discount Value",
          "e.g. 500"
        )}
        {renderDateField("startDate", "Start Date")}
        {renderDateField("endDate", "End Date")}
        {renderNumberField(
          "maxRedemptions",
          "Max Redemptions",
          "0 for unlimited"
        )}
        {renderNumberField(
          "perCustomerLimit",
          "Per Customer Limit",
          "0 for unlimited"
        )}
        {renderIsActiveField()}
        {renderTextField(
          "description",
          "Description",
          "Describe this discount or campaign"
        )}
        <div className="md:col-span-2">{renderButtons()}</div>
      </form>
    </Form>
  );
};

export default DiscountDetailForm;
