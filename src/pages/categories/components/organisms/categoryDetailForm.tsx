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

import type { ICategory } from "@/pages/categories/type/categoryMaster";

interface CategoryDetailFormProps {
  onSave: (values: ICategory) => void;
  onCancel: () => void;
  initialValues?: ICategory | null;
}

const CategoryDetailForm = ({
  onSave,
  onCancel,
  initialValues,
}: CategoryDetailFormProps) => {
  const form = useForm<ICategory>({
    defaultValues: initialValues ?? {
      name: "",
      code: "",
      parentCode: "",
      level: 1,
      isActive: true,
      description: "",
    },
    mode: "onBlur",
  });

  const handleSubmit = (values: ICategory) => {
    onSave(values);
  };

  const handleCancel = () => {
    form.reset();
    onCancel();
  };

  const renderTextField = (
    name: "name" | "code" | "parentCode",
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

  const renderLevelField = () => (
    <FormField
      control={form.control}
      name="level"
      rules={{
        required: "Level is required",
        min: { value: 1, message: "Level must be at least 1" },
      }}
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel>Level</FormLabel>
          <FormControl>
            <Input
              type="number"
              min={1}
              value={field.value ?? ""}
              onChange={(event) => field.onChange(Number(event.target.value))}
              placeholder="e.g. 1 for top-level categories"
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
              id="category-description"
              placeholder="Provide a description for this category"
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
        {renderTextField("name", "Name", "Enter category name", true)}
        {renderTextField("code", "Code", "Enter unique code", true)}
        {renderTextField(
          "parentCode",
          "Parent Code",
          "Enter parent category code (optional)"
        )}
        {renderLevelField()}
        {renderIsActiveField()}
        {renderDescriptionField()}
        <div className="md:col-span-2">{renderButtons()}</div>
      </form>
    </Form>
  );
};

export default CategoryDetailForm;
