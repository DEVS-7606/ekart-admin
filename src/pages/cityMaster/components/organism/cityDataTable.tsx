import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/organisms/dataTable";
import Button from "@/shared/components/atoms/button";
import { Typography } from "@/shared/components/atoms/Typography";
import { Pencil, Trash2 } from "lucide-react";
import type { City } from "../../types";
import type { CityDataTableProps } from "../../interfaces";

const useCityColumns = (
  onEdit: (c: City) => void,
  onDelete: (c: City) => void
) =>
  useMemo<ColumnDef<City>[]>(
    () => [
      {
        accessorKey: "name",
        header: () => (
          <Typography component="p" variant="sm" weight="medium">
            Name
          </Typography>
        ),
        cell: ({ row }) => (
          <Typography component="p" variant="sm" className="text-center">
            {row.original.name}
          </Typography>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "code",
        header: () => (
          <Typography component="p" variant="sm" weight="medium">
            Code
          </Typography>
        ),
        cell: ({ row }) => (
          <Typography component="p" variant="sm" className="text-center">
            {row.original.code}
          </Typography>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "state",
        header: () => (
          <Typography component="p" variant="sm" weight="medium">
            State
          </Typography>
        ),
        cell: ({ row }) => (
          <Typography component="p" variant="sm" className="text-center">
            {row.original.state ?? "-"}
          </Typography>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "country",
        header: () => (
          <Typography component="p" variant="sm" weight="medium">
            Country
          </Typography>
        ),
        cell: ({ row }) => (
          <Typography component="p" variant="sm" className="text-center">
            {row.original.country ?? "-"}
          </Typography>
        ),
        enableSorting: false,
      },
      {
        id: "actions",
        header: () => (
          <Typography component="p" variant="sm" weight="medium">
            Actions
          </Typography>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Edit city ${row.original.id}`}
              className="text-blue-600"
              onClick={() => onEdit(row.original)}
            >
              <Pencil className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Delete city ${row.original.id}`}
              className="text-red-500"
              onClick={() => onDelete(row.original)}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ),
        enableSorting: false,
      },
    ],
    [onEdit, onDelete]
  );

const CityDataTable = ({ data, onEdit, onDelete }: CityDataTableProps) => {
  const columns = useCityColumns(onEdit, onDelete);

  return (
    <DataTable<City>
      data={data}
      columns={columns}
      options={{
        visiblePages: 3,
      }}
    />
  );
};

export default CityDataTable;
