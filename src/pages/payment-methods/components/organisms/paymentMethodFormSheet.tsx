import { Sheet, SheetContent } from "@/shared/components/atoms/sheet";
import { Typography } from "@/shared/components/atoms/Typography";

import type { IPaymentMethod } from "@/pages/payment-methods/type/paymentMethodMaster";
import PaymentMethodDetailForm from "@/pages/payment-methods/components/organisms/paymentMethodDetailForm";

interface PaymentMethodFormSheetProps {
  isModalOpen: boolean;
  handleSetIsModalOpen: (value: boolean) => void;
  onSave: (values: IPaymentMethod) => void;
  initialValues: IPaymentMethod | null;
}

const PaymentMethodFormSheet = ({
  isModalOpen,
  handleSetIsModalOpen,
  onSave,
  initialValues,
}: PaymentMethodFormSheetProps) => {
  const sheetTitle = initialValues
    ? "Edit Payment Method"
    : "Add Payment Method";

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
          Fill in the details to create or update a payment method.
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
        <PaymentMethodDetailForm
          onSave={onSave}
          onCancel={handleCancel}
          initialValues={initialValues}
        />
      </SheetContent>
    </Sheet>
  );
};

export default PaymentMethodFormSheet;
