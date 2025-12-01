import { Sheet, SheetContent } from "@/shared/components/atoms/sheet";
import { Typography } from "@/shared/components/atoms/Typography";

import type { IBrand } from "@/pages/brands/type/brandMaster";
import BrandDetailForm from "@/pages/brands/components/organisms/brandDetailForm";

interface BrandFormSheetProps {
  isModalOpen: boolean;
  handleSetIsModalOpen: (value: boolean) => void;
  onSave: (values: IBrand) => void;
  initialValues: IBrand | null;
}

const BrandFormSheet = ({
  isModalOpen,
  handleSetIsModalOpen,
  onSave,
  initialValues,
}: BrandFormSheetProps) => {
  const sheetTitle = initialValues ? "Edit Brand" : "Add Brand";

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
          Fill in the details to create or update a brand.
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
        <BrandDetailForm
          onSave={onSave}
          onCancel={handleCancel}
          initialValues={initialValues}
        />
      </SheetContent>
    </Sheet>
  );
};

export default BrandFormSheet;
