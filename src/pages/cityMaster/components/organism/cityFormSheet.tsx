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
import { MOCK_STATES } from "@/shared/constants/stateMaster.constant";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/shared/components/atoms/sheet";
import SubmitButton from "@/shared/components/molecules/submitButton";
import type { CityFormSheetProps } from "../../interfaces";

const cityFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().min(1, "Code is required"),
  state: z.string().min(1, "State is required"),
});

export type CityFormValues = z.infer<typeof cityFormSchema>;

const CityFormSheet = ({
  open,
  onOpenChange,
  mode,
  initialValues,
  onSubmit,
}: CityFormSheetProps) => {
  const form = useForm<CityFormValues>({
    resolver: zodResolver(cityFormSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      code: initialValues?.code ?? "",
      state: initialValues?.state ?? "",
    },
  });

  const stateOptions = MOCK_STATES.map((s) => s.name);

  useEffect(() => {
    form.reset({
      name: initialValues?.name ?? "",
      code: initialValues?.code ?? "",
      state: initialValues?.state ?? "",
    });
  }, [form, initialValues, open]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{mode === "edit" ? "Edit City" : "Add City"}</SheetTitle>
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
                <Input placeholder="Enter city name" {...field} />
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
              name="state"
              label={{
                component: (
                  <Typography component="span" variant="sm" weight="medium">
                    State <span className="text-red-500">*</span>
                  </Typography>
                ),
              }}
            >
              {({ field }) => (
                <SelectField
                  placeholder="-- select state --"
                  options={stateOptions}
                  value={field.value ?? ""}
                  onChange={(val) => field.onChange(val)}
                />
              )}
            </InputField>

            <SheetFooter className="flex-row justify-end gap-3 mt-5">
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

export default CityFormSheet;
