import Button from "@/shared/components/atoms/button";
import { Form } from "@/shared/components/atoms/form";
import Input from "@/shared/components/atoms/input";
import InputField from "@/shared/components/molecules/InputField";
import { Typography } from "@/shared/components/atoms/Typography";
import { SheetFooter } from "@/shared/components/atoms/sheet";
import SubmitButton from "@/shared/components/molecules/submitButton";
import type { UseFormReturn } from "react-hook-form";
import type { LanguageFormValues } from "../../types";
import Textarea from "@/shared/components/atoms/textarea";

interface LanguageDetailsProps {
  form: UseFormReturn<LanguageFormValues>;
  onSubmit: (values: LanguageFormValues) => void;
  onCancel: () => void;
}

const LanguageDetails = ({
  form,
  onSubmit,
  onCancel,
}: LanguageDetailsProps) => {
  const handleSubmit = (values: LanguageFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputField
            control={form.control}
            name="name"
            label={{
              component: (
                <Typography component="span" variant="sm" weight="medium">
                  Language Name <span className="text-red-500">*</span>
                </Typography>
              ),
            }}
          >
            {({ field }) => (
              <Input placeholder="Enter language name" {...field} />
            )}
          </InputField>

          <InputField
            control={form.control}
            name="code"
            label={{
              component: (
                <Typography component="span" variant="sm" weight="medium">
                  Language Code <span className="text-red-500">*</span>
                </Typography>
              ),
            }}
          >
            {({ field }) => (
              <Input placeholder="Enter language code (e.g. en)" {...field} />
            )}
          </InputField>

          <InputField
            control={form.control}
            name="description"
            label={{
              component: (
                <Typography component="span" variant="sm" weight="medium">
                  Language Description
                  <span className="text-red-500">*</span>
                </Typography>
              ),
            }}
          >
            {({ field }) => (
              <Textarea
                rows={4}
                placeholder="Enter language description"
                {...field}
              />
            )}
          </InputField>
        </div>

        <SheetFooter className="flex-row justify-end gap-3 mt-5">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="px-6"
          >
            Cancel
          </Button>
          <SubmitButton labelIdle="Save" className="w-auto px-6" />
        </SheetFooter>
      </form>
    </Form>
  );
};

export default LanguageDetails;
