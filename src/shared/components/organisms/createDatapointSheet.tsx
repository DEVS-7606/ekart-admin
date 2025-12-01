import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "@/shared/components/atoms/input";
import Button from "@/shared/components/atoms/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/atoms/form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/atoms/sheet";
import LabelWithRequired from "@/shared/components/molecules/labelWithRequired";
import { SelectField } from "@/shared/components/molecules/selectDropdown";
import SubmitButton from "@/shared/components/molecules/submitButton";
import { DATA_POINT_DATA_TYPES } from "@/shared/types";
import { MOCK_UNITS } from "@/shared/constants/unitMaster.constant";
import { MOCK_DATA_POINT_TEMPLATES } from "@/shared/constants/dataPointMaster.constant";

export type CreateDatapointFormValues = {
  name: string;
  dataPoint: string;
  registerType: string;
  dataType: string;
  address: string;
  scaling: string;
  registerLength: string;
  unit: string;
  pollingTime: string;
  templateCode?: string;
};

interface CreateDatapointSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: CreateDatapointFormValues) => void;
  mode?: "create" | "edit";
  initialValues?: Partial<CreateDatapointFormValues> | null;
}

const REGISTER_TYPES = [
  "Holding Register",
  "Input Register",
  "Coil",
  "Discrete Input",
];

const POLLING_TIME_OPTIONS = [
  { label: "1s", value: "1s" },
  { label: "3s", value: "3s" },
  { label: "5s", value: "5s" },
  { label: "On Change", value: "onchange" },
];

const getCreateDatapointDefaultValues = (): CreateDatapointFormValues => ({
  name: "",
  dataPoint: "",
  registerType: "",
  dataType: "",
  address: "",
  scaling: "",
  registerLength: "",
  unit: "",
  pollingTime: "",
  templateCode: "",
});

const CreateDatapointSheet = ({
  open,
  onOpenChange,
  onSubmit,
  mode = "create",
  initialValues,
}: CreateDatapointSheetProps) => {
  const form = useForm<CreateDatapointFormValues>({
    defaultValues: getCreateDatapointDefaultValues(),
    mode: "onBlur",
  });

  useEffect(() => {
    if (open) {
      const baseValues = getCreateDatapointDefaultValues();
      const mergedValues = initialValues
        ? { ...baseValues, ...initialValues }
        : baseValues;

      form.reset(mergedValues);
    } else {
      form.reset(getCreateDatapointDefaultValues());
    }
  }, [open, initialValues, mode, form]);

  const handleSubmit = (values: CreateDatapointFormValues) => {
    onSubmit(values);
    onOpenChange(false);
    form.reset(getCreateDatapointDefaultValues());
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="sm:max-w-md w-full p-0 overflow-y-auto"
      >
        <SheetHeader className="mb-4 p-6 border-b">
          <SheetTitle className="text-xl font-semibold">
            {mode === "edit" ? "Edit Datapoint" : "Create Datapoint"}
          </SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form
            className="px-6 space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              rules={{ required: "Datapoint name is required" }}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>
                    <LabelWithRequired text="Datapoint Name" />
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Datapoint Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              rules={{ required: "Datapoint address is required" }}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>
                    <LabelWithRequired text="Datapoint Address" />
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Datapoint Address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="registerType"
              rules={{ required: "Register type is required" }}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>
                    <LabelWithRequired text="Register Type" />
                  </FormLabel>
                  <FormControl>
                    <SelectField
                      placeholder="Select Register Type"
                      options={REGISTER_TYPES}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="scaling"
              rules={{ required: "Scaling is required" }}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>
                    <LabelWithRequired text="Scaling" />
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Scale (Multiplier)" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="registerLength"
              rules={{ required: "Register length/count is required" }}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>
                    <LabelWithRequired text="Register Length/Count" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Number of  hardware register to be read"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="templateCode"
              rules={{ required: "Datapoint template is required" }}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>
                    <LabelWithRequired text="Select Datapoint Template" />
                  </FormLabel>
                  <FormControl>
                    <SelectField
                      placeholder="Select a template"
                      options={MOCK_DATA_POINT_TEMPLATES.map((template) => ({
                        label: template.name,
                        value: template.name,
                      }))}
                      value={field.value || undefined}
                      onChange={(val) => {
                        field.onChange(val);
                        // Auto-fill form when template is selected (except name - user should enter manually)
                        const template = MOCK_DATA_POINT_TEMPLATES.find(
                          (t) => t.name === val
                        );
                        if (template) {
                          form.setValue("dataPoint", template.name);
                          form.setValue("dataType", template.dataType);
                          form.setValue("unit", template.unit);
                          if (template.pollingTime) {
                            form.setValue("pollingTime", template.pollingTime);
                          }
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dataType"
              rules={{ required: "Datapoint datatype is required" }}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>
                    <LabelWithRequired text="Datapoint Datatype" />
                  </FormLabel>
                  <FormControl>
                    <SelectField
                      placeholder="Select Datatype"
                      options={DATA_POINT_DATA_TYPES.map((type) => ({
                        label: type,
                        value: type,
                      }))}
                      disabled
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Unit</FormLabel>
                  <FormControl>
                    <SelectField
                      placeholder="Unit of datapoint"
                      options={MOCK_UNITS.map((unit) => ({
                        label: unit.code,
                        value: unit.code,
                      }))}
                      disabled
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pollingTime"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Polling time/ Frequency</FormLabel>
                  <FormControl>
                    <SelectField
                      placeholder="Select polling time"
                      options={POLLING_TIME_OPTIONS}
                      value={field.value || undefined}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="my-6 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                className="px-6"
                onClick={() => {
                  form.reset(getCreateDatapointDefaultValues());
                  onOpenChange(false);
                }}
              >
                Cancel
              </Button>
              <SubmitButton
                labelIdle="Save"
                labelLoading="Saving..."
                isLoading={form.formState.isSubmitting}
                className="w-auto px-6"
              />
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateDatapointSheet;
