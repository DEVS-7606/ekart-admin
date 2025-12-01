import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/shared/components/atoms/button";
import { Form } from "@/shared/components/atoms/form";
import Input from "@/shared/components/atoms/input";
import InputField from "@/shared/components/molecules/InputField";
import { Typography } from "@/shared/components/atoms/Typography";
import { SelectField } from "@/shared/components/molecules/selectDropdown";
import { MOCK_COUNTRIES } from "@/shared/constants/countryMaster.constant";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/shared/components/atoms/sheet";
import SubmitButton from "@/shared/components/molecules/submitButton";
import type { StateFormSheetProps } from "../../interfaces";

const stateFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().min(1, "Code is required"),
  country: z.string().min(1, "Country is required"),
});

export type StateFormValues = z.infer<typeof stateFormSchema>;

const StateFormSheet = ({
  open,
  onOpenChange,
  mode,
  initialValues,
  onSubmit,
}: StateFormSheetProps) => {
  const form = useForm<StateFormValues>({
    resolver: zodResolver(stateFormSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      code: initialValues?.code ?? "",
      country: initialValues?.country ?? "",
    },
  });

  const countryOptions = MOCK_COUNTRIES.map((c) => c.name);

  useEffect(() => {
    form.reset({
      name: initialValues?.name ?? "",
      code: initialValues?.code ?? "",
      country: initialValues?.country ?? "",
    });
  }, [form, initialValues, open]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>
            {mode === "edit" ? "Edit State" : "Add State"}
          </SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form
            className="flex flex-col gap-4 p-4"
            onSubmit={form.handleSubmit((vals) => onSubmit(vals))}
          >
            <InputField
              control={form.control}
              name="name"
              label={{
                component: (
                  <Typography component="span" variant="sm" weight="medium">
                    Name <span className="text-red-500">*</span>
                  </Typography>
                ),
              }}
            >
              {({ field }) => (
                <Input placeholder="Enter state name" {...field} />
              )}
            </InputField>

            <InputField
              control={form.control}
              name="code"
              label={{
                component: (
                  <Typography component="span" variant="sm" weight="medium">
                    Code <span className="text-red-500">*</span>
                  </Typography>
                ),
              }}
            >
              {({ field }) => <Input placeholder="Enter code" {...field} />}
            </InputField>

            <InputField
              control={form.control}
              name="country"
              label={{
                component: (
                  <Typography component="span" variant="sm" weight="medium">
                    Country <span className="text-red-500">*</span>
                  </Typography>
                ),
              }}
            >
              {({ field }) => (
                <SelectField
                  placeholder="-- select country --"
                  options={countryOptions}
                  value={field.value ?? ""}
                  onChange={(val) => field.onChange(val)}
                />
              )}
            </InputField>

            <SheetFooter className="flex-row justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="px-6"
              >
                Cancel
              </Button>
              <SubmitButton labelIdle="Save" className="w-auto px-6" />
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default StateFormSheet;
