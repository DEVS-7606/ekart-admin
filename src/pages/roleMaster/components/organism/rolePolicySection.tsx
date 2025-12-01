import { useState } from "react";
import RolePolicyHeader from "@/pages/roleMaster/components/organism/rolePolicyHeader";
import RolePolicyDataTable, {
  type RolePolicy,
} from "@/pages/roleMaster/components/organism/rolePolicyDataTable";
import RolePolicySelectionDialog from "@/pages/roleMaster/components/organism/rolePolicySelectionDialog";

interface RolePolicySectionProps {
  policies: RolePolicy[];
  canAddPolicies: boolean;
  onChange: (policies: RolePolicy[]) => void;
}

const RolePolicySection = ({
  policies,
  canAddPolicies,
  onChange,
}: RolePolicySectionProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  const handleSaveSelection = (selected: RolePolicy[]) => {
    onChange(selected);
    setDialogOpen(false);
  };

  const handleDeletePolicy = (policy: RolePolicy) => {
    if (!canAddPolicies) return;
    onChange(policies.filter((p) => p.id !== policy.id));
  };

  return (
    <div className="flex flex-col gap-3">
      <RolePolicyHeader
        canAddPolicy={canAddPolicies}
        onAddPolicy={handleOpenDialog}
      />
      <RolePolicyDataTable
        policies={policies}
        onDeletePolicy={handleDeletePolicy}
      />

      <RolePolicySelectionDialog
        open={dialogOpen}
        selectedPolicies={policies}
        onOpenChange={handleOpenDialog}
        onSaveSelection={handleSaveSelection}
      />
    </div>
  );
};

export default RolePolicySection;