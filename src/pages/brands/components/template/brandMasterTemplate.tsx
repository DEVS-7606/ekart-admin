import ButtonWithIcon from "@/shared/components/molecules/buttonWithIcon";
import TitleAndSubtitle from "@/shared/components/molecules/titleAndSubtitle";

import type { IBrand } from "@/pages/brands/type/brandMaster";
import BrandDatatable from "@/pages/brands/components/organisms/brandDatatable";
import BrandFormSheet from "@/pages/brands/components/organisms/brandFormSheet";
import BrandFilter from "@/pages/brands/components/organisms/brandFilter";

interface BrandMasterTemplateProps {
  brands: IBrand[];
  selectedBrand: IBrand | null;
  isModalOpen: boolean;
  onAddEditBrand: (values: IBrand) => void;
  handleSetIsModalOpen: (value: boolean) => void;
  handleSetBrands: (value: IBrand[]) => void;
  handleSetSelectedBrand: (value: IBrand | null) => void;
  onDeleteBrand: () => void;
}

const BrandMasterTemplate = ({
  brands,
  selectedBrand,
  isModalOpen,
  handleSetSelectedBrand,
  handleSetBrands,
  handleSetIsModalOpen,
  onAddEditBrand,
  onDeleteBrand,
}: BrandMasterTemplateProps) => {
  const renderSectionHeader = () => {
    return (
      <div className="module-header">
        <TitleAndSubtitle
          title={{
            component: "h2",
            variant: "3xl",
            weight: "bold",
            text: "Brands",
          }}
          subtitle={{
            component: "p",
            variant: "sm",
            text: "Manage product brands and manufacturers for your catalog.",
          }}
        />
        {renderButtons()}
      </div>
    );
  };

  const renderButtons = () => {
    return (
      <div className="module-header-buttons">
        <BrandFilter data={brands} onFilterChange={handleSetBrands} />

        <ButtonWithIcon
          size="sm"
          variant="default"
          iconName="plus"
          label="Add New Brand"
          onClick={() => {
            handleSetIsModalOpen(true);
            handleSetSelectedBrand(null);
          }}
        />
      </div>
    );
  };

  const renderBrandDatatable = () => {
    return (
      <BrandDatatable
        brands={brands}
        handleSetIsModalOpen={handleSetIsModalOpen}
        handleSetSelectedBrand={handleSetSelectedBrand}
        onDeleteBrand={onDeleteBrand}
        selectedBrand={selectedBrand}
      />
    );
  };

  const renderFormSheet = () => {
    return (
      <BrandFormSheet
        isModalOpen={isModalOpen}
        handleSetIsModalOpen={handleSetIsModalOpen}
        onSave={onAddEditBrand}
        initialValues={selectedBrand}
      />
    );
  };

  return (
    <>
      {renderSectionHeader()}
      {renderBrandDatatable()}
      {renderFormSheet()}
    </>
  );
};

export default BrandMasterTemplate;
