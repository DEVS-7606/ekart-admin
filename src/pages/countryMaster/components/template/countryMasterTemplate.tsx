import CountryMasterSection from "@/pages/countryMaster/components/organism/countryMasterSection";
import CountryDataTable from "@/pages/countryMaster/components/organism/countryDataTable";
import CountryFormSheet from "@/pages/countryMaster/components/organism/countryFormSheet";
import { Toaster } from "@/shared/components/shadcn/sonner";
import { GenericDialog } from "@/shared/components/organisms/genericDialog";
import type { CountryMasterTemplateProps } from "@/pages/countryMaster/interfaces";

export default function CountryMasterTemplate({
  countries,
  formOpen,
  formMode,
  formInitialValues,
  onAdd,
  onEdit,
  onDelete,
  onFormOpenChange,
  onFormSubmit,
  deleteDialogOpen,
  deleteDialogCountry,
  onDeleteDialogOpenChange,
  onConfirmDelete,
}: CountryMasterTemplateProps) {
  return (
    <>
      <CountryMasterSection onAdd={onAdd} />
      <CountryDataTable data={countries} onEdit={onEdit} onDelete={onDelete} />
      <CountryFormSheet
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
        title="Delete Country"
        description="Are you sure you want to delete this "
        highlightText={deleteDialogCountry?.name}
      />
      <Toaster richColors position="top-center" theme="light" />
    </>
  );
}
