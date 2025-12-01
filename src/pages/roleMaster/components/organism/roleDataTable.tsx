import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/organisms/dataTable";
import { Typography } from "@/shared/components/atoms/Typography";
import type { Role } from "@/pages/roleMaster/types";
import TableActionCell from "@/shared/components/molecules/tableActionCell";

interface RoleDataTableProps {
  data: Role[];
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
}

const useRoleColumns = (
  onEdit: (r: Role) => void,
  onDelete: (r: Role) => void
) =>
  useMemo<ColumnDef<Role>[]>(
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
        accessorKey: "description",
        header: () => (
          <Typography component="p" variant="sm" weight="medium">
            Description
          </Typography>
        ),
        cell: ({ row }) => (
          <Typography
            component="p"
            variant="sm"
            className="text-center text-gray-700"
          >
            {row.original.description || "-"}
          </Typography>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "policies",
        header: () => (
          <Typography component="p" variant="sm" weight="medium">
            Policies
          </Typography>
        ),
        cell: ({ row }) => (
          <Typography component="p" variant="sm" className="text-center">
            {row.original.policies ?? "-"}
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
            editAriaLabel={`Edit role ${row.original.id}`}
            deleteAriaLabel={`Delete role ${row.original.id}`}
          />
        ),
        enableSorting: false,
      },
    ],
    [onEdit, onDelete]
  );

const RoleDataTable = ({ data, onEdit, onDelete }: RoleDataTableProps) => {
  const columns = useRoleColumns(onEdit, onDelete);

  return (
    <DataTable<Role>
      data={data}
      columns={columns}
      options={{
        enablePagination: true,
        enableSearching: false,
      }}
    />
  );
};

export default RoleDataTable;
