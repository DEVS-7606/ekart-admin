import ButtonWithIcon from "@/shared/components/molecules/buttonWithIcon";
import TitleAndSubtitle from "@/shared/components/molecules/titleAndSubtitle";

import type { IDiscount } from "@/pages/discounts/type/discountMaster";
import DiscountDatatable from "@/pages/discounts/components/organisms/discountDatatable";
import DiscountFormSheet from "@/pages/discounts/components/organisms/discountFormSheet";
import DiscountFilter from "@/pages/discounts/components/organisms/discountFilter";

interface DiscountMasterTemplateProps {
  discounts: IDiscount[];
  selectedDiscount: IDiscount | null;
  isModalOpen: boolean;
  onAddEditDiscount: (values: IDiscount) => void;
  handleSetIsModalOpen: (value: boolean) => void;
  handleSetDiscounts: (value: IDiscount[]) => void;
  handleSetSelectedDiscount: (value: IDiscount | null) => void;
  onDeleteDiscount: () => void;
}

const DiscountMasterTemplate = ({
  discounts,
  selectedDiscount,
  isModalOpen,
  handleSetSelectedDiscount,
  handleSetDiscounts,
  handleSetIsModalOpen,
  onAddEditDiscount,
  onDeleteDiscount,
}: DiscountMasterTemplateProps) => {
  const renderSectionHeader = () => {
    return (
      <div className="module-header">
        <TitleAndSubtitle
          title={{
            component: "h2",
            variant: "3xl",
            weight: "bold",
            text: "Discounts",
          }}
          subtitle={{
            component: "p",
            variant: "sm",
            text: "Manage discount types, promo codes, and campaign rules.",
          }}
        />
        {renderButtons()}
      </div>
    );
  };

  const renderButtons = () => {
    return (
      <div className="module-header-buttons">
        <DiscountFilter data={discounts} onFilterChange={handleSetDiscounts} />

        <ButtonWithIcon
          size="sm"
          variant="default"
          iconName="plus"
          label="Add New Discount"
          onClick={() => {
            handleSetIsModalOpen(true);
            handleSetSelectedDiscount(null);
          }}
        />
      </div>
    );
  };

  const renderDiscountDatatable = () => {
    return (
      <DiscountDatatable
        discounts={discounts}
        handleSetIsModalOpen={handleSetIsModalOpen}
        handleSetSelectedDiscount={handleSetSelectedDiscount}
        onDeleteDiscount={onDeleteDiscount}
        selectedDiscount={selectedDiscount}
      />
    );
  };

  const renderFormSheet = () => {
    return (
      <DiscountFormSheet
        isModalOpen={isModalOpen}
        handleSetIsModalOpen={handleSetIsModalOpen}
        onSave={onAddEditDiscount}
        initialValues={selectedDiscount}
      />
    );
  };

  return (
    <>
      {renderSectionHeader()}
      {renderDiscountDatatable()}
      {renderFormSheet()}
    </>
  );
};

export default DiscountMasterTemplate;
