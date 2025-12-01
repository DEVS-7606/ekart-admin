import ButtonWithIcon from "@/shared/components/molecules/buttonWithIcon";
import TitleAndSubtitle from "@/shared/components/molecules/titleAndSubtitle";

import type { ISupplier } from "@/pages/suppliers/type/supplierMaster";
import SupplierDatatable from "@/pages/suppliers/components/organisms/supplierDatatable";
import SupplierFormSheet from "@/pages/suppliers/components/organisms/supplierFormSheet";
import SupplierFilter from "@/pages/suppliers/components/organisms/supplierFilter";

interface SupplierMasterTemplateProps {
  suppliers: ISupplier[];
  selectedSupplier: ISupplier | null;
  isModalOpen: boolean;
  onAddEditSupplier: (values: ISupplier) => void;
  handleSetIsModalOpen: (value: boolean) => void;
  handleSetSuppliers: (value: ISupplier[]) => void;
  handleSetSelectedSupplier: (value: ISupplier | null) => void;
  onDeleteSupplier: () => void;
}

const SupplierMasterTemplate = ({
  suppliers,
  selectedSupplier,
  isModalOpen,
  handleSetSelectedSupplier,
  handleSetSuppliers,
  handleSetIsModalOpen,
  onAddEditSupplier,
  onDeleteSupplier,
}: SupplierMasterTemplateProps) => {
  const renderSectionHeader = () => {
    return (
      <div className="module-header">
        <TitleAndSubtitle
          title={{
            component: "h2",
            variant: "3xl",
            weight: "bold",
            text: "Suppliers",
          }}
          subtitle={{
            component: "p",
            variant: "sm",
            text: "Manage suppliers and vendors providing stock for your store.",
          }}
        />
        {renderButtons()}
      </div>
    );
  };

  const renderButtons = () => {
    return (
      <div className="module-header-buttons">
        <SupplierFilter data={suppliers} onFilterChange={handleSetSuppliers} />

        <ButtonWithIcon
          size="sm"
          variant="default"
          iconName="plus"
          label="Add New Supplier"
          onClick={() => {
            handleSetIsModalOpen(true);
            handleSetSelectedSupplier(null);
          }}
        />
      </div>
    );
  };

  const renderSupplierDatatable = () => {
    return (
      <SupplierDatatable
        suppliers={suppliers}
        handleSetIsModalOpen={handleSetIsModalOpen}
        handleSetSelectedSupplier={handleSetSelectedSupplier}
        onDeleteSupplier={onDeleteSupplier}
        selectedSupplier={selectedSupplier}
      />
    );
  };

  const renderFormSheet = () => {
    return (
      <SupplierFormSheet
        isModalOpen={isModalOpen}
        handleSetIsModalOpen={handleSetIsModalOpen}
        onSave={onAddEditSupplier}
        initialValues={selectedSupplier}
      />
    );
  };

  return (
    <>
      {renderSectionHeader()}
      {renderSupplierDatatable()}
      {renderFormSheet()}
    </>
  );
};

export default SupplierMasterTemplate;
