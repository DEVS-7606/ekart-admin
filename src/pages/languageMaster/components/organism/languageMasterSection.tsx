import TitleAndSubtitle from "@/shared/components/molecules/titleAndSubtitle";
import ButtonWithIcon from "@/shared/components/molecules/buttonWithIcon";
import type { LanguageMasterSectionProps } from "../../interfaces";

const LanguageMasterSection = ({ onAdd }: LanguageMasterSectionProps) => {
  return (
    <div className="module-header">
      <TitleAndSubtitle
        title={{
          component: "h2",
          variant: "3xl",
          weight: "bold",
          text: "Language Master",
        }}
      />

      <div className="module-header-buttons">
        <ButtonWithIcon
          size="sm"
          variant="default"
          iconName="plus"
          onClick={onAdd}
          label="Add New Language"
        />
      </div>
    </div>
  );
};

export default LanguageMasterSection;
