import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/organisms/dataTable";
import Switch from "@/shared/components/atoms/switch";
import TableActionCell from "@/shared/components/molecules/tableActionCell";

export type User = {
  id: number;
  name: string;
  role: string;
  customer: string;
  mobile: string;
  email: string;
  active: boolean;
  machineCodes?: string[];
};

interface UsersDataTableProps {
  data: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onToggleStatus: (user: User) => void;
}

const useUserColumns = (
  onEdit: (u: User) => void,
  onDelete: (u: User) => void,
  onToggleStatus: (u: User) => void
) =>
  useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "name",
        header: () => <div className="text-center">Name</div>,
        cell: ({ row }) => (
          <div className="text-center font-medium">{row.original.name}</div>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "role",
        header: () => <div className="text-center">Role</div>,
        cell: ({ row }) => (
          <div className="text-center text-primary">{row.original.role}</div>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "customer",
        header: () => <div className="text-center">Customer</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.original.customer}</div>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "mobile",
        header: () => <div className="text-center">Mobile Number</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.original.mobile}</div>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "email",
        header: () => <div className="text-center">Email ID</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.original.email}</div>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "active",
        header: () => <div className="text-center">Status</div>,
        cell: ({ row }) => (
          <div className="flex justify-center">
            <Switch
              checked={row.original.active}
              onCheckedChange={() => onToggleStatus(row.original)}
              aria-label={
                row.original.active
                  ? `Deactivate user ${row.original.name}`
                  : `Activate user ${row.original.name}`
              }
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=unchecked]:bg-muted data-[state=unchecked]:border-border"
            />
          </div>
        ),
        enableSorting: false,
      },
      {
        id: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => (
          <TableActionCell
            onEdit={() => onEdit(row.original)}
            onDelete={() => onDelete(row.original)}
            editAriaLabel={`Edit ${row.original.name}`}
            deleteAriaLabel={`Delete ${row.original.name}`}
          />
        ),
        enableSorting: false,
      },
    ],
    [onEdit, onDelete, onToggleStatus]
  );

const UsersDataTable = ({
  data,
  onEdit,
  onDelete,
  onToggleStatus,
}: UsersDataTableProps) => {
  const columns = useUserColumns(onEdit, onDelete, onToggleStatus);

  return <DataTable<User> data={data} columns={columns} />;
};

export default UsersDataTable;
