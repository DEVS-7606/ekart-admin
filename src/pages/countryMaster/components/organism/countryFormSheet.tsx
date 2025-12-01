import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/shared/components/atoms/button";
import { Form } from "@/shared/components/atoms/form";
import Input from "@/shared/components/atoms/input";
import InputField from "@/shared/components/molecules/InputField";
import { Typography } from "@/shared/components/atoms/Typography";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/shared/components/atoms/sheet";
import SubmitButton from "@/shared/components/molecules/submitButton";
import type { CountryFormSheetProps } from "@/pages/countryMaster/interfaces";

const countryFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().min(1, "Code is required"),
});

export type CountryFormValues = z.infer<typeof countryFormSchema>;

const CountryFormSheet = ({
  open,
  onOpenChange,
  mode,
  initialValues,
  onSubmit,
}: CountryFormSheetProps) => {
  const form = useForm<CountryFormValues>({
    resolver: zodResolver(countryFormSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      code: initialValues?.code ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      name: initialValues?.name ?? "",
      code: initialValues?.code ?? "",
    });
  }, [initialValues, open]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>
            {mode === "edit" ? "Edit Country" : "Add Country"}
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
                <Input placeholder="Enter country name" {...field} />
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

export default CountryFormSheet;
