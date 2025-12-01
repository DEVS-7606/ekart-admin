import Button from "@/shared/components/atoms/button";
import { Pencil, Trash2 } from "lucide-react";

interface TableActionCellProps {
  onEdit: () => void;
  onDelete: () => void;
  editAriaLabel: string;
  deleteAriaLabel: string;
}

const TableActionCell = ({
  onEdit,
  onDelete,
  editAriaLabel,
  deleteAriaLabel,
}: TableActionCellProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label={editAriaLabel}
        className="text-blue-600"
        onClick={onEdit}
      >
        <Pencil className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label={deleteAriaLabel}
        className="text-red-500"
        onClick={onDelete}
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
};

export default TableActionCell;
