import ButtonWithIcon from "@/shared/components/molecules/buttonWithIcon";
import TitleAndSubtitle from "@/shared/components/molecules/titleAndSubtitle";

import type { ITaxRate } from "@/pages/tax-rates/type/taxRateMaster";
import TaxRateDatatable from "@/pages/tax-rates/components/organisms/taxRateDatatable";
import TaxRateFormSheet from "@/pages/tax-rates/components/organisms/taxRateFormSheet";
import TaxRateFilter from "@/pages/tax-rates/components/organisms/taxRateFilter";

interface TaxRateMasterTemplateProps {
  taxRates: ITaxRate[];
  selectedTaxRate: ITaxRate | null;
  isModalOpen: boolean;
  onAddEditTaxRate: (values: ITaxRate) => void;
  handleSetIsModalOpen: (value: boolean) => void;
  handleSetTaxRates: (value: ITaxRate[]) => void;
  handleSetSelectedTaxRate: (value: ITaxRate | null) => void;
  onDeleteTaxRate: () => void;
}

const TaxRateMasterTemplate = ({
  taxRates,
  selectedTaxRate,
  isModalOpen,
  handleSetSelectedTaxRate,
  handleSetTaxRates,
  handleSetIsModalOpen,
  onAddEditTaxRate,
  onDeleteTaxRate,
}: TaxRateMasterTemplateProps) => {
  const renderSectionHeader = () => {
    return (
      <div className="module-header">
        <TitleAndSubtitle
          title={{
            component: "h2",
            variant: "3xl",
            weight: "bold",
            text: "Tax Rates",
          }}
          subtitle={{
            component: "p",
            variant: "sm",
            text: "Configure tax regions and rates applied to orders.",
          }}
        />
        {renderButtons()}
      </div>
    );
  };

  const renderButtons = () => {
    return (
      <div className="module-header-buttons">
        <TaxRateFilter data={taxRates} onFilterChange={handleSetTaxRates} />

        <ButtonWithIcon
          size="sm"
          variant="default"
          iconName="plus"
          label="Add New Tax Rate"
          onClick={() => {
            handleSetIsModalOpen(true);
            handleSetSelectedTaxRate(null);
          }}
        />
      </div>
    );
  };

  const renderTaxRateDatatable = () => {
    return (
      <TaxRateDatatable
        taxRates={taxRates}
        handleSetIsModalOpen={handleSetIsModalOpen}
        handleSetSelectedTaxRate={handleSetSelectedTaxRate}
        onDeleteTaxRate={onDeleteTaxRate}
        selectedTaxRate={selectedTaxRate}
      />
    );
  };

  const renderFormSheet = () => {
    return (
      <TaxRateFormSheet
        isModalOpen={isModalOpen}
        handleSetIsModalOpen={handleSetIsModalOpen}
        onSave={onAddEditTaxRate}
        initialValues={selectedTaxRate}
      />
    );
  };

  return (
    <>
      {renderSectionHeader()}
      {renderTaxRateDatatable()}
      {renderFormSheet()}
    </>
  );
};

export default TaxRateMasterTemplate;
