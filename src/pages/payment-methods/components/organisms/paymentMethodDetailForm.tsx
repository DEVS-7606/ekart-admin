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

import type { IPaymentMethod } from "@/pages/payment-methods/type/paymentMethodMaster";

interface PaymentMethodDetailFormProps {
  onSave: (values: IPaymentMethod) => void;
  onCancel: () => void;
  initialValues?: IPaymentMethod | null;
}

const PaymentMethodDetailForm = ({
  onSave,
  onCancel,
  initialValues,
}: PaymentMethodDetailFormProps) => {
  const form = useForm<IPaymentMethod>({
    defaultValues: initialValues ?? {
      name: "",
      code: "",
      methodType: "",
      provider: "",
      supportsOnline: true,
      supportsCod: false,
      transactionFeePercent: undefined,
      fixedFee: undefined,
      settlementDays: undefined,
      isActive: true,
      description: "",
    },
    mode: "onBlur",
  });

  const handleSubmit = (values: IPaymentMethod) => {
    onSave(values);
  };

  const handleCancel = () => {
    form.reset();
    onCancel();
  };

  const renderTextField = (
    name: "name" | "code" | "methodType" | "provider",
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
    name: "transactionFeePercent" | "fixedFee" | "settlementDays",
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

  const renderSupportsOnlineField = () => (
    <FormField
      control={form.control}
      name="supportsOnline"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormLabel className="mt-0">Supports Online</FormLabel>
        </FormItem>
      )}
    />
  );

  const renderSupportsCodField = () => (
    <FormField
      control={form.control}
      name="supportsCod"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormLabel className="mt-0">Supports COD</FormLabel>
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
              id="payment-method-description"
              placeholder="Provide notes about this payment method"
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
        {renderTextField("name", "Name", "Enter payment method name", true)}
        {renderTextField("code", "Code", "Enter unique code", true)}
        {renderTextField(
          "methodType",
          "Method Type",
          "e.g. UPI, Card, NetBanking, Wallet, COD"
        )}
        {renderTextField("provider", "Provider", "e.g. Razorpay")}
        {renderNumberField(
          "transactionFeePercent",
          "Transaction Fee %",
          "e.g. 2 for 2%"
        )}
        {renderNumberField("fixedFee", "Fixed Fee", "e.g. 3 per txn")}
        {renderNumberField("settlementDays", "Settlement Days", "e.g. 2")}
        {renderSupportsOnlineField()}
        {renderSupportsCodField()}
        {renderIsActiveField()}
        {renderDescriptionField()}
        <div className="md:col-span-2">{renderButtons()}</div>
      </form>
    </Form>
  );
};

export default PaymentMethodDetailForm;
