import ButtonWithIcon from "@/shared/components/molecules/buttonWithIcon";
import TitleAndSubtitle from "@/shared/components/molecules/titleAndSubtitle";

import type { IShippingMethod } from "@/pages/shipping-methods/type/shippingMethodMaster";
import ShippingMethodDatatable from "@/pages/shipping-methods/components/organisms/shippingMethodDatatable";
import ShippingMethodFormSheet from "@/pages/shipping-methods/components/organisms/shippingMethodFormSheet";
import ShippingMethodFilter from "@/pages/shipping-methods/components/organisms/shippingMethodFilter";

interface ShippingMethodMasterTemplateProps {
  shippingMethods: IShippingMethod[];
  selectedShippingMethod: IShippingMethod | null;
  isModalOpen: boolean;
  onAddEditShippingMethod: (values: IShippingMethod) => void;
  handleSetIsModalOpen: (value: boolean) => void;
  handleSetShippingMethods: (value: IShippingMethod[]) => void;
  handleSetSelectedShippingMethod: (value: IShippingMethod | null) => void;
  onDeleteShippingMethod: () => void;
}

const ShippingMethodMasterTemplate = ({
  shippingMethods,
  selectedShippingMethod,
  isModalOpen,
  handleSetSelectedShippingMethod,
  handleSetShippingMethods,
  handleSetIsModalOpen,
  onAddEditShippingMethod,
  onDeleteShippingMethod,
}: ShippingMethodMasterTemplateProps) => {
  const renderSectionHeader = () => {
    return (
      <div className="module-header">
        <TitleAndSubtitle
          title={{
            component: "h2",
            variant: "3xl",
            weight: "bold",
            text: "Shipping Methods",
          }}
          subtitle={{
            component: "p",
            variant: "sm",
            text: "Manage shipping zones, carriers, and delivery options.",
          }}
        />
        {renderButtons()}
      </div>
    );
  };

  const renderButtons = () => {
    return (
      <div className="module-header-buttons">
        <ShippingMethodFilter
          data={shippingMethods}
          onFilterChange={handleSetShippingMethods}
        />

        <ButtonWithIcon
          size="sm"
          variant="default"
          iconName="plus"
          label="Add New Method"
          onClick={() => {
            handleSetIsModalOpen(true);
            handleSetSelectedShippingMethod(null);
          }}
        />
      </div>
    );
  };

  const renderShippingMethodDatatable = () => {
    return (
      <ShippingMethodDatatable
        shippingMethods={shippingMethods}
        handleSetIsModalOpen={handleSetIsModalOpen}
        handleSetSelectedShippingMethod={handleSetSelectedShippingMethod}
        onDeleteShippingMethod={onDeleteShippingMethod}
        selectedShippingMethod={selectedShippingMethod}
      />
    );
  };

  const renderFormSheet = () => {
    return (
      <ShippingMethodFormSheet
        isModalOpen={isModalOpen}
        handleSetIsModalOpen={handleSetIsModalOpen}
        onSave={onAddEditShippingMethod}
        initialValues={selectedShippingMethod}
      />
    );
  };

  return (
    <>
      {renderSectionHeader()}
      {renderShippingMethodDatatable()}
      {renderFormSheet()}
    </>
  );
};

export default ShippingMethodMasterTemplate;
