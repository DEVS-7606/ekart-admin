import { useState } from "react";
import { toast } from "sonner";

import SupplierMasterTemplate from "@/pages/suppliers/components/template/supplierMasterTemplate";
import type { ISupplier } from "@/pages/suppliers/type/supplierMaster";
import { MOCK_SUPPLIERS } from "@/shared/constants/supplierMaster.constant";

const Suppliers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suppliers, setSuppliers] = useState<ISupplier[]>(MOCK_SUPPLIERS);
  const [selectedSupplier, setSelectedSupplier] = useState<ISupplier | null>(
    null
  );

  const handleSetSuppliers = (updatedSuppliers: ISupplier[]) => {
    setSuppliers(updatedSuppliers);
  };

  const handleSetSelectedSupplier = (supplier: ISupplier | null) => {
    setSelectedSupplier(supplier);
  };

  const handleSetIsModalOpen = (value: boolean) => {
    setIsModalOpen(value);
  };

  const onAddEditSupplier = (values: ISupplier) => {
    setSuppliers((previousSuppliers) => {
      if (selectedSupplier) {
        return previousSuppliers.map((supplier) =>
          supplier.code === selectedSupplier.code ? { ...values } : supplier
        );
      }

      return [{ ...values }, ...previousSuppliers];
    });
    toast.success(
      `Supplier ${selectedSupplier ? "updated" : "added"} successfully`
    );
    setSelectedSupplier(null);
    setIsModalOpen(false);
  };

  const onDeleteSupplier = () => {
    if (selectedSupplier) {
      setSuppliers((previousSuppliers) =>
        previousSuppliers.filter(
          (supplier) => supplier.code !== selectedSupplier.code
        )
      );
      toast.success("Supplier deleted successfully");
      setSelectedSupplier(null);
    }
  };

  return (
    <SupplierMasterTemplate
      suppliers={suppliers}
      selectedSupplier={selectedSupplier}
      isModalOpen={isModalOpen}
      handleSetSelectedSupplier={handleSetSelectedSupplier}
      handleSetSuppliers={handleSetSuppliers}
      handleSetIsModalOpen={handleSetIsModalOpen}
      onAddEditSupplier={onAddEditSupplier}
      onDeleteSupplier={onDeleteSupplier}
    />
  );
};

export default Suppliers;
