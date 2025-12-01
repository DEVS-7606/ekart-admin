import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/organisms/dataTable";
import { Typography } from "@/shared/components/atoms/Typography";
import type { Country } from "@/pages/countryMaster/types";
import type { CountryDataTableProps } from "@/pages/countryMaster/interfaces";
import TableActionCell from "@/shared/components/molecules/tableActionCell";

const useCountryColumns = (
  onEdit: (c: Country) => void,
  onDelete: (c: Country) => void
) =>
  useMemo<ColumnDef<Country>[]>(
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
        id: "actions",
        header: () => (
          <Typography component="p" variant="sm" weight="medium">
            Actions
          </Typography>
        ),
        cell: ({ row }) => (
          <TableActionCell
            onEdit={() => onEdit(row.original)}
            onDelete={() => onDelete(row.original)}
            editAriaLabel={`Edit country ${row.original.id}`}
            deleteAriaLabel={`Delete country ${row.original.id}`}
          />
        ),
        enableSorting: false,
      },
    ],
    [onEdit, onDelete]
  );

const CountryDataTable = ({
  data,
  onEdit,
  onDelete,
}: CountryDataTableProps) => {
  const columns = useCountryColumns(onEdit, onDelete);

  return <DataTable<Country> data={data} columns={columns} />;
};

export default CountryDataTable;
