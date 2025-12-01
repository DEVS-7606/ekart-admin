import {
  Dialog as ShadcnDialog,
  DialogClose as ShadcnDialogClose,
  DialogContent as ShadcnDialogContent,
  DialogDescription as ShadcnDialogDescription,
  DialogFooter as ShadcnDialogFooter,
  DialogHeader as ShadcnDialogHeader,
  DialogOverlay as ShadcnDialogOverlay,
  DialogPortal as ShadcnDialogPortal,
  DialogTitle as ShadcnDialogTitle,
  DialogTrigger as ShadcnDialogTrigger,
} from "@/shared/components/shadcn/dialog";
import { cn } from "@/lib/utils";

type DialogProps = React.ComponentProps<typeof ShadcnDialog>;
type DialogTriggerProps = React.ComponentProps<typeof ShadcnDialogTrigger>;
type DialogContentProps = React.ComponentProps<typeof ShadcnDialogContent>;
type DialogHeaderProps = React.ComponentProps<typeof ShadcnDialogHeader>;
type DialogFooterProps = React.ComponentProps<typeof ShadcnDialogFooter>;
type DialogTitleProps = React.ComponentProps<typeof ShadcnDialogTitle>;
type DialogDescriptionProps = React.ComponentProps<
  typeof ShadcnDialogDescription
>;
type DialogCloseProps = React.ComponentProps<typeof ShadcnDialogClose>;
type DialogPortalProps = React.ComponentProps<typeof ShadcnDialogPortal>;
type DialogOverlayProps = React.ComponentProps<typeof ShadcnDialogOverlay>;

export const Dialog = ({ ...props }: DialogProps) => {
  return <ShadcnDialog {...props} />;
};

export const DialogTrigger = ({ className, ...props }: DialogTriggerProps) => {
  return <ShadcnDialogTrigger className={cn(className)} {...props} />;
};

export const DialogContent = ({ className, ...props }: DialogContentProps) => {
  return <ShadcnDialogContent className={cn(className)} {...props} />;
};

export const DialogHeader = ({ className, ...props }: DialogHeaderProps) => {
  return <ShadcnDialogHeader className={cn(className)} {...props} />;
};

export const DialogFooter = ({ className, ...props }: DialogFooterProps) => {
  return <ShadcnDialogFooter className={cn(className)} {...props} />;
};

export const DialogTitle = ({ className, ...props }: DialogTitleProps) => {
  return <ShadcnDialogTitle className={cn(className)} {...props} />;
};

export const DialogDescription = ({
  className,
  ...props
}: DialogDescriptionProps) => {
  return <ShadcnDialogDescription className={cn(className)} {...props} />;
};

export const DialogClose = ({ className, ...props }: DialogCloseProps) => {
  return (
    <ShadcnDialogClose
      className={cn("cursor-pointer hover:cursor-pointer", className)}
      {...props}
    />
  );
};

export const DialogPortal = ({ ...props }: DialogPortalProps) => {
  return <ShadcnDialogPortal {...props} />;
};

export const DialogOverlay = ({ className, ...props }: DialogOverlayProps) => {
  return <ShadcnDialogOverlay className={cn(className)} {...props} />;
};
