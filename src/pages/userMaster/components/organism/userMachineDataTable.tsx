import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/organisms/dataTable";
import Button from "@/shared/components/atoms/button";
import { Typography } from "@/shared/components/atoms/Typography";
import { Trash2 } from "lucide-react";

export interface UserMachine {
  srNo: number;
  name: string;
  machineIdentifier: string;
  customerLocation: string;
}

interface UserMachineDataTableProps {
  machines: UserMachine[];
  onDeleteMachine?: (machine: UserMachine) => void;
}

const useMachineColumns = (onDeleteMachine?: (machine: UserMachine) => void) =>
  useMemo<ColumnDef<UserMachine>[]>(
    () => [
      {
        accessorKey: "name",
        header: () => (
          <Typography component="p" variant="sm" weight="medium">
            Machine Name
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
        accessorKey: "machineIdentifier",
        header: () => (
          <Typography component="p" variant="sm" weight="medium">
            Machine Identifier
          </Typography>
        ),
        cell: ({ row }) => (
          <Typography component="p" variant="sm" className="text-center">
            {row.original.machineIdentifier}
          </Typography>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "customerLocation",
        header: () => (
          <Typography component="p" variant="sm" weight="medium">
            Location
          </Typography>
        ),
        cell: ({ row }) => (
          <Typography component="p" variant="sm" className="text-center">
            {row.original.customerLocation}
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
              aria-label={`Delete machine ${row.original.machineIdentifier}`}
              className="text-red-500"
              onClick={() => onDeleteMachine?.(row.original)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ),
        enableSorting: false,
      },
    ],
    [onDeleteMachine]
  );

const UserMachineDataTable = ({
  machines,
  onDeleteMachine,
}: UserMachineDataTableProps) => {
  const columns = useMachineColumns(onDeleteMachine);

  return (
    <DataTable<UserMachine>
      data={machines}
      columns={columns}
      options={{
        enablePagination: true,
        enableSearching: false,
      }}
    />
  );
};

export default UserMachineDataTable;
