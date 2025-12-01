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

import type { ISupplier } from "@/pages/suppliers/type/supplierMaster";

interface SupplierDetailFormProps {
  onSave: (values: ISupplier) => void;
  onCancel: () => void;
  initialValues?: ISupplier | null;
}

const SupplierDetailForm = ({
  onSave,
  onCancel,
  initialValues,
}: SupplierDetailFormProps) => {
  const form = useForm<ISupplier>({
    defaultValues: initialValues ?? {
      name: "",
      code: "",
      contactName: "",
      phone: "",
      email: "",
      country: "",
      city: "",
      leadTimeDays: undefined,
      minOrderValue: undefined,
      paymentTerms: "",
      isActive: true,
      description: "",
    },
    mode: "onBlur",
  });

  const handleSubmit = (values: ISupplier) => {
    onSave(values);
  };

  const handleCancel = () => {
    form.reset();
    onCancel();
  };

  const renderTextField = (
    name:
      | "name"
      | "code"
      | "contactName"
      | "phone"
      | "email"
      | "country"
      | "city"
      | "paymentTerms",
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
    name: "leadTimeDays" | "minOrderValue",
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

  const renderDescriptionField = () => (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem className="space-y-1 md:col-span-2">
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              id="supplier-description"
              placeholder="Provide notes about this supplier (pricing, SLAs, etc.)"
              rows={4}
              {...field}
            />
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
        {renderTextField("name", "Name", "Enter supplier name", true)}
        {renderTextField("code", "Code", "Enter unique code", true)}
        {renderTextField("contactName", "Contact Name", "Enter contact person")}
        {renderTextField("phone", "Phone", "Enter phone number")}
        {renderTextField("email", "Email", "Enter email address")}
        {renderTextField("country", "Country", "Enter country")}
        {renderTextField("city", "City", "Enter city")}
        {renderNumberField(
          "leadTimeDays",
          "Lead Time (days)",
          "e.g. 3 for 3 day lead time"
        )}
        {renderNumberField(
          "minOrderValue",
          "Minimum Order Value",
          "e.g. 10000 for 10,000 INR"
        )}
        {renderTextField(
          "paymentTerms",
          "Payment Terms",
          "e.g. 30 days credit"
        )}
        {renderIsActiveField()}
        {renderDescriptionField()}
        <div className="md:col-span-2">{renderButtons()}</div>
      </form>
    </Form>
  );
};

export default SupplierDetailForm;
