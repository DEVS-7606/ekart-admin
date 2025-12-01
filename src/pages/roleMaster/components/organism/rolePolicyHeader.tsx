import TitleAndSubtitle from "@/shared/components/molecules/titleAndSubtitle";
import ButtonWithIcon from "@/shared/components/molecules/buttonWithIcon";

interface RolePolicyHeaderProps {
  canAddPolicy: boolean;
  onAddPolicy?: () => void;
}

const RolePolicyHeader = ({
  canAddPolicy,
  onAddPolicy,
}: RolePolicyHeaderProps) => {
  const renderTitle = () => {
    return (
      <TitleAndSubtitle
        title={{
          component: "h2",
          variant: "xl",
          weight: "bold",
          text: "Policies",
        }}
      />
    );
  };

  const renderAddPolicyButton = () => {
    return (
      <ButtonWithIcon
        size="sm"
        label="Add Policy"
        iconName="plus"
        variant="default"
        disabled={!canAddPolicy}
        onClick={onAddPolicy}
      />
    );
  };

  return (
    <div className="module-header mb-2">
      {renderTitle()}
      {renderAddPolicyButton()}
    </div>
  );
};

export default RolePolicyHeader;
