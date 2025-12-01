import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/shared/components/organisms/dataTable";
import { GenericDialog } from "@/shared/components/organisms/genericDialog";
import Badge from "@/shared/components/atoms/badge";
import TableActionCell from "@/shared/components/molecules/tableActionCell";

import type { ISupplier } from "@/pages/suppliers/type/supplierMaster";

interface SupplierDatatableProps {
  selectedSupplier: ISupplier | null;
  suppliers: ISupplier[];
  handleSetIsModalOpen: (value: boolean) => void;
  handleSetSelectedSupplier: (value: ISupplier | null) => void;
  onDeleteSupplier: () => void;
}

const SupplierDatatable = ({
  selectedSupplier,
  suppliers,
  handleSetIsModalOpen,
  handleSetSelectedSupplier,
  onDeleteSupplier,
}: SupplierDatatableProps) => {
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
    onDeleteSupplier();
    setIsDeleteDialogOpen(false);
  };

  const columns: ColumnDef<ISupplier>[] = [
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
      accessorKey: "contactName",
      header: () => renderCenteredHeader("Contact"),
      cell: ({ row }) => (
        <div className="text-center w-full">
          {row.original.contactName || "-"}
        </div>
      ),
    },
    {
      accessorKey: "phone",
      header: () => renderCenteredHeader("Phone"),
      cell: ({ row }) => (
        <div className="text-center w-full">{row.original.phone || "-"}</div>
      ),
    },
    {
      accessorKey: "leadTimeDays",
      header: () => renderCenteredHeader("Lead Time (days)"),
      cell: ({ row }) => (
        <div className="text-center w-full">
          {row.original.leadTimeDays ?? "-"}
        </div>
      ),
    },
    {
      accessorKey: "paymentTerms",
      header: () => renderCenteredHeader("Payment Terms"),
      cell: ({ row }) => (
        <div className="text-center w-full">
          {row.original.paymentTerms || "-"}
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
              handleSetSelectedSupplier(row.original);
            }}
            onDelete={() => {
              handleSetSelectedSupplier(row.original);
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
      <DataTable<ISupplier>
        data={suppliers}
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
        title="Delete Supplier"
        description="Are you sure you want to delete this supplier?"
        highlightText={selectedSupplier?.name}
      />
    </>
  );
};

export default SupplierDatatable;
