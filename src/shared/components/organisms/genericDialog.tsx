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

interface GenericDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  highlightText?: string; // Name or item to highlight
  onOpenChange: () => void;
  onConfirm: () => void;

  confirmText?: string;
  cancelText?: string;

  confirmClassName?: string; // extra classes for confirm button
  cancelClassName?: string; // extra classes for cancel button

  contentClassName?: string; // extra classes for DialogContent
  footerClassName?: string; // extra classes for DialogFooter
}

export const GenericDialog = ({
  open,
  title = "Confirmation",
  description,
  highlightText,
  onOpenChange,
  onConfirm,

  confirmText = "Confirm",
  cancelText = "Cancel",

  confirmClassName = "",
  cancelClassName = "",
  contentClassName = "",
  footerClassName = "",
}: GenericDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`sm:max-w-md ${contentClassName}`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>

          <DialogDescription>
            {description ? (
              <Typography component="p" variant="sm">
                {description}{" "}
                {highlightText && (
                  <Typography
                    component="span"
                    variant="sm"
                    weight="semiBold"
                    className="text-destructive"
                  >
                    {highlightText}
                  </Typography>
                )}{" "}
                ?
              </Typography>
            ) : (
              <Typography component="p" variant="sm">
                Are you sure you want to proceed?
              </Typography>
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter
          className={`flex-row justify-end gap-3 ${footerClassName}`}
        >
          <Button
            type="button"
            variant="outline"
            onClick={onOpenChange}
            className={`cursor-pointer ${cancelClassName}`}
          >
            {cancelText}
          </Button>

          <Button
            type="button"
            onClick={onConfirm}
            className={`cursor-pointer bg-destructive text-destructive-foreground hover:bg-destructive/90 ${confirmClassName}`}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
