import TitleAndSubtitle from "@/shared/components/molecules/titleAndSubtitle";
import ButtonWithIcon from "@/shared/components/molecules/buttonWithIcon";

interface RoleMasterSectionProps {
  onAdd?: () => void;
}

const RoleMasterSectionHeader = ({ onAdd }: RoleMasterSectionProps) => {
  return (
    <div className="module-header">
      <TitleAndSubtitle
        title={{
          component: "h2",
          variant: "3xl",
          weight: "bold",
          text: "Role Master",
        }}
      />

      <div className="module-header-buttons">
        <ButtonWithIcon
          iconName="plus"
          size="sm"
          onClick={onAdd}
          label="Add new role"
        />
      </div>
    </div>
  );
};

export default RoleMasterSectionHeader;
