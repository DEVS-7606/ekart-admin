import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/organisms/dataTable";
import Button from "@/shared/components/atoms/button";
import { Typography } from "@/shared/components/atoms/Typography";
import { Trash2 } from "lucide-react";

export interface RolePolicy {
  id: number;
  name: string;
}

interface RolePolicyDataTableProps {
  policies: RolePolicy[];
  onDeletePolicy?: (policy: RolePolicy) => void;
}

const usePolicyColumns = (onDeletePolicy?: (policy: RolePolicy) => void) =>
  useMemo<ColumnDef<RolePolicy>[]>(
    () => [
      {
        accessorKey: "name",
        header: () => (
          <Typography component="p" variant="sm" weight="medium">
            Policy Name
          </Typography>
        ),
        cell: ({ row }) => (
          <Typography component="p" variant="sm">
            {row.original.name}
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
          <div className="flex items-center justify-center">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={`Delete policy ${row.original.id}`}
              className="text-red-500"
              onClick={() => onDeletePolicy?.(row.original)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ),
        enableSorting: false,
      },
    ],
    [onDeletePolicy]
  );

const RolePolicyDataTable = ({
  policies,
  onDeletePolicy,
}: RolePolicyDataTableProps) => {
  const columns = usePolicyColumns(onDeletePolicy);

  return (
    <DataTable<RolePolicy>
      data={policies}
      columns={columns}
      options={{
        enablePagination: true,
        enableSearching: false,
      }}
    />
  );
};

export default RolePolicyDataTable;
