import { Toaster } from "@/shared/components/shadcn/sonner";
import type { User } from "@/pages/userMaster/components/organism/userDataTable";
import UsersDataTable from "@/pages/userMaster/components/organism/userDataTable";
import type { UserFormValues } from "@/pages/userMaster/components/organism/userFormSheet";
import UsersFormSheet from "@/pages/userMaster/components/organism/userFormSheet";
import UserMasterSectionHeader from "@/pages/userMaster/components/organism/userMasterSectionHeader";
import UserDeleteDialog from "@/pages/userMaster/components/organism/userDeleteDialog";

interface UsersMasterTemplateProps {
  users: User[];
  open: boolean;
  mode: "add" | "edit";
  initialValues?: UserFormValues;
  onAdd: () => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onToggleStatus: (user: User) => void;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: UserFormValues) => void;
  onUserFormChange?: (values: UserFormValues) => void;
  deleteDialogOpen: boolean;
  deleteDialogUser: User | null;
  onDeleteDialogOpenChange: () => void;
  onConfirmDelete: () => void;
  onFiltersChange: (users: User[]) => void;
}

export default function UsersMasterTemplate({
  users,
  open,
  mode,
  initialValues,
  onAdd,
  onEdit,
  onDelete,
  onToggleStatus,
  onOpenChange,
  onSubmit,
  onUserFormChange,
  deleteDialogOpen,
  deleteDialogUser,
  onDeleteDialogOpenChange,
  onConfirmDelete,
  onFiltersChange,
}: UsersMasterTemplateProps) {
  return (
    <>
      <Toaster richColors position="top-center" theme="light" />
      <UserMasterSectionHeader
        onAdd={onAdd}
        users={users}
        onFiltersChange={onFiltersChange}
      />
      <UsersDataTable
        data={users}
        onEdit={onEdit}
        onDelete={onDelete}
        onToggleStatus={onToggleStatus}
      />
      <UsersFormSheet
        open={open}
        onOpenChange={onOpenChange}
        mode={mode}
        initialValues={initialValues}
        onSubmit={onSubmit}
        onUserFormChange={onUserFormChange}
      />
      <UserDeleteDialog
        open={deleteDialogOpen}
        title="Delete User"
        user={deleteDialogUser}
        onOpenChange={onDeleteDialogOpenChange}
        onConfirm={onConfirmDelete}
      />
    </>
  );
}
