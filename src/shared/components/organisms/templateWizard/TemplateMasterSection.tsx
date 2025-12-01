import TitleAndSubtitle from "@/shared/components/molecules/titleAndSubtitle";
import TemplateActionsBar from "./TemplateActionsBar";
import TemplateTable from "./TemplateTable";
import type {
  BaseTemplateRow,
  TemplateHeaderConfig,
  TemplateTableConfig,
} from "@/shared/types/templateWizard";
import type { ReactNode } from "react";

interface TemplateMasterSectionProps<TRow extends BaseTemplateRow> {
  data: TRow[];
  headerConfig: TemplateHeaderConfig;
  tableConfig: TemplateTableConfig<TRow>;
  onCreateTemplate?: () => void;
  onEditTemplate?: (row: TRow) => void;
  onDeleteTemplate?: (row: TRow) => void;
  enableSelection?: boolean;
  selectedRows?: TRow[];
  onSelectionChange?: (rows: TRow[]) => void;
  onDeleteSelected?: () => void;
  onAttachTemplates?: () => void;
  filterComponent?: ReactNode;
  isFilterApplied?: boolean;
}

const TemplateMasterSection = <TRow extends BaseTemplateRow>({
  data,
  headerConfig,
  tableConfig,
  onCreateTemplate,
  onEditTemplate,
  onDeleteTemplate,
  enableSelection,
  selectedRows,
  onSelectionChange,
  onDeleteSelected,
  onAttachTemplates,
  filterComponent,
  isFilterApplied,
}: TemplateMasterSectionProps<TRow>) => {
  const titleConfig = headerConfig.titleConfig;

  return (
    <>
      <div className="module-header">
        <TitleAndSubtitle
          title={{
            component: titleConfig?.component ?? "h2",
            variant: titleConfig?.variant ?? "3xl",
            weight: titleConfig?.weight ?? "bold",
            text: titleConfig?.text ?? headerConfig.title,
          }}
          subtitle={
            headerConfig.subtitle
              ? {
                  component: "p",
                  variant: "sm",
                  text: headerConfig.subtitle,
                }
              : undefined
          }
        />
        <TemplateActionsBar
          createButtonLabel={headerConfig.createButtonLabel}
          filterButtonLabel={headerConfig.filterButtonLabel}
          onCreateTemplate={onCreateTemplate}
          hasSelectedRows={!!selectedRows?.length}
          onDeleteSelected={onDeleteSelected}
          onAttachTemplates={onAttachTemplates}
          filterComponent={filterComponent}
          isFilterApplied={isFilterApplied}
        />
      </div>
      <TemplateTable
        data={data}
        config={tableConfig}
        onEdit={onEditTemplate}
        onDelete={onDeleteTemplate}
        enableSelection={enableSelection}
        onSelectionChange={onSelectionChange}
      />
    </>
  );
};

export default TemplateMasterSection;
