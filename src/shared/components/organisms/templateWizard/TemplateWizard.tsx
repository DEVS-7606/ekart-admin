import { Toaster } from "@/shared/components/shadcn/sonner";
import TemplateMasterSection from "./TemplateMasterSection";
import TemplateFormSheet from "./TemplateFormSheet";
import TemplateDeleteDialog from "./TemplateDeleteDialog";
import type { TemplateWizardProps } from "@/shared/types/templateWizard";
import type {
  BaseTemplateRow,
  BaseTemplateFormValues,
} from "@/shared/types/templateWizard";

const TemplateWizard = <
  TRow extends BaseTemplateRow,
  TFormValues extends BaseTemplateFormValues
>({
  data,
  openForm,
  mode,
  initialValues,
  onCreateTemplate,
  onFormOpenChange,
  onEditTemplate,
  onDeleteTemplate,
  onSubmit,
  deleteDialogOpen,
  deleteDialogRow,
  toggleDeleteDialog,
  confirmDelete,
  tableConfig,
  headerConfig,
  deleteDialogConfig,
  FormComponent,
  enableSelection,
  selectedRows,
  onSelectionChange,
  onDeleteSelected,
  onAttachTemplates,
  applyLayout = true,
  filterComponent,
  isFilterApplied,
}: TemplateWizardProps<TRow, TFormValues>) => {
  const content = (
    <>
      <TemplateMasterSection
        data={data}
        headerConfig={headerConfig}
        tableConfig={tableConfig}
        onCreateTemplate={onCreateTemplate}
        onEditTemplate={onEditTemplate}
        onDeleteTemplate={onDeleteTemplate}
        enableSelection={enableSelection}
        selectedRows={selectedRows}
        onSelectionChange={onSelectionChange}
        onDeleteSelected={onDeleteSelected}
        onAttachTemplates={onAttachTemplates}
        filterComponent={filterComponent}
        isFilterApplied={isFilterApplied}
      />
      <TemplateFormSheet
        open={openForm}
        onOpenChange={onFormOpenChange}
        mode={mode}
        initialValues={initialValues}
        onSubmit={onSubmit}
        FormComponent={FormComponent}
      />
      <TemplateDeleteDialog
        open={deleteDialogOpen}
        config={deleteDialogConfig}
        row={deleteDialogRow}
        onOpenChange={toggleDeleteDialog}
        onConfirm={confirmDelete}
      />
      <Toaster richColors position="top-center" theme="light" />
    </>
  );

  if (!applyLayout) {
    return content;
  }

  return content;
};

export default TemplateWizard;
