import { useState } from "react";
import { MOCK_ROLES } from "@/shared/constants/roleMaster.constant";
import type { Role, RoleFormValues } from "@/pages/roleMaster/types";
import RoleMasterTemplate from "@/pages/roleMaster/components/template/roleMasterTemplate";
import { toast } from "sonner";

export default function RoleMaster() {
  const [isRoleFormOpen, setIsRoleFormOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [roles, setRoles] = useState<Role[]>(() => MOCK_ROLES);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleAdd = () => {
    setSelectedRole(null);
    setIsRoleFormOpen(true);
  };

  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    setIsRoleFormOpen(true);
  };

  const handleDelete = (role: Role) => {
    setSelectedRole(role);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogOpenChange = () => {
    setDeleteDialogOpen(!deleteDialogOpen);
  };

  const handleConfirmDelete = () => {
    if (!selectedRole) return;

    setRoles((prevRoles) => prevRoles.filter((r) => r.id !== selectedRole.id));
    setDeleteDialogOpen(false);
    toast.success("Role deleted successfully");
  };

  const updateSelectedRole = (
    values: RoleFormValues,
    options?: { showToast?: boolean }
  ) => {
    if (!selectedRole) return;

    const { name, description, policyIds = [] } = values;

    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.id === selectedRole.id
          ? {
              ...role,
              name,
              description,
              policyIds,
              policies: policyIds.length,
            }
          : role
      )
    );

    setSelectedRole((prev) =>
      prev
        ? {
            ...prev,
            name,
            description,
            policyIds,
            policies: policyIds.length,
          }
        : prev
    );

    if (options?.showToast) {
      toast.success("Role updated successfully");
    }
  };

  const handleRoleFormChange = (values: RoleFormValues) => {
    // Sync form changes to the selected role without showing any toast
    updateSelectedRole(values, { showToast: false });
  };

  const handleSubmit = (values: RoleFormValues) => {
    const { name, description, policyIds = [] } = values;

    if (selectedRole) {
      // Update existing role with user-initiated save (show toast)
      updateSelectedRole(values, { showToast: true });
    } else {
      // Create new role
      setRoles((prevRoles) => {
        const nextId = prevRoles.length
          ? Math.max(...prevRoles.map((role) => role.id)) + 1
          : 1;

        const newRole: Role = {
          id: nextId,
          name,
          description,
          policyIds,
          policies: policyIds.length,
        };

        setSelectedRole(newRole);

        return [newRole, ...prevRoles];
      });

      toast.success("Role added successfully");
    }

    // setIsRoleFormOpen(false);
  };

  const formInitialValues = selectedRole
    ? {
        name: selectedRole.name,
        description: selectedRole.description ?? "",
        policyIds: selectedRole.policyIds ?? [],
      }
    : undefined;

  return (
    <RoleMasterTemplate
      roles={roles}
      selectedRole={selectedRole}
      formOpen={isRoleFormOpen}
      formInitialValues={formInitialValues}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onFormOpenChange={setIsRoleFormOpen}
      onFormSubmit={handleSubmit}
      onRoleFormChange={handleRoleFormChange}
      deleteDialogOpen={deleteDialogOpen}
      onDeleteDialogOpenChange={handleDeleteDialogOpenChange}
      onConfirmDelete={handleConfirmDelete}
    />
  );
}
