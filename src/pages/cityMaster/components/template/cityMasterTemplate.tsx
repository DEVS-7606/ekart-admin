import CityMasterSection from "../organism/cityMasterSection";
import CityDataTable from "../organism/cityDataTable";
import CityFormSheet from "../organism/cityFormSheet";
import { Toaster } from "@/shared/components/shadcn/sonner";
import { GenericDialog } from "@/shared/components/organisms/genericDialog";
import type { CityMasterTemplateProps } from "../../interfaces";

export default function CityMasterTemplate({
  cities,
  formOpen,
  formMode,
  formInitialValues,
  onAdd,
  onEdit,
  onDelete,
  onFormOpenChange,
  onFormSubmit,
  deleteDialogOpen,
  deleteDialogCity,
  onDeleteDialogOpenChange,
  onConfirmDelete,
}: CityMasterTemplateProps) {
  return (
    <>
      <CityMasterSection onAdd={onAdd} />
      <CityDataTable data={cities} onEdit={onEdit} onDelete={onDelete} />
      <CityFormSheet
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
        title="Delete City"
        description="Are you sure you want to delete this "
        highlightText={deleteDialogCity?.name}
      />
      <Toaster richColors position="top-center" theme="light" />
    </>
  );
}
