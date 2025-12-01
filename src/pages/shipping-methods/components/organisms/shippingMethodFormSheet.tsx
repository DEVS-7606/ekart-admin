import { Sheet, SheetContent } from "@/shared/components/atoms/sheet";
import { Typography } from "@/shared/components/atoms/Typography";

import type { IShippingMethod } from "@/pages/shipping-methods/type/shippingMethodMaster";
import ShippingMethodDetailForm from "@/pages/shipping-methods/components/organisms/shippingMethodDetailForm";

interface ShippingMethodFormSheetProps {
  isModalOpen: boolean;
  handleSetIsModalOpen: (value: boolean) => void;
  onSave: (values: IShippingMethod) => void;
  initialValues: IShippingMethod | null;
}

const ShippingMethodFormSheet = ({
  isModalOpen,
  handleSetIsModalOpen,
  onSave,
  initialValues,
}: ShippingMethodFormSheetProps) => {
  const sheetTitle = initialValues
    ? "Edit Shipping Method"
    : "Add Shipping Method";

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
          Fill in the details to create or update a shipping method.
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
        <ShippingMethodDetailForm
          onSave={onSave}
          onCancel={handleCancel}
          initialValues={initialValues}
        />
      </SheetContent>
    </Sheet>
  );
};

export default ShippingMethodFormSheet;
