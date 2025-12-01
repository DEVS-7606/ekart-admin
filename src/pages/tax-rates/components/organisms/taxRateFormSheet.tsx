import { Sheet, SheetContent } from "@/shared/components/atoms/sheet";
import { Typography } from "@/shared/components/atoms/Typography";

import type { ITaxRate } from "@/pages/tax-rates/type/taxRateMaster";
import TaxRateDetailForm from "@/pages/tax-rates/components/organisms/taxRateDetailForm";

interface TaxRateFormSheetProps {
  isModalOpen: boolean;
  handleSetIsModalOpen: (value: boolean) => void;
  onSave: (values: ITaxRate) => void;
  initialValues: ITaxRate | null;
}

const TaxRateFormSheet = ({
  isModalOpen,
  handleSetIsModalOpen,
  onSave,
  initialValues,
}: TaxRateFormSheetProps) => {
  const sheetTitle = initialValues ? "Edit Tax Rate" : "Add Tax Rate";

  const handleCancel = () => {
    handleSetIsModalOpen(false);
  };

  const renderSheetHeader = () => {
    return (
      <div className="border-b px-6 py-4">
        <Typography component="h2" variant="xl" weight="semiBold">
          {sheetTitle}
        </Typography>
        <Typography component="p" variant="sm">
          Fill in the details to create or update a tax rate.
        </Typography>
      </div>
    );
  };

  return (
    <Sheet open={isModalOpen} onOpenChange={handleSetIsModalOpen}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex h-full flex-col"
      >
        {renderSheetHeader()}
        <TaxRateDetailForm
          onSave={onSave}
          onCancel={handleCancel}
          initialValues={initialValues}
        />
      </SheetContent>
    </Sheet>
  );
};

export default TaxRateFormSheet;
