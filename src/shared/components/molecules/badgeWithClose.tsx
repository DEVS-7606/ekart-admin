import { X } from "lucide-react";
import Badge from "@/shared/components/atoms/badge";

interface badgeWithClose {
  label: string;
  onDelete?: () => void;
  className?: string;
}

const badgeWithClose = ({ label, onDelete, className }: badgeWithClose) => {
  return (
    <Badge
      className={`inline-flex items-center gap-2 max-w-72 px-3 py-1.5 rounded-full border border-border bg-muted text-foreground hover:bg-muted/80 transition-colors ${
        className || ""
      }`}
    >
      <span className="truncate flex-1 text-xs font-medium" title={label}>
        {label}
      </span>

      {onDelete && (
        <X
          className="h-3.5 w-3.5 shrink-0 cursor-pointer rounded-full opacity-70 hover:opacity-100 hover:bg-muted/70"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        />
      )}
    </Badge>
  );
};

export default badgeWithClose;
