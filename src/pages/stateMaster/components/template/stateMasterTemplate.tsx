import StateMasterSection from "../organism/stateMasterSection";
import StateDataTable from "../organism/stateDataTable";
import StateFormSheet from "../organism/stateFormSheet";
import { Toaster } from "@/shared/components/shadcn/sonner";
import { GenericDialog } from "@/shared/components/organisms/genericDialog";
import type { StateMasterTemplateProps } from "../../interfaces";

export default function StateMasterTemplate({
  states,
  formOpen,
  formMode,
  formInitialValues,
  onAdd,
  onEdit,
  onDelete,
  onFormOpenChange,
  onFormSubmit,
  deleteDialogOpen,
  deleteDialogState,
  onDeleteDialogOpenChange,
  onConfirmDelete,
}: StateMasterTemplateProps) {
  return (
    <>
      <StateMasterSection onAdd={onAdd} />
      <StateDataTable data={states} onEdit={onEdit} onDelete={onDelete} />
      <StateFormSheet
        open={formOpen}
        onOpenChange={onFormOpenChange}
        mode={formMode}
        initialValues={formInitialValues}
        onSubmit={onFormSubmit}
      />
      <GenericDialog
        open={deleteDialogOpen}
        onOpenChange={onDeleteDialogOpenChange}
        onConfirm={onConfirmDelete}
        title="Delete State"
        description="Are you sure you want to delete this "
        highlightText={deleteDialogState?.name}
      />
      <Toaster richColors position="top-center" theme="light" />
    </>
  );
}
