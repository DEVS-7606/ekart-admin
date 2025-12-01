import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/organisms/dataTable";
import { Typography } from "@/shared/components/atoms/Typography";
import type { State } from "../../types";
import type { StateDataTableProps } from "../../interfaces";
import TableActionCell from "@/shared/components/molecules/tableActionCell";

const useStateColumns = (
  onEdit: (s: State) => void,
  onDelete: (s: State) => void
) =>
  useMemo<ColumnDef<State>[]>(
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
            Code
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
        accessorKey: "country",
        header: () => (
          <Typography component="p" variant="sm" weight="medium">
            Country
          </Typography>
        ),
        cell: ({ row }) => (
          <Typography component="p" variant="sm" className="text-center">
            {row.original.country ?? "-"}
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
            editAriaLabel={`Edit state ${row.original.id}`}
            deleteAriaLabel={`Delete state ${row.original.id}`}
          />
        ),
        enableSorting: false,
      },
    ],
    [onEdit, onDelete]
  );

const StateDataTable = ({ data, onEdit, onDelete }: StateDataTableProps) => {
  const columns = useStateColumns(onEdit, onDelete);

  return (
    <DataTable<State>
      data={data}
      columns={columns}
      options={{
        visiblePages: 3,
      }}
    />
  );
};

export default StateDataTable;
