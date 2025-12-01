import { SelectField } from "@/shared/components/molecules/selectDropdown";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/atoms/pagination";
import type { Table } from "@tanstack/react-table";

interface TablePaginationProps<TData> {
  table: Table<TData>;
  pageSizes?: number[]; // default: [5, 10, 15, 20]
  visiblePages?: 3 | 5;
  className?: string;
}

export function TablePagination<TData>({
  table,
  pageSizes = [10, 15, 20],
  visiblePages = 3,
  className = "",
}: TablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const pageCount = table.getPageCount();

  // Helper to get visible page range (for pagination numbers)
  const getVisiblePages = () => {
    const totalPages = pageCount;
    const currentPage = pageIndex + 1;
    const visible: (number | "...")[] = [];
    const maxVisible = Math.max(visiblePages ?? 5, 3);

    // If total pages <= maxVisible, show all
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) visible.push(i);
      return visible;
    }

    // Calculate the sliding window
    let start = currentPage - Math.floor(maxVisible / 2);
    let end = currentPage + Math.floor(maxVisible / 2);

    if (start < 1) {
      start = 1;
      end = maxVisible;
    }
    if (end > totalPages) {
      end = totalPages;
      start = totalPages - (maxVisible - 1);
    }

    // Add first page and ellipsis if needed
    if (start > 1) visible.push(1, "...");
    for (let i = start; i <= end; i++) visible.push(i);
    if (end < totalPages) visible.push("...", totalPages);

    return visible;
  };

  // total rows (not paginated)
  const totalRows = table.getPrePaginationRowModel().rows.length;
  const start = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const currentPageRows = table.getRowModel().rows.length;
  const end = totalRows === 0 ? 0 : pageIndex * pageSize + currentPageRows;

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border rounded-lg ${className}`}
    >
      {/* Left: Record info */}
      <div className="text-sm text-muted-foreground">
        Showing <span className="font-medium">{start}</span> to{" "}
        <span className="font-medium">{end}</span> of{" "}
        <span className="font-medium">{totalRows}</span> results
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-3">
        {/* Rows per page dropdown */}
        <div className="flex items-center gap-2">
          <SelectField
            value={String(pageSize)}
            options={pageSizes.map((n) => String(n))}
            onChange={(val) => table.setPageSize(Number(val))}
            className="w-[70px]"
          />
        </div>

        {/* Pagination UI */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  table.getCanPreviousPage() && table.previousPage()
                }
                className={
                  table.getCanPreviousPage()
                    ? "cursor-pointer"
                    : "opacity-50 cursor-not-allowed pointer-events-none"
                }
                isActive={table.getCanPreviousPage()}
              />
            </PaginationItem>

            {getVisiblePages().map((page, index) => (
              <PaginationItem key={index}>
                {page === "..." ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    onClick={() => table.setPageIndex(page - 1)}
                    isActive={pageIndex + 1 === page}
                    className={"cursor-pointer"}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => table.getCanNextPage() && table.nextPage()}
                className={
                  table.getCanNextPage()
                    ? "cursor-pointer"
                    : "opacity-50 cursor-not-allowed pointer-events-none"
                }
                isActive={table.getCanNextPage()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
