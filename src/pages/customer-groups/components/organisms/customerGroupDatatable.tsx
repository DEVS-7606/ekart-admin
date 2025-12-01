import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/shared/components/organisms/dataTable";
import { GenericDialog } from "@/shared/components/organisms/genericDialog";
import Badge from "@/shared/components/atoms/badge";
import TableActionCell from "@/shared/components/molecules/tableActionCell";

import type { ICustomerGroup } from "@/pages/customer-groups/type/customerGroupMaster";

interface CustomerGroupDatatableProps {
  selectedCustomerGroup: ICustomerGroup | null;
  customerGroups: ICustomerGroup[];
  handleSetIsModalOpen: (value: boolean) => void;
  handleSetSelectedCustomerGroup: (value: ICustomerGroup | null) => void;
  onDeleteCustomerGroup: () => void;
}

const CustomerGroupDatatable = ({
  selectedCustomerGroup,
  customerGroups,
  handleSetIsModalOpen,
  handleSetSelectedCustomerGroup,
  onDeleteCustomerGroup,
}: CustomerGroupDatatableProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const renderCenteredHeader = (label: string) => (
    <div className="w-full text-center text-sm font-medium text-muted-foreground">
      {label}
    </div>
  );

  const toggleDeleteDialog = () => {
    setIsDeleteDialogOpen((previous) => !previous);
  };

  const handleConfirmDelete = () => {
    onDeleteCustomerGroup();
    setIsDeleteDialogOpen(false);
  };

  const columns: ColumnDef<ICustomerGroup>[] = [
    {
      accessorKey: "name",
      header: () => renderCenteredHeader("Name"),
      cell: ({ row }) => (
        <div className="text-center w-full">
          <span className="font-semibold text-foreground">
            {row.original.name}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "code",
      header: () => renderCenteredHeader("Code"),
      cell: ({ row }) => (
        <div className="text-center w-full">{row.original.code}</div>
      ),
    },
    {
      accessorKey: "groupType",
      header: () => renderCenteredHeader("Group Type"),
      cell: ({ row }) => (
        <div className="text-center w-full">
          {row.original.groupType || "-"}
        </div>
      ),
    },
    {
      accessorKey: "discountPercent",
      header: () => renderCenteredHeader("Discount %"),
      cell: ({ row }) => (
        <div className="text-center w-full">
          {row.original.discountPercent != null
            ? `${row.original.discountPercent}%`
            : "-"}
        </div>
      ),
    },
    {
      accessorKey: "minOrderValue",
      header: () => renderCenteredHeader("Min Order Value"),
      cell: ({ row }) => (
        <div className="text-center w-full">
          {row.original.minOrderValue != null
            ? row.original.minOrderValue
            : "-"}
        </div>
      ),
    },
    {
      accessorKey: "isDefault",
      header: () => renderCenteredHeader("Default"),
      cell: ({ row }) => (
        <div className="w-full flex items-center justify-center">
          <Badge className="font-light" variant="secondary">
            {row.original.isDefault ? "Yes" : "No"}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "isActive",
      header: () => renderCenteredHeader("Status"),
      cell: ({ row }) => (
        <div className="w-full flex items-center justify-center">
          <Badge
            className="font-light"
            variant={row.original.isActive ? "secondary" : "outline"}
          >
            {row.original.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      ),
    },
    {
      id: "actions",
      header: () => renderCenteredHeader("Actions"),
      cell: ({ row }) => {
        return (
          <TableActionCell
            onEdit={() => {
              handleSetIsModalOpen(true);
              handleSetSelectedCustomerGroup(row.original);
            }}
            onDelete={() => {
              handleSetSelectedCustomerGroup(row.original);
              toggleDeleteDialog();
            }}
            editAriaLabel={`Edit ${row.original.name}`}
            deleteAriaLabel={`Delete ${row.original.name}`}
          />
        );
      },
    },
  ];

  return (
    <>
      <DataTable<ICustomerGroup>
        data={customerGroups}
        columns={columns}
        options={{
          enableSorting: false,
          enablePagination: true,
          visiblePages: 5,
        }}
      />

      <GenericDialog
        open={isDeleteDialogOpen}
        onOpenChange={toggleDeleteDialog}
        onConfirm={handleConfirmDelete}
        title="Delete Customer Group"
        description="Are you sure you want to delete this customer group?"
        highlightText={selectedCustomerGroup?.name}
      />
    </>
  );
};

export default CustomerGroupDatatable;
