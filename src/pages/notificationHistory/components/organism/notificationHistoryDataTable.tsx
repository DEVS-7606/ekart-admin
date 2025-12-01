import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/organisms/dataTable";
import Button from "@/shared/components/atoms/button";
import { Eye } from "lucide-react";
import { Typography } from "@/shared/components/atoms/Typography";
import type { Notification } from "@/pages/notificationHistory/types";

interface NotificationHistoryTableProps {
  data: Notification[];
  onView: (notification: Notification) => void;
}

const useNotificationColumns = (onView: (notification: Notification) => void) =>
  useMemo<ColumnDef<Notification>[]>(
    () => [
      {
        accessorKey: "dateTime",
        header: () => <div className="text-center">Date</div>,
        cell: ({ row }) => (
          <div className="text-center whitespace-nowrap">
            {row.original.dateTime}
          </div>
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
        accessorKey: "machine",
        header: () => <div className="text-center">Machine</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.original.machine}</div>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "type",
        header: () => <div className="text-center">Type</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.original.type}</div>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "alarm",
        header: () => <div className="text-center">Alarm</div>,
        cell: ({ row }) => (
          <div className="text-center">{row.original.alarm}</div>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "description",
        header: () => <div className="text-center">Description</div>,
        cell: ({ row }) => (
          <div className="text-center truncate max-w-xs">
            {row.original.description}
          </div>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "status",
        header: () => <div className="text-center">Status</div>,
        cell: ({ row }) => (
          <div className="text-center">
            <Typography
              component="span"
              variant="sm"
              weight="medium"
              className={
                row.original.status === "success"
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {row.original.status.charAt(0).toUpperCase() +
                row.original.status.slice(1)}
            </Typography>
          </div>
        ),
        enableSorting: false,
      },
      {
        id: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`View notification ${row.original.id}`}
              className="text-blue-600"
              onClick={() => onView(row.original)}
            >
              <Eye className="size-4" />
            </Button>
          </div>
        ),
        enableSorting: false,
      },
    ],
    [onView]
  );

const NotificationHistoryDataTable = ({
  data,
  onView,
}: NotificationHistoryTableProps) => {
  const columns = useNotificationColumns(onView);

  return <DataTable<Notification> data={data} columns={columns} />;
};

export default NotificationHistoryDataTable;
