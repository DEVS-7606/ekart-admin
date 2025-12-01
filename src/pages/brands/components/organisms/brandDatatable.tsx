import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/shared/components/organisms/dataTable";
import { GenericDialog } from "@/shared/components/organisms/genericDialog";
import Badge from "@/shared/components/atoms/badge";
import TableActionCell from "@/shared/components/molecules/tableActionCell";

import type { IBrand } from "@/pages/brands/type/brandMaster";

interface BrandDatatableProps {
  selectedBrand: IBrand | null;
  brands: IBrand[];
  handleSetIsModalOpen: (value: boolean) => void;
  handleSetSelectedBrand: (value: IBrand | null) => void;
  onDeleteBrand: () => void;
}

const BrandDatatable = ({
  selectedBrand,
  brands,
  handleSetIsModalOpen,
  handleSetSelectedBrand,
  onDeleteBrand,
}: BrandDatatableProps) => {
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
    onDeleteBrand();
    setIsDeleteDialogOpen(false);
  };

  const columns: ColumnDef<IBrand>[] = [
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
      accessorKey: "country",
      header: () => renderCenteredHeader("Country"),
      cell: ({ row }) => (
        <div className="text-center w-full">{row.original.country || "-"}</div>
      ),
    },
    {
      accessorKey: "website",
      header: () => renderCenteredHeader("Website"),
      cell: ({ row }) => (
        <div className="text-center w-full">
          {row.original.website ? row.original.website : "-"}
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
              handleSetSelectedBrand(row.original);
            }}
            onDelete={() => {
              handleSetSelectedBrand(row.original);
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
      <DataTable<IBrand>
        data={brands}
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
        title="Delete Brand"
        description="Are you sure you want to delete this brand?"
        highlightText={selectedBrand?.name}
      />
    </>
  );
};

export default BrandDatatable;
