import TitleAndSubtitle from "@/shared/components/molecules/titleAndSubtitle";
import ButtonWithIcon from "@/shared/components/molecules/buttonWithIcon";

interface UserMachineHeaderProps {
  canAddMachine: boolean;
  onAddMachine?: () => void;
}

const UserMachineHeader = ({
  canAddMachine,
  onAddMachine,
}: UserMachineHeaderProps) => {
  const renderTitle = () => {
    return (
      <TitleAndSubtitle
        title={{
          component: "h2",
          variant: "xl",
          weight: "bold",
          text: "Machines",
        }}
      />
    );
  };

  const renderAddMachineButton = () => {
    return (
      <ButtonWithIcon
        size="sm"
        label="Add Machine"
        iconName="plus"
        variant="default"
        disabled={!canAddMachine}
        onClick={onAddMachine}
      />
    );
  };

  return (
    <div className="module-header mb-2">
      {renderTitle()}
      {renderAddMachineButton()}
    </div>
  );
};

export default UserMachineHeader;
