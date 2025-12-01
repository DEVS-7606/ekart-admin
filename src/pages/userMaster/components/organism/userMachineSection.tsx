import { useState } from "react";
import UserMachineHeader from "@/pages/userMaster/components/organism/userMachineHeader";
import UserMachineDataTable, {
  type UserMachine,
} from "@/pages/userMaster/components/organism/userMachineDataTable";
import UserMachineSelectionDialog from "@/pages/userMaster/components/organism/userMachineSelectionDialog";

interface UserMachineSectionProps {
  machines: UserMachine[];
  canAddMachines: boolean;
  onChange: (machines: UserMachine[]) => void;
}

const UserMachineSection = ({
  machines,
  canAddMachines,
  onChange,
}: UserMachineSectionProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  const handleSaveSelection = (selected: UserMachine[]) => {
    onChange(selected);
    setDialogOpen(false);
  };

  const handleDeleteMachine = (machine: UserMachine) => {
    if (!canAddMachines) return;
    onChange(
      machines.filter((m) => m.machineIdentifier !== machine.machineIdentifier)
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <UserMachineHeader
        canAddMachine={canAddMachines}
        onAddMachine={handleOpenDialog}
      />
      <UserMachineDataTable
        machines={machines}
        onDeleteMachine={handleDeleteMachine}
      />

      <UserMachineSelectionDialog
        open={dialogOpen}
        selectedMachines={machines}
        onOpenChange={handleOpenDialog}
        onSaveSelection={handleSaveSelection}
      />
    </div>
  );
};

export default UserMachineSection;
