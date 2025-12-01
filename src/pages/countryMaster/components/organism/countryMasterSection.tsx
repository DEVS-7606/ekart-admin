import ButtonWithIcon from "@/shared/components/molecules/buttonWithIcon";
import type { CountryMasterSectionProps } from "@/pages/countryMaster/interfaces";
import TitleAndSubtitle from "@/shared/components/molecules/titleAndSubtitle";

const CountryMasterSection = ({
  onAdd,
  onOpenFilters,
}: CountryMasterSectionProps) => {
  return (
    <div className="module-header">
      <TitleAndSubtitle
        title={{
          component: "h2",
          variant: "3xl",
          weight: "bold",
          text: "Country Master",
        }}
      />

      <div className="module-header-buttons">
        <ButtonWithIcon
          size="sm"
          iconName="filter"
          onClick={onOpenFilters}
          variant="outline"
          label="Filters"
        />
        <ButtonWithIcon
          size="sm"
          iconName="plus"
          onClick={onAdd}
          variant="default"
          label="Add new country"
        />
      </div>
    </div>
  );
};

export default CountryMasterSection;
