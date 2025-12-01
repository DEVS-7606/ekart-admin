import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/shared/components/organisms/dataTable";
import { GenericDialog } from "@/shared/components/organisms/genericDialog";
import Badge from "@/shared/components/atoms/badge";
import TableActionCell from "@/shared/components/molecules/tableActionCell";

import type { ICategory } from "@/pages/categories/type/categoryMaster";

interface CategoryDatatableProps {
  selectedCategory: ICategory | null;
  categories: ICategory[];
  handleSetIsModalOpen: (value: boolean) => void;
  handleSetSelectedCategory: (value: ICategory | null) => void;
  onDeleteCategory: () => void;
}

const CategoryDatatable = ({
  selectedCategory,
  categories,
  handleSetIsModalOpen,
  handleSetSelectedCategory,
  onDeleteCategory,
}: CategoryDatatableProps) => {
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
    onDeleteCategory();
    setIsDeleteDialogOpen(false);
  };

  const getParentName = (parentCode?: string | null) => {
    if (!parentCode) return "-";
    const parent = categories.find((category) => category.code === parentCode);
    return parent?.name ?? parentCode;
  };

  const columns: ColumnDef<ICategory>[] = [
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
      accessorKey: "parentCode",
      header: () => renderCenteredHeader("Parent Category"),
      cell: ({ row }) => (
        <div className="text-center w-full">
          {getParentName(row.original.parentCode)}
        </div>
      ),
    },
    {
      accessorKey: "level",
      header: () => renderCenteredHeader("Level"),
      cell: ({ row }) => (
        <div className="text-center w-full">{row.original.level}</div>
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
              handleSetSelectedCategory(row.original);
            }}
            onDelete={() => {
              handleSetSelectedCategory(row.original);
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
      <DataTable<ICategory>
        data={categories}
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
        title="Delete Category"
        description="Are you sure you want to delete this category?"
        highlightText={selectedCategory?.name}
      />
    </>
  );
};

export default CategoryDatatable;
