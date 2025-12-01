import React from "react";
import Button from "@/shared/components/atoms/button";
import { Pencil, Trash2 } from "lucide-react";

interface ActionCellProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const ActionCell: React.FC<ActionCellProps> = ({ onEdit, onDelete }) => {
  return (
    <div className="flex items-center gap-2">
      <Button size="icon" variant="outline" onClick={onEdit}>
        <Pencil className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="default" onClick={onDelete}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
