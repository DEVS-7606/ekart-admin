import { GenericDialog } from "@/shared/components/organisms/genericDialog";
import type { Role, RoleFormValues } from "@/pages/roleMaster/types";
import type { TemplateMode } from "@/shared/types";
import RoleDataTable from "../organism/roleDataTable";
import RoleFormSheet from "../organism/roleFormSheet";
import RoleMasterSectionHeader from "@/pages/roleMaster/components/organism/roleMasterSectionHeader";

interface RoleMasterTemplateProps {
  roles: Role[];
  selectedRole: Role | null;
  formOpen: boolean;
  formInitialValues?: Partial<RoleFormValues>;
  onAdd: () => void;
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
  onFormOpenChange: (open: boolean) => void;
  onFormSubmit: (values: RoleFormValues) => void;
  onRoleFormChange: (values: RoleFormValues) => void;
  deleteDialogOpen: boolean;
  onDeleteDialogOpenChange: () => void;
  onConfirmDelete: () => void;
}

export default function RoleMasterTemplate({
  roles,
  selectedRole,
  formOpen,
  formInitialValues,
  onAdd,
  onEdit,
  onDelete,
  onFormOpenChange,
  onFormSubmit,
  onRoleFormChange,
  deleteDialogOpen,
  onDeleteDialogOpenChange,
  onConfirmDelete,
}: RoleMasterTemplateProps) {
  const formMode: TemplateMode = selectedRole ? "edit" : "create";
  const canEditPolicies = Boolean(selectedRole);

  return (
    <>
      <RoleMasterSectionHeader onAdd={onAdd} />
      <RoleDataTable data={roles} onEdit={onEdit} onDelete={onDelete} />
      <RoleFormSheet
        open={formOpen}
        onOpenChange={onFormOpenChange}
        mode={formMode}
        initialValues={formInitialValues}
        canEditPolicies={canEditPolicies}
        onRoleFormChange={onRoleFormChange}
        onSubmit={onFormSubmit}
      />
      <GenericDialog
        open={deleteDialogOpen}
        onOpenChange={onDeleteDialogOpenChange}
        onConfirm={onConfirmDelete}
        title="Delete Role"
        description="Are you sure you want to delete this role?"
        highlightText={selectedRole?.name}
      />
    </>
  );
}
