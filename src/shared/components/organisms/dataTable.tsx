import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type Table as TableType,
  type Row,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/atoms/table";

import { ArrowUpDown } from "lucide-react";
import { TablePagination } from "./tablePagination";
import { Checkbox } from "@/shared/components/atoms/checkbox";
import { Typography } from "@/shared/components/atoms/Typography";

interface DataTableOptions<TData> {
  enableSorting?: boolean;
  enablePagination?: boolean;
  enableSelection?: boolean;
  enableSearching?: boolean;
  searchKeys?: (keyof TData)[];
  searchPlaceholder?: string;
  pageSizes?: number[];
  visiblePages?: 3 | 5;
  className?: string;
  bodyClassName?: string;
}

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  options?: DataTableOptions<TData>;
  onRowSelectionChange?: (rows: TData[]) => void;
  headerClassName?: string;
}

/**
 * Fully dynamic, reusable DataTable organism.
 * Supports: Sorting, Pagination, Selection (via props)
 */
export function DataTable<TData>({
  data,
  columns,
  options = {},
  onRowSelectionChange = () => {},
  headerClassName = "",
}: DataTableProps<TData>) {
  const {
    enableSorting = false,
    enablePagination = true,
    enableSelection = false,
    enableSearching = false,
    searchKeys = [],
    searchPlaceholder = "Search...",
    pageSizes = [5, 10, 15, 20],
    visiblePages = 5,
    className = "",
    bodyClassName = "",
  } = options;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  // ---- SEARCH LOGIC ----
  const globalFilterFn = (
    row: Row<TData>,
    _columnId: string,
    filterValue: string
  ) => {
    if (!enableSearching || !filterValue.trim()) return true;
    if (!searchKeys.length) return true;

    return searchKeys.some((key) => {
      const value = row.original[key];
      if (value == null) return false;
      return String(value).toLowerCase().includes(filterValue.toLowerCase());
    });
  };

  // ---- DYNAMIC SELECTION COLUMN ----
  const finalColumns = useMemo<ColumnDef<TData>[]>(() => {
    const srNoColumn: ColumnDef<TData> = {
      id: "srNo",
      header: "SR No",
      cell: ({ row }) => {
        return (
          <Typography component="p" className="text-center">
            {row.index + 1}
          </Typography>
        );
      },
      enableSorting: false,
      enableHiding: false,
    };

    const cols: ColumnDef<TData>[] = [srNoColumn];

    // ---- SELECTION COLUMN (OPTIONAL) ----

    if (enableSelection) {
      const selectionColumn: ColumnDef<TData> = {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(val) => table.toggleAllPageRowsSelected(!!val)}
            aria-label="Select all"
            className="ml-4"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(val) => row.toggleSelected(!!val)}
            aria-label="Select row"
            className="ml-4"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      };

      cols.unshift(selectionColumn);
    }

    // Finally add user-defined columns
    return [...cols, ...columns];
  }, [columns, enableSelection]);

  // ---- TABLE INSTANCE ----
  const table = useReactTable({
    data,
    columns: finalColumns,
    state: { sorting, pagination, rowSelection, globalFilter },

    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,

    onRowSelectionChange: (updater) => {
      const newState =
        typeof updater === "function" ? updater(rowSelection) : updater;
      setRowSelection(newState);

      if (onRowSelectionChange) {
        const selected = table
          .getRowModel()
          .rows.filter((r) => newState[r.id])
          .map((r) => r.original);
        onRowSelectionChange(selected);
      }
    },

    filterFns: {
      globalFilterFn,
    },
    globalFilterFn,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
  });

  return (
    <div
      className={`rounded-md border border-border overflow-hidden bg-card ${className}`}
    >
      {/* ---- SEARCH BAR (OPTIONAL) ---- */}
      {enableSearching && (
        <div className="mb-3 p-2">
          <input
            placeholder={searchPlaceholder}
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md bg-background"
          />
        </div>
      )}
      {/* ---- TABLE ---- */}
      <div className={bodyClassName}>
        <Table>
          <TableHeader
            className={bodyClassName ? "sticky top-0 z-10 bg-accent" : ""}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={
                      enableSorting && header.column.getCanSort()
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                    className={
                      enableSorting && header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : ""
                    }
                  >
                    <div
                      className={`flex items-center justify-center gap-2 ${headerClassName} `}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {enableSorting && header.column.getCanSort() && (
                        <ArrowUpDown size={14} />
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center h-24"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination (optional) */}
      {enablePagination && data.length > 10 && (
        <TablePagination
          table={table as unknown as TableType<TData>}
          pageSizes={pageSizes}
          visiblePages={visiblePages}
          className="m-2"
        />
      )}
    </div>
  );
}
