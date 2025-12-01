import LanguageMasterSection from "../organism/languageMasterSection";
import LanguageDataTable from "../organism/languageDataTable";
import LanguageFormSheet from "../organism/languageFormSheet";
import { Toaster } from "@/shared/components/shadcn/sonner";
import { GenericDialog } from "@/shared/components/organisms/genericDialog";
import type { LanguageMasterTemplateProps } from "../../interfaces";

export default function LanguageMasterTemplate({
  languages,
  formOpen,
  formMode,
  formInitialValues,
  onAdd,
  onEdit,
  onDelete,
  onFormOpenChange,
  onFormSubmit,
  deleteDialogOpen,
  deleteDialogLanguage,
  onDeleteDialogOpenChange,
  onConfirmDelete,
  language,
  onChangeLanguageLabels,
}: LanguageMasterTemplateProps) {
  return (
    <>
      <LanguageMasterSection onAdd={onAdd} />
      <LanguageDataTable data={languages} onEdit={onEdit} onDelete={onDelete} />
      <LanguageFormSheet
        open={formOpen}
        onOpenChange={onFormOpenChange}
        mode={formMode}
        initialValues={formInitialValues}
        onSubmit={onFormSubmit}
        language={language}
        onChangeLanguageLabels={onChangeLanguageLabels}
      />
      <GenericDialog
        open={deleteDialogOpen}
        onOpenChange={onDeleteDialogOpenChange}
        onConfirm={onConfirmDelete}
        title="Delete Language"
        description="Are you sure you want to delete this "
        highlightText={deleteDialogLanguage?.name}
      />
      <Toaster richColors position="top-center" theme="light" />
    </>
  );
}
