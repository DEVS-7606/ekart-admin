import Button from "@/shared/components/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/atoms/dialog";
import { Typography } from "@/shared/components/atoms/Typography";
import type {
  BaseTemplateRow,
  TemplateDeleteDialogConfig,
} from "@/shared/types/templateWizard";

interface TemplateDeleteDialogProps<TRow extends BaseTemplateRow> {
  open: boolean;
  config: TemplateDeleteDialogConfig;
  row: TRow | null;
  onOpenChange: () => void;
  onConfirm: () => void;
}

const TemplateDeleteDialog = <TRow extends BaseTemplateRow>({
  open,
  config,
  row,
  onOpenChange,
  onConfirm,
}: TemplateDeleteDialogProps<TRow>) => {
  const displayField = config.displayField ?? "name";
  const displayValue = row
    ? ((row as Record<string, unknown>)[displayField] as string)
    : "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{config.title}</DialogTitle>
          <DialogDescription>
            {config.description ? (
              <Typography component="p" variant="sm">
                {config.description}
              </Typography>
            ) : displayValue ? (
              <Typography component="p" variant="sm">
                Are you sure you want to delete this{" "}
                <Typography
                  component="span"
                  variant="sm"
                  weight="semiBold"
                  className="text-destructive"
                >
                  {displayValue}
                </Typography>
                ?
              </Typography>
            ) : (
              <Typography component="p" variant="sm">
                Are you sure you want to delete this item?
              </Typography>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange()}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="cursor-pointer bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateDeleteDialog;
