import { useState } from "react";
import { toast } from "sonner";

import TaxRateMasterTemplate from "@/pages/tax-rates/components/template/taxRateMasterTemplate";
import type { ITaxRate } from "@/pages/tax-rates/type/taxRateMaster";
import { MOCK_TAX_RATES } from "@/shared/constants/taxRateMaster.constant";

const TaxRates = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taxRates, setTaxRates] = useState<ITaxRate[]>(MOCK_TAX_RATES);
  const [selectedTaxRate, setSelectedTaxRate] = useState<ITaxRate | null>(null);

  const handleSetTaxRates = (updatedTaxRates: ITaxRate[]) => {
    setTaxRates(updatedTaxRates);
  };

  const handleSetSelectedTaxRate = (taxRate: ITaxRate | null) => {
    setSelectedTaxRate(taxRate);
  };

  const handleSetIsModalOpen = (value: boolean) => {
    setIsModalOpen(value);
  };

  const onAddEditTaxRate = (values: ITaxRate) => {
    setTaxRates((previousTaxRates) => {
      if (selectedTaxRate) {
        return previousTaxRates.map((rate) =>
          rate.code === selectedTaxRate.code ? { ...values } : rate
        );
      }

      return [{ ...values }, ...previousTaxRates];
    });
    toast.success(
      `Tax rate ${selectedTaxRate ? "updated" : "added"} successfully`
    );
    setSelectedTaxRate(null);
    setIsModalOpen(false);
  };

  const onDeleteTaxRate = () => {
    if (selectedTaxRate) {
      setTaxRates((previousTaxRates) =>
        previousTaxRates.filter((rate) => rate.code !== selectedTaxRate.code)
      );
      toast.success("Tax rate deleted successfully");
      setSelectedTaxRate(null);
    }
  };

  return (
    <TaxRateMasterTemplate
      taxRates={taxRates}
      selectedTaxRate={selectedTaxRate}
      isModalOpen={isModalOpen}
      handleSetSelectedTaxRate={handleSetSelectedTaxRate}
      handleSetTaxRates={handleSetTaxRates}
      handleSetIsModalOpen={handleSetIsModalOpen}
      onAddEditTaxRate={onAddEditTaxRate}
      onDeleteTaxRate={onDeleteTaxRate}
    />
  );
};

export default TaxRates;
