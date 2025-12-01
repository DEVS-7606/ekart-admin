import { useState } from "react";
import { toast } from "sonner";

import DiscountMasterTemplate from "@/pages/discounts/components/template/discountMasterTemplate";
import type { IDiscount } from "@/pages/discounts/type/discountMaster";
import { MOCK_DISCOUNTS } from "@/shared/constants/discountMaster.constant";

const Discounts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discounts, setDiscounts] = useState<IDiscount[]>(MOCK_DISCOUNTS);
  const [selectedDiscount, setSelectedDiscount] = useState<IDiscount | null>(
    null
  );

  const handleSetDiscounts = (updatedDiscounts: IDiscount[]) => {
    setDiscounts(updatedDiscounts);
  };

  const handleSetSelectedDiscount = (discount: IDiscount | null) => {
    setSelectedDiscount(discount);
  };

  const handleSetIsModalOpen = (value: boolean) => {
    setIsModalOpen(value);
  };

  const onAddEditDiscount = (values: IDiscount) => {
    setDiscounts((previousDiscounts) => {
      if (selectedDiscount) {
        return previousDiscounts.map((discount) =>
          discount.code === selectedDiscount.code ? { ...values } : discount
        );
      }

      return [{ ...values }, ...previousDiscounts];
    });
    toast.success(
      `Discount ${selectedDiscount ? "updated" : "added"} successfully`
    );
    setSelectedDiscount(null);
    setIsModalOpen(false);
  };

  const onDeleteDiscount = () => {
    if (selectedDiscount) {
      setDiscounts((previousDiscounts) =>
        previousDiscounts.filter(
          (discount) => discount.code !== selectedDiscount.code
        )
      );
      toast.success("Discount deleted successfully");
      setSelectedDiscount(null);
    }
  };

  return (
    <DiscountMasterTemplate
      discounts={discounts}
      selectedDiscount={selectedDiscount}
      isModalOpen={isModalOpen}
      handleSetSelectedDiscount={handleSetSelectedDiscount}
      handleSetDiscounts={handleSetDiscounts}
      handleSetIsModalOpen={handleSetIsModalOpen}
      onAddEditDiscount={onAddEditDiscount}
      onDeleteDiscount={onDeleteDiscount}
    />
  );
};

export default Discounts;
