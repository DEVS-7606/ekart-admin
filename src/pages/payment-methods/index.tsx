import { useState } from "react";
import { toast } from "sonner";

import PaymentMethodMasterTemplate from "@/pages/payment-methods/components/template/paymentMethodMasterTemplate";
import type { IPaymentMethod } from "@/pages/payment-methods/type/paymentMethodMaster";
import { MOCK_PAYMENT_METHODS } from "@/shared/constants/paymentMethodMaster.constant";

const PaymentMethods = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethods, setPaymentMethods] =
    useState<IPaymentMethod[]>(MOCK_PAYMENT_METHODS);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<IPaymentMethod | null>(null);

  const handleSetPaymentMethods = (updated: IPaymentMethod[]) => {
    setPaymentMethods(updated);
  };

  const handleSetSelectedPaymentMethod = (method: IPaymentMethod | null) => {
    setSelectedPaymentMethod(method);
  };

  const handleSetIsModalOpen = (value: boolean) => {
    setIsModalOpen(value);
  };

  const onAddEditPaymentMethod = (values: IPaymentMethod) => {
    setPaymentMethods((previous) => {
      if (selectedPaymentMethod) {
        return previous.map((method) =>
          method.code === selectedPaymentMethod.code ? { ...values } : method
        );
      }

      return [{ ...values }, ...previous];
    });
    toast.success(
      `Payment method ${
        selectedPaymentMethod ? "updated" : "added"
      } successfully`
    );
    setSelectedPaymentMethod(null);
    setIsModalOpen(false);
  };

  const onDeletePaymentMethod = () => {
    if (selectedPaymentMethod) {
      setPaymentMethods((previous) =>
        previous.filter((method) => method.code !== selectedPaymentMethod.code)
      );
      toast.success("Payment method deleted successfully");
      setSelectedPaymentMethod(null);
    }
  };

  return (
    <PaymentMethodMasterTemplate
      paymentMethods={paymentMethods}
      selectedPaymentMethod={selectedPaymentMethod}
      isModalOpen={isModalOpen}
      handleSetSelectedPaymentMethod={handleSetSelectedPaymentMethod}
      handleSetPaymentMethods={handleSetPaymentMethods}
      handleSetIsModalOpen={handleSetIsModalOpen}
      onAddEditPaymentMethod={onAddEditPaymentMethod}
      onDeletePaymentMethod={onDeletePaymentMethod}
    />
  );
};

export default PaymentMethods;
