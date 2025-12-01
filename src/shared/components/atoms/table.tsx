import { cn } from "@/lib/utils";
import {
  Table as ShadcnTable,
  TableHeader as ShadcnTableHeader,
  TableBody as ShadcnTableBody,
  TableFooter as ShadcnTableFooter,
  TableHead as ShadcnTableHead,
  TableRow as ShadcnTableRow,
  TableCell as ShadcnTableCell,
  TableCaption as ShadcnTableCaption,
} from "@/shared/components/shadcn/table";

type TableProps = React.ComponentProps<typeof ShadcnTable>;
type TableHeaderProps = React.ComponentProps<typeof ShadcnTableHeader>;
type TableBodyProps = React.ComponentProps<typeof ShadcnTableBody>;
type TableFooterProps = React.ComponentProps<typeof ShadcnTableFooter>;
type TableHeadProps = React.ComponentProps<typeof ShadcnTableHead>;
type TableRowProps = React.ComponentProps<typeof ShadcnTableRow>;
type TableCellProps = React.ComponentProps<typeof ShadcnTableCell>;
type TableCaptionProps = React.ComponentProps<typeof ShadcnTableCaption>;

export const Table = ({ className, ...props }: TableProps) => {
  return <ShadcnTable className={cn(className)} {...props} />;
};

export const TableHeader = ({ className, ...props }: TableHeaderProps) => {
  return <ShadcnTableHeader className={cn(className)} {...props} />;
};

export const TableBody = ({ className, ...props }: TableBodyProps) => {
  return <ShadcnTableBody className={cn(className)} {...props} />;
};

export const TableFooter = ({ className, ...props }: TableFooterProps) => {
  return <ShadcnTableFooter className={cn(className)} {...props} />;
};

export const TableHead = ({ className, ...props }: TableHeadProps) => {
  return <ShadcnTableHead className={cn(className)} {...props} />;
};

export const TableRow = ({ className, ...props }: TableRowProps) => {
  return <ShadcnTableRow className={cn(className)} {...props} />;
};

export const TableCell = ({ className, ...props }: TableCellProps) => {
  return <ShadcnTableCell className={cn(className)} {...props} />;
};

export const TableCaption = ({ className, ...props }: TableCaptionProps) => {
  return <ShadcnTableCaption className={cn(className)} {...props} />;
};
