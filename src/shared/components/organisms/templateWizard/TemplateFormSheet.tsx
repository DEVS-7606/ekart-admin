import { Sheet, SheetContent } from "@/shared/components/atoms/sheet";
import type { BaseTemplateFormValues } from "@/shared/types/templateWizard";
import type { TemplateMode } from "@/shared/types";

interface TemplateFormSheetProps<TFormValues extends BaseTemplateFormValues> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: TemplateMode;
  initialValues?: Partial<TFormValues>;
  onSubmit: (values: TFormValues) => void;
  FormComponent: React.ComponentType<{
    open: boolean;
    mode: TemplateMode;
    initialValues?: Partial<TFormValues>;
    onSubmit: (values: TFormValues) => void;
    onCancel: () => void;
  }>;
}

const TemplateFormSheet = <TFormValues extends BaseTemplateFormValues>({
  open,
  onOpenChange,
  mode,
  initialValues,
  onSubmit,
  FormComponent,
}: TemplateFormSheetProps<TFormValues>) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="sm:max-w-7xl w-full overflow-y-auto p-6"
      >
        <FormComponent
          open={open}
          mode={mode}
          initialValues={initialValues}
          onSubmit={(values: TFormValues) => {
            onSubmit(values);
            onOpenChange(false);
          }}
          onCancel={() => onOpenChange(false)}
        />
      </SheetContent>
    </Sheet>
  );
};

export default TemplateFormSheet;
