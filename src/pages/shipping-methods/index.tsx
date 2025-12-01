import { useState } from "react";
import { toast } from "sonner";

import ShippingMethodMasterTemplate from "@/pages/shipping-methods/components/template/shippingMethodMasterTemplate";
import type { IShippingMethod } from "@/pages/shipping-methods/type/shippingMethodMaster";
import { MOCK_SHIPPING_METHODS } from "@/shared/constants/shippingMethodMaster.constant";

const ShippingMethods = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shippingMethods, setShippingMethods] = useState<IShippingMethod[]>(
    MOCK_SHIPPING_METHODS
  );
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<IShippingMethod | null>(null);

  const handleSetShippingMethods = (updatedMethods: IShippingMethod[]) => {
    setShippingMethods(updatedMethods);
  };

  const handleSetSelectedShippingMethod = (method: IShippingMethod | null) => {
    setSelectedShippingMethod(method);
  };

  const handleSetIsModalOpen = (value: boolean) => {
    setIsModalOpen(value);
  };

  const onAddEditShippingMethod = (values: IShippingMethod) => {
    setShippingMethods((previousMethods) => {
      if (selectedShippingMethod) {
        return previousMethods.map((method) =>
          method.code === selectedShippingMethod.code ? { ...values } : method
        );
      }

      return [{ ...values }, ...previousMethods];
    });
    toast.success(
      `Shipping method ${
        selectedShippingMethod ? "updated" : "added"
      } successfully`
    );
    setSelectedShippingMethod(null);
    setIsModalOpen(false);
  };

  const onDeleteShippingMethod = () => {
    if (selectedShippingMethod) {
      setShippingMethods((previousMethods) =>
        previousMethods.filter(
          (method) => method.code !== selectedShippingMethod.code
        )
      );
      toast.success("Shipping method deleted successfully");
      setSelectedShippingMethod(null);
    }
  };

  return (
    <ShippingMethodMasterTemplate
      shippingMethods={shippingMethods}
      selectedShippingMethod={selectedShippingMethod}
      isModalOpen={isModalOpen}
      handleSetSelectedShippingMethod={handleSetSelectedShippingMethod}
      handleSetShippingMethods={handleSetShippingMethods}
      handleSetIsModalOpen={handleSetIsModalOpen}
      onAddEditShippingMethod={onAddEditShippingMethod}
      onDeleteShippingMethod={onDeleteShippingMethod}
    />
  );
};

export default ShippingMethods;
