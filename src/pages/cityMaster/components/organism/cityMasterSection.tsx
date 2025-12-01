import TitleAndSubtitle from "@/shared/components/molecules/titleAndSubtitle";
import ButtonWithIcon from "@/shared/components/molecules/buttonWithIcon";
import type { CityMasterSectionProps } from "../../interfaces";

const CityMasterSection = ({
  onAdd,
  onOpenFilters,
}: CityMasterSectionProps) => {
  return (
    <div className="module-header">
      <TitleAndSubtitle
        title={{
          component: "h2",
          variant: "3xl",
          weight: "bold",
          text: "City Master",
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
          label="Add new city"
        />
      </div>
    </div>
  );
};

export default CityMasterSection;
