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

import type { ITaxRate } from "@/pages/tax-rates/type/taxRateMaster";

interface TaxRateDetailFormProps {
  onSave: (values: ITaxRate) => void;
  onCancel: () => void;
  initialValues?: ITaxRate | null;
}

const TaxRateDetailForm = ({
  onSave,
  onCancel,
  initialValues,
}: TaxRateDetailFormProps) => {
  const form = useForm<ITaxRate>({
    defaultValues: initialValues ?? {
      name: "",
      code: "",
      country: "",
      state: "",
      city: "",
      taxType: "",
      ratePercent: 0,
      isInclusive: false,
      isActive: true,
      description: "",
    },
    mode: "onBlur",
  });

  const handleSubmit = (values: ITaxRate) => {
    onSave(values);
  };

  const handleCancel = () => {
    form.reset();
    onCancel();
  };

  const renderTextField = (
    name: "name" | "code" | "country" | "state" | "city" | "taxType",
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

  const renderRateField = () => (
    <FormField
      control={form.control}
      name="ratePercent"
      rules={{
        required: "Rate is required",
        min: { value: 0, message: "Rate cannot be negative" },
      }}
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel>Rate %</FormLabel>
          <FormControl>
            <Input
              type="number"
              value={field.value ?? ""}
              onChange={(event) => {
                const value = event.target.value;
                field.onChange(value === "" ? 0 : Number(value));
              }}
              placeholder="e.g. 18 for 18%"
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
              id="tax-rate-description"
              placeholder="Provide a description for this tax rule"
              rows={4}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const renderIsInclusiveField = () => (
    <FormField
      control={form.control}
      name="isInclusive"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormLabel className="mt-0">Price Includes Tax</FormLabel>
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
        {renderTextField("name", "Name", "Enter tax rate name", true)}
        {renderTextField("code", "Code", "Enter unique code", true)}
        {renderTextField("country", "Country", "Enter country")}
        {renderTextField("state", "State", "Enter state or region")}
        {renderTextField("city", "City", "Enter city (optional)")}
        {renderTextField("taxType", "Tax Type", "e.g. GST, VAT")}
        {renderRateField()}
        {renderIsInclusiveField()}
        {renderIsActiveField()}
        {renderDescriptionField()}
        <div className="md:col-span-2">{renderButtons()}</div>
      </form>
    </Form>
  );
};

export default TaxRateDetailForm;
