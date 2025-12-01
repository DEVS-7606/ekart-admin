import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/shared/components/organisms/dataTable";
import { GenericDialog } from "@/shared/components/organisms/genericDialog";
import Badge from "@/shared/components/atoms/badge";
import TableActionCell from "@/shared/components/molecules/tableActionCell";

import type { IShippingMethod } from "@/pages/shipping-methods/type/shippingMethodMaster";

interface ShippingMethodDatatableProps {
  selectedShippingMethod: IShippingMethod | null;
  shippingMethods: IShippingMethod[];
  handleSetIsModalOpen: (value: boolean) => void;
  handleSetSelectedShippingMethod: (value: IShippingMethod | null) => void;
  onDeleteShippingMethod: () => void;
}

const ShippingMethodDatatable = ({
  selectedShippingMethod,
  shippingMethods,
  handleSetIsModalOpen,
  handleSetSelectedShippingMethod,
  onDeleteShippingMethod,
}: ShippingMethodDatatableProps) => {
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
    onDeleteShippingMethod();
    setIsDeleteDialogOpen(false);
  };

  const columns: ColumnDef<IShippingMethod>[] = [
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
      accessorKey: "carrier",
      header: () => renderCenteredHeader("Carrier"),
      cell: ({ row }) => (
        <div className="text-center w-full">{row.original.carrier || "-"}</div>
      ),
    },
    {
      accessorKey: "zone",
      header: () => renderCenteredHeader("Zone"),
      cell: ({ row }) => (
        <div className="text-center w-full">{row.original.zone || "-"}</div>
      ),
    },
    {
      accessorKey: "baseCharge",
      header: () => renderCenteredHeader("Base Charge"),
      cell: ({ row }) => (
        <div className="text-center w-full">
          {row.original.baseCharge != null ? row.original.baseCharge : "-"}
        </div>
      ),
    },
    {
      accessorKey: "perKgCharge",
      header: () => renderCenteredHeader("Per Kg"),
      cell: ({ row }) => (
        <div className="text-center w-full">
          {row.original.perKgCharge != null ? row.original.perKgCharge : "-"}
        </div>
      ),
    },
    {
      accessorKey: "estimatedDaysMin",
      header: () => renderCenteredHeader("ETA (days)"),
      cell: ({ row }) => (
        <div className="text-center w-full">
          {row.original.estimatedDaysMin != null &&
          row.original.estimatedDaysMax != null
            ? `${row.original.estimatedDaysMin}-${row.original.estimatedDaysMax}`
            : "-"}
        </div>
      ),
    },
    {
      accessorKey: "isCodSupported",
      header: () => renderCenteredHeader("COD"),
      cell: ({ row }) => (
        <div className="w-full flex items-center justify-center">
          <Badge className="font-light" variant="secondary">
            {row.original.isCodSupported ? "Yes" : "No"}
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
      cell: ({ row }) => (
        <TableActionCell
          onEdit={() => {
            handleSetIsModalOpen(true);
            handleSetSelectedShippingMethod(row.original);
          }}
          onDelete={() => {
            handleSetSelectedShippingMethod(row.original);
            toggleDeleteDialog();
          }}
          editAriaLabel={`Edit ${row.original.name}`}
          deleteAriaLabel={`Delete ${row.original.name}`}
        />
      ),
    },
  ];

  return (
    <>
      <DataTable<IShippingMethod>
        data={shippingMethods}
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
        title="Delete Shipping Method"
        description="Are you sure you want to delete this shipping method?"
        highlightText={selectedShippingMethod?.name}
      />
    </>
  );
};

export default ShippingMethodDatatable;
