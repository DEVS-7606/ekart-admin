import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/shared/components/organisms/dataTable";
import { GenericDialog } from "@/shared/components/organisms/genericDialog";
import Badge from "@/shared/components/atoms/badge";
import TableActionCell from "@/shared/components/molecules/tableActionCell";

import type { IDiscount } from "@/pages/discounts/type/discountMaster";

interface DiscountDatatableProps {
  selectedDiscount: IDiscount | null;
  discounts: IDiscount[];
  handleSetIsModalOpen: (value: boolean) => void;
  handleSetSelectedDiscount: (value: IDiscount | null) => void;
  onDeleteDiscount: () => void;
}

const DiscountDatatable = ({
  selectedDiscount,
  discounts,
  handleSetIsModalOpen,
  handleSetSelectedDiscount,
  onDeleteDiscount,
}: DiscountDatatableProps) => {
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
    onDeleteDiscount();
    setIsDeleteDialogOpen(false);
  };

  const columns: ColumnDef<IDiscount>[] = [
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
      accessorKey: "type",
      header: () => renderCenteredHeader("Type"),
      cell: ({ row }) => (
        <div className="text-center w-full">{row.original.type}</div>
      ),
    },
    {
      accessorKey: "value",
      header: () => renderCenteredHeader("Value"),
      cell: ({ row }) => (
        <div className="text-center w-full">
          {row.original.type === "percentage"
            ? `${row.original.value}%`
            : row.original.type === "fixed"
            ? row.original.value
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
      accessorKey: "startDate",
      header: () => renderCenteredHeader("Start Date"),
      cell: ({ row }) => (
        <div className="text-center w-full">
          {row.original.startDate || "-"}
        </div>
      ),
    },
    {
      accessorKey: "endDate",
      header: () => renderCenteredHeader("End Date"),
      cell: ({ row }) => (
        <div className="text-center w-full">{row.original.endDate || "-"}</div>
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
            handleSetSelectedDiscount(row.original);
          }}
          onDelete={() => {
            handleSetSelectedDiscount(row.original);
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
      <DataTable<IDiscount>
        data={discounts}
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
        title="Delete Discount"
        description="Are you sure you want to delete this discount?"
        highlightText={selectedDiscount?.name}
      />
    </>
  );
};

export default DiscountDatatable;
