import { useForm } from "react-hook-form";

import Button from "@/shared/components/atoms/button";
import Input from "@/shared/components/atoms/input";
import Textarea from "@/shared/components/atoms/textarea";
import { Checkbox } from "@/shared/components/atoms/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/atoms/form";

import type { ICustomerGroup } from "@/pages/customer-groups/type/customerGroupMaster";

interface CustomerGroupDetailFormProps {
  onSave: (values: ICustomerGroup) => void;
  onCancel: () => void;
  initialValues?: ICustomerGroup | null;
}

const CustomerGroupDetailForm = ({
  onSave,
  onCancel,
  initialValues,
}: CustomerGroupDetailFormProps) => {
  const form = useForm<ICustomerGroup>({
    defaultValues: initialValues ?? {
      name: "",
      code: "",
      groupType: "",
      discountPercent: undefined,
      minOrderValue: undefined,
      isDefault: false,
      isActive: true,
      description: "",
    },
    mode: "onBlur",
  });

  const handleSubmit = (values: ICustomerGroup) => {
    onSave(values);
  };

  const handleCancel = () => {
    form.reset();
    onCancel();
  };

  const renderTextField = (
    name: "name" | "code" | "groupType" | "description",
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

  const renderNumberField = (
    name: "discountPercent" | "minOrderValue",
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

  const renderIsDefaultField = () => (
    <FormField
      control={form.control}
      name="isDefault"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormLabel className="mt-0">Default Group</FormLabel>
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

  const renderDescriptionField = () => (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem className="space-y-1 md:col-span-2">
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              id="customer-group-description"
              placeholder="Provide a description for this customer group"
              rows={4}
              {...field}
            />
          </FormControl>
          <FormMessage />
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
        {renderTextField("name", "Name", "Enter group name", true)}
        {renderTextField("code", "Code", "Enter unique code", true)}
        {renderTextField(
          "groupType",
          "Group Type",
          "e.g. Retail, Wholesale, VIP"
        )}
        {renderNumberField(
          "discountPercent",
          "Discount %",
          "e.g. 10 for 10% discount"
        )}
        {renderNumberField(
          "minOrderValue",
          "Minimum Order Value",
          "e.g. 25000 for 25,000 INR"
        )}
        {renderIsDefaultField()}
        {renderIsActiveField()}
        {renderDescriptionField()}
        <div className="md:col-span-2">{renderButtons()}</div>
      </form>
    </Form>
  );
};

export default CustomerGroupDetailForm;
