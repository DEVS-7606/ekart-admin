import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/organisms/dataTable";
import { Typography } from "@/shared/components/atoms/Typography";
import type { Language } from "@/pages/languageMaster/types";
import type { LanguageDataTableProps } from "@/pages/languageMaster/interfaces";
import TableActionCell from "@/shared/components/molecules/tableActionCell";

const useLanguageColumns = (
  onEdit: (language: Language) => void,
  onDelete: (language: Language) => void
) =>
  useMemo<ColumnDef<Language>[]>(
    () => [
      {
        accessorKey: "name",
        header: () => (
          <Typography component="p" variant="sm" weight="medium">
            Name
          </Typography>
        ),
        cell: ({ row }) => (
          <Typography component="p" variant="sm" className="text-center">
            {row.original.name}
          </Typography>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "code",
        header: () => (
          <Typography component="p" variant="sm" weight="medium">
            Language Code
          </Typography>
        ),
        cell: ({ row }) => (
          <Typography component="p" variant="sm" className="text-center">
            {row.original.code}
          </Typography>
        ),
        enableSorting: false,
      },
      {
        id: "actions",
        header: () => (
          <Typography component="p" variant="sm" weight="medium">
            Actions
          </Typography>
        ),
        cell: ({ row }) => (
          <TableActionCell
            onEdit={() => onEdit(row.original)}
            onDelete={() => onDelete(row.original)}
            editAriaLabel={`Edit language ${row.original.id}`}
            deleteAriaLabel={`Delete language ${row.original.id}`}
          />
        ),
        enableSorting: false,
      },
    ],
    [onEdit, onDelete]
  );

const LanguageDataTable = ({
  data,
  onEdit,
  onDelete,
}: LanguageDataTableProps) => {
  const columns = useLanguageColumns(onEdit, onDelete);

  return (
    <DataTable<Language>
      data={data}
      columns={columns}
      options={{
        visiblePages: 3,
      }}
    />
  );
};

export default LanguageDataTable;
