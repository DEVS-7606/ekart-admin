import { DataTable } from "@/shared/components/organisms/dataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import Button from "@/shared/components/atoms/button";
import type { CustomerRow } from "@/pages/customer-master/type/customerMaster";
import { useState } from "react";
import { GenericDialog } from "@/shared/components/organisms/genericDialog";

interface CustomerDatatableProps {
  selectedCustomer: CustomerRow | null;
  customersData: CustomerRow[];
  handleSetIsCustomerModalOpen: (value: boolean) => void;
  handleSetSelectedCustomer: (value: CustomerRow | null) => void;
  onDeleteCustomer: () => void;
}

const CustomerDatatable = ({
  selectedCustomer,
  customersData,
  handleSetIsCustomerModalOpen,
  handleSetSelectedCustomer,
  onDeleteCustomer,
}: CustomerDatatableProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const renderCenteredHeader = (label: string) => (
    <div className="text-center text-sm font-medium text-gray-600">
      {label}
    </div>
  );

  const toggleDeleteDialog = () => {
    setIsDeleteDialogOpen((previous) => !previous);
  };

  const handleConfirmDelete = () => {
    onDeleteCustomer();
    setIsDeleteDialogOpen(false);
  };

  const columns: ColumnDef<CustomerRow>[] = [
    {
      accessorKey: "name",
      header: () => renderCenteredHeader("Name"),
      cell: ({ row }) => (
        <div className="text-center">
          <span className="font-semibold text-gray-800">
            {row.original.name}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "code",
      header: () => renderCenteredHeader("Code"),
      cell: ({ row }) => (
        <div className="text-center">{row.original.code}</div>
      ),
    },
    {
      accessorKey: "maxUsers",
      header: () => renderCenteredHeader("Max User creation limit"),
      cell: ({ row }) => (
        <div className="text-center">{row.original.maxUsers}</div>
      ),
    },
    {
      accessorKey: "language",
      header: () => renderCenteredHeader("Language"),
      cell: ({ row }) => (
        <div className="text-center">{row.original.language}</div>
      ),
    },
    {
      id: "actions",
      header: () => renderCenteredHeader("Actions"),
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="text-blue-600 hover:text-blue-700"
              onClick={() => {
                handleSetIsCustomerModalOpen(true);
                handleSetSelectedCustomer(row.original);
              }}
            >
              <Pencil className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="text-red-600 hover:text-red-700"
              onClick={() => {
                handleSetSelectedCustomer(row.original);
                toggleDeleteDialog();
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <DataTable<CustomerRow>
        data={customersData}
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
        title="Delete Customer"
        description="Are you sure you want to delete this customer"
        highlightText={selectedCustomer?.name}
      />
    </>
  );
};

export default CustomerDatatable;
