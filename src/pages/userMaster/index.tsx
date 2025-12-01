import { useState } from "react";
import UserMasterTemplate from "@/pages/userMaster/components/template/userMaster";
import { MOCK_USERS } from "@/shared/constants/userMaster.constant";
import type { User } from "@/pages/userMaster/components/organism/userDataTable";
import type { UserFormValues } from "@/pages/userMaster/components/organism/userFormSheet";
import { toast } from "sonner";

export default function UserMaster() {
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(() => MOCK_USERS);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleAdd = () => {
    setSelectedUser(null);
    setIsUserFormOpen(true);
  };

  const handleEdit = (u: User) => {
    setSelectedUser(u);
    setIsUserFormOpen(true);
  };

  const handleDelete = (u: User) => {
    setSelectedUser(u);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogOpenChange = () => {
    setDeleteDialogOpen((prev) => !prev);
  };

  const handleToggleStatus = (u: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === u.id ? { ...user, active: !user.active } : user
      )
    );
  };

  const updateSelectedUser = (
    values: UserFormValues,
    options?: { showToast?: boolean }
  ) => {
    if (!selectedUser) return;

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === selectedUser.id ? { ...user, ...values } : user
      )
    );

    setSelectedUser((prev) => (prev ? { ...prev, ...values } : prev));

    if (options?.showToast) {
      toast.success("User updated successfully");
    }
  };

  const handleUserFormChange = (values: UserFormValues) => {
    // Sync form changes to the selected user without showing any toast
    updateSelectedUser(values, { showToast: false });
  };

  const handleFormSubmit = (values: UserFormValues) => {
    const isEdit = Boolean(selectedUser);
    const isAdmin = values.role === "Admin";

    if (isEdit && selectedUser) {
      // Update existing user and keep selectedUser in sync with saved values
      const updatedUser: User = { ...selectedUser, ...values };

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? updatedUser : user
        )
      );

      setSelectedUser(updatedUser);
    } else {
      // Create new user
      setUsers((prevUsers) => {
        const nextId =
          prevUsers.length > 0
            ? Math.max(...prevUsers.map((user) => user.id)) + 1
            : 1;

        const newUser: User = { id: nextId, ...values };
        setSelectedUser(newUser);

        return [newUser, ...prevUsers];
      });
    }

    if (isEdit) {
      toast.success("User updated successfully");
    } else {
      toast.success("User created successfully");
    }

    if (isAdmin) {
      // For Admin role, close the form after save (both add and edit)
      setIsUserFormOpen(false);
      setSelectedUser(null);
    }

    // For User role, keep the form open to allow managing machines
  };

  const handleConfirmDelete = () => {
    if (!selectedUser) return;

    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== selectedUser.id)
    );
    setDeleteDialogOpen(false);
    setSelectedUser(null);
    toast.success("User deleted successfully");
  };

  const initialValues: UserFormValues | undefined = selectedUser
    ? {
        name: selectedUser.name,
        role: selectedUser.role,
        customer: selectedUser.customer,
        mobile: selectedUser.mobile,
        email: selectedUser.email,
        active: selectedUser.active,
        machineCodes: selectedUser.machineCodes ?? [],
      }
    : undefined;

  const mode: "add" | "edit" = selectedUser ? "edit" : "add";

  return (
    <UserMasterTemplate
      users={users}
      open={isUserFormOpen}
      mode={mode}
      initialValues={initialValues}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onOpenChange={setIsUserFormOpen}
      onToggleStatus={handleToggleStatus}
      onSubmit={handleFormSubmit}
      onUserFormChange={handleUserFormChange}
      onDeleteDialogOpenChange={handleDeleteDialogOpenChange}
      deleteDialogOpen={deleteDialogOpen}
      deleteDialogUser={selectedUser}
      onConfirmDelete={handleConfirmDelete}
      onFiltersChange={setUsers}
    />
  );
}
