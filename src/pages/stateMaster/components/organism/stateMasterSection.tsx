import TitleAndSubtitle from "@/shared/components/molecules/titleAndSubtitle";
import ButtonWithIcon from "@/shared/components/molecules/buttonWithIcon";
import type { StateMasterSectionProps } from "../../interfaces";

const StateMasterSection = ({
  onAdd,
  onOpenFilters,
}: StateMasterSectionProps) => {
  return (
    <div className="module-header">
      <TitleAndSubtitle
        title={{
          component: "h2",
          variant: "3xl",
          weight: "bold",
          text: "State Master",
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
          label="Add new state"
        />
      </div>
    </div>
  );
};

export default StateMasterSection;
