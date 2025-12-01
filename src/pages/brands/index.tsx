import { useState } from "react";
import { toast } from "sonner";

import BrandMasterTemplate from "@/pages/brands/components/template/brandMasterTemplate";
import type { IBrand } from "@/pages/brands/type/brandMaster";
import { MOCK_BRANDS } from "@/shared/constants/brandMaster.constant";

const Brands = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brands, setBrands] = useState<IBrand[]>(MOCK_BRANDS);
  const [selectedBrand, setSelectedBrand] = useState<IBrand | null>(null);

  const handleSetBrands = (updatedBrands: IBrand[]) => {
    setBrands(updatedBrands);
  };

  const handleSetSelectedBrand = (brand: IBrand | null) => {
    setSelectedBrand(brand);
  };

  const handleSetIsModalOpen = (value: boolean) => {
    setIsModalOpen(value);
  };

  const onAddEditBrand = (values: IBrand) => {
    setBrands((previousBrands) => {
      if (selectedBrand) {
        return previousBrands.map((brand) =>
          brand.code === selectedBrand.code ? { ...values } : brand
        );
      }

      return [{ ...values }, ...previousBrands];
    });
    toast.success(`Brand ${selectedBrand ? "updated" : "added"} successfully`);
    setSelectedBrand(null);
    setIsModalOpen(false);
  };

  const onDeleteBrand = () => {
    if (selectedBrand) {
      setBrands((previousBrands) =>
        previousBrands.filter((brand) => brand.code !== selectedBrand.code)
      );
      toast.success("Brand deleted successfully");
      setSelectedBrand(null);
    }
  };

  return (
    <BrandMasterTemplate
      brands={brands}
      selectedBrand={selectedBrand}
      isModalOpen={isModalOpen}
      handleSetSelectedBrand={handleSetSelectedBrand}
      handleSetBrands={handleSetBrands}
      handleSetIsModalOpen={handleSetIsModalOpen}
      onAddEditBrand={onAddEditBrand}
      onDeleteBrand={onDeleteBrand}
    />
  );
};

export default Brands;
