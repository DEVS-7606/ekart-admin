import { useForm } from "react-hook-form";
import Button from "@/shared/components/atoms/button";
import Input from "@/shared/components/atoms/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/shared/components/atoms/form";
import { SelectField } from "@/shared/components/molecules/selectDropdown";
import type { CustomerRow } from "@/pages/customer-master/type/customerMaster";
import Textarea from "@/shared/components/atoms/textarea";
import LabelWithRequired from "@/shared/components/molecules/labelWithRequired";

interface CustomerDetailFormProps {
  onSave: (values: CustomerRow) => void;
  onCancel: () => void;
  initialValues?: CustomerRow | null;
}

const CustomerDetailForm = ({
  onSave,
  onCancel,
  initialValues,
}: CustomerDetailFormProps) => {
  const form = useForm<CustomerRow>({
    defaultValues: initialValues ?? {
      name: "",
      code: "",
      shortName: "",
      maxUsers: "",
      language: "",
      description: "",
    },
    mode: "onBlur",
  });

  const handleSubmit = (values: CustomerRow) => {
    onSave(values);
    // form.reset();
  };

  const handleCancel = () => {
    form.reset();
    onCancel();
  };

  const renderNameFormField = () => {
    return (
      <FormField
        control={form.control}
        name="name"
        rules={{ required: "Name is required" }}
        render={({ field }) => (
          <FormItem className="space-y-1 md:col-span-2">
            <FormLabel className="text-foreground">
              <LabelWithRequired text="Name" required />
            </FormLabel>
            <FormControl>
              <Input id="customer-name" placeholder="Enter name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const renderCodeFormField = () => {
    return (
      <FormField
        control={form.control}
        name="code"
        rules={{ required: "Code is required" }}
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="text-foreground">
              <LabelWithRequired text="Code" required />
            </FormLabel>
            <FormControl>
              <Input
                id="customer-code"
                placeholder="Enter unique code"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const renderShortNameFormField = () => {
    return (
      <FormField
        control={form.control}
        name="shortName"
        rules={{ required: "Short name is required" }}
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="text-foreground">
              <LabelWithRequired text="Short Name" required />
            </FormLabel>
            <FormControl>
              <Input
                id="customer-short-name"
                placeholder="Enter short name"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const renderMaxUsersFormField = () => {
    return (
      <FormField
        control={form.control}
        name="maxUsers"
        rules={{ required: "Maximum users is required" }}
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="text-foreground">
              <LabelWithRequired text="Maximum no. of Users" required />
            </FormLabel>
            <FormControl>
              <Input
                id="customer-max-users"
                type="number"
                min={1}
                placeholder="Enter max users"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const renderLanguageFormField = () => {
    return (
      <FormField
        control={form.control}
        name="language"
        rules={{ required: "Language is required" }}
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel className="text-foreground">
              <LabelWithRequired text="Language Preference" required />
            </FormLabel>
            <FormControl>
              <SelectField
                placeholder="Select Language"
                options={[
                  { label: "English", value: "English" },
                  { label: "Hindi", value: "Hindi" },
                ]}
                value={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const renderDescriptionFormField = () => {
    return (
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="space-y-1 md:col-span-2">
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                id="customer-description"
                placeholder="Provide a detailed description"
                rows={4}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  const renderButtons = () => {
    return (
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {initialValues ? "Update" : "Save"}
        </Button>
      </div>
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {renderNameFormField()}
          {renderCodeFormField()}
          {renderShortNameFormField()}
          {renderMaxUsersFormField()}
          {renderLanguageFormField()}
          {renderDescriptionFormField()}
        </div>

        {renderButtons()}
      </form>
    </Form>
  );
};

export default CustomerDetailForm;
