import { useMemo } from "react";
import { DataTable } from "@/shared/components/organisms/dataTable";
import type { ColumnDef } from "@tanstack/react-table";
import type {
  BaseTemplateRow,
  TemplateTableConfig,
} from "@/shared/types/templateWizard";
import TableActionCell from "@/shared/components/molecules/tableActionCell";

interface TemplateTableProps<TRow extends BaseTemplateRow> {
  data: TRow[];
  config: TemplateTableConfig<TRow>;
  onEdit?: (row: TRow) => void;
  onDelete?: (row: TRow) => void;
  enableSelection?: boolean;
  onSelectionChange?: (rows: TRow[]) => void;
}

const TemplateTable = <TRow extends BaseTemplateRow>({
  data,
  config,
  onEdit,
  onDelete,
  enableSelection,
  onSelectionChange,
}: TemplateTableProps<TRow>) => {
  const columns = useMemo<ColumnDef<TRow>[]>(() => {
    const customColumns = config.columns(onEdit, onDelete);

    // Add actions column
    const actionsColumn: ColumnDef<TRow> = {
      id: "actions",
      header: () => <div className="text-center">Actions</div>,
      cell: ({ row }) => (
        <TableActionCell
          onEdit={() => onEdit?.(row.original)}
          onDelete={() => onDelete?.(row.original)}
          editAriaLabel={`Edit ${row.original.name}`}
          deleteAriaLabel={`Delete ${row.original.name}`}
        />
      ),
      enableSorting: false,
    };

    return [...customColumns, actionsColumn];
  }, [config, onEdit, onDelete]);

  return (
    <DataTable<TRow>
      key={data.length}
      data={data}
      columns={columns}
      options={{
        enablePagination: config.enablePagination ?? true,
        enableSorting: config.enableSorting ?? true,
        visiblePages: (config.visiblePages ?? 5) as 3 | 5,
        pageSizes: config.pageSizes,
        enableSelection: enableSelection,
      }}
      onRowSelectionChange={onSelectionChange}
    />
  );
};

export default TemplateTable;
