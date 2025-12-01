import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/shared/components/organisms/dataTable";
import { GenericDialog } from "@/shared/components/organisms/genericDialog";
import Badge from "@/shared/components/atoms/badge";
import TableActionCell from "@/shared/components/molecules/tableActionCell";

import type { IPaymentMethod } from "@/pages/payment-methods/type/paymentMethodMaster";

interface PaymentMethodDatatableProps {
  selectedPaymentMethod: IPaymentMethod | null;
  paymentMethods: IPaymentMethod[];
  handleSetIsModalOpen: (value: boolean) => void;
  handleSetSelectedPaymentMethod: (value: IPaymentMethod | null) => void;
  onDeletePaymentMethod: () => void;
}

const PaymentMethodDatatable = ({
  selectedPaymentMethod,
  paymentMethods,
  handleSetIsModalOpen,
  handleSetSelectedPaymentMethod,
  onDeletePaymentMethod,
}: PaymentMethodDatatableProps) => {
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
    onDeletePaymentMethod();
    setIsDeleteDialogOpen(false);
  };

  const columns: ColumnDef<IPaymentMethod>[] = [
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
      accessorKey: "methodType",
      header: () => renderCenteredHeader("Type"),
      cell: ({ row }) => (
        <div className="text-center w-full">{row.original.methodType}</div>
      ),
    },
    {
      accessorKey: "provider",
      header: () => renderCenteredHeader("Provider"),
      cell: ({ row }) => (
        <div className="text-center w-full">{row.original.provider || "-"}</div>
      ),
    },
    {
      accessorKey: "supportsOnline",
      header: () => renderCenteredHeader("Online"),
      cell: ({ row }) => (
        <div className="w-full flex items-center justify-center">
          <Badge className="font-light" variant="secondary">
            {row.original.supportsOnline ? "Yes" : "No"}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "supportsCod",
      header: () => renderCenteredHeader("COD"),
      cell: ({ row }) => (
        <div className="w-full flex items-center justify-center">
          <Badge className="font-light" variant="secondary">
            {row.original.supportsCod ? "Yes" : "No"}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "transactionFeePercent",
      header: () => renderCenteredHeader("Txn Fee %"),
      cell: ({ row }) => (
        <div className="text-center w-full">
          {row.original.transactionFeePercent != null
            ? `${row.original.transactionFeePercent}%`
            : "-"}
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
            handleSetSelectedPaymentMethod(row.original);
          }}
          onDelete={() => {
            handleSetSelectedPaymentMethod(row.original);
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
      <DataTable<IPaymentMethod>
        data={paymentMethods}
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
        title="Delete Payment Method"
        description="Are you sure you want to delete this payment method?"
        highlightText={selectedPaymentMethod?.name}
      />
    </>
  );
};

export default PaymentMethodDatatable;
