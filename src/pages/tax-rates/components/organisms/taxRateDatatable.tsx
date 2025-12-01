import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/shared/components/organisms/dataTable";
import { GenericDialog } from "@/shared/components/organisms/genericDialog";
import Badge from "@/shared/components/atoms/badge";
import TableActionCell from "@/shared/components/molecules/tableActionCell";

import type { ITaxRate } from "@/pages/tax-rates/type/taxRateMaster";

interface TaxRateDatatableProps {
  selectedTaxRate: ITaxRate | null;
  taxRates: ITaxRate[];
  handleSetIsModalOpen: (value: boolean) => void;
  handleSetSelectedTaxRate: (value: ITaxRate | null) => void;
  onDeleteTaxRate: () => void;
}

const TaxRateDatatable = ({
  selectedTaxRate,
  taxRates,
  handleSetIsModalOpen,
  handleSetSelectedTaxRate,
  onDeleteTaxRate,
}: TaxRateDatatableProps) => {
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
    onDeleteTaxRate();
    setIsDeleteDialogOpen(false);
  };

  const columns: ColumnDef<ITaxRate>[] = [
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
      accessorKey: "state",
      header: () => renderCenteredHeader("State"),
      cell: ({ row }) => (
        <div className="text-center w-full">{row.original.state || "-"}</div>
      ),
    },
    {
      accessorKey: "taxType",
      header: () => renderCenteredHeader("Tax Type"),
      cell: ({ row }) => (
        <div className="text-center w-full">{row.original.taxType || "-"}</div>
      ),
    },
    {
      accessorKey: "ratePercent",
      header: () => renderCenteredHeader("Rate %"),
      cell: ({ row }) => (
        <div className="text-center w-full">{row.original.ratePercent}%</div>
      ),
    },
    {
      accessorKey: "isInclusive",
      header: () => renderCenteredHeader("Inclusive"),
      cell: ({ row }) => (
        <div className="w-full flex items-center justify-center">
          <Badge className="font-light" variant="secondary">
            {row.original.isInclusive ? "Yes" : "No"}
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
              handleSetSelectedTaxRate(row.original);
            }}
            onDelete={() => {
              handleSetSelectedTaxRate(row.original);
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
      <DataTable<ITaxRate>
        data={taxRates}
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
        title="Delete Tax Rate"
        description="Are you sure you want to delete this tax rate?"
        highlightText={selectedTaxRate?.name}
      />
    </>
  );
};

export default TaxRateDatatable;
