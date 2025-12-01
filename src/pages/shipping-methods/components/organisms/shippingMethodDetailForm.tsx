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

import type { IShippingMethod } from "@/pages/shipping-methods/type/shippingMethodMaster";

interface ShippingMethodDetailFormProps {
  onSave: (values: IShippingMethod) => void;
  onCancel: () => void;
  initialValues?: IShippingMethod | null;
}

const ShippingMethodDetailForm = ({
  onSave,
  onCancel,
  initialValues,
}: ShippingMethodDetailFormProps) => {
  const form = useForm<IShippingMethod>({
    defaultValues: initialValues ?? {
      name: "",
      code: "",
      carrier: "",
      zone: "",
      baseCharge: undefined,
      perKgCharge: undefined,
      estimatedDaysMin: undefined,
      estimatedDaysMax: undefined,
      isCodSupported: false,
      isActive: true,
      description: "",
    },
    mode: "onBlur",
  });

  const handleSubmit = (values: IShippingMethod) => {
    onSave(values);
  };

  const handleCancel = () => {
    form.reset();
    onCancel();
  };

  const renderTextField = (
    name: "name" | "code" | "carrier" | "zone",
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
    name:
      | "baseCharge"
      | "perKgCharge"
      | "estimatedDaysMin"
      | "estimatedDaysMax",
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

  const renderIsCodField = () => (
    <FormField
      control={form.control}
      name="isCodSupported"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormLabel className="mt-0">COD Supported</FormLabel>
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
              id="shipping-method-description"
              placeholder="Provide notes about this shipping method"
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
        {renderTextField("name", "Name", "Enter shipping method name", true)}
        {renderTextField("code", "Code", "Enter unique code", true)}
        {renderTextField("carrier", "Carrier", "Enter carrier name")}
        {renderTextField("zone", "Zone", "e.g. National, Local, International")}
        {renderNumberField(
          "baseCharge",
          "Base Charge",
          "e.g. 50 for base charge"
        )}
        {renderNumberField("perKgCharge", "Per Kg Charge", "e.g. 20 per kg")}
        {renderNumberField("estimatedDaysMin", "ETA Min (days)", "e.g. 3")}
        {renderNumberField("estimatedDaysMax", "ETA Max (days)", "e.g. 7")}
        {renderIsCodField()}
        {renderIsActiveField()}
        {renderDescriptionField()}
        <div className="md:col-span-2">{renderButtons()}</div>
      </form>
    </Form>
  );
};

export default ShippingMethodDetailForm;
