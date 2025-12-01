import { cn } from "@/lib/utils";
import {
  Sheet as ShadcnSheet,
  SheetPortal as ShadcnSheetPortal,
  SheetOverlay as ShadcnSheetOverlay,
  SheetTrigger as ShadcnSheetTrigger,
  SheetClose as ShadcnSheetClose,
  SheetContent as ShadcnSheetContent,
  SheetHeader as ShadcnSheetHeader,
  SheetFooter as ShadcnSheetFooter,
  SheetTitle as ShadcnSheetTitle,
  SheetDescription as ShadcnSheetDescription,
} from "@/shared/components/shadcn/sheet";

type SheetProps = React.ComponentProps<typeof ShadcnSheet>;
type SheetPortalProps = React.ComponentProps<typeof ShadcnSheetPortal>;
type SheetOverlayProps = React.ComponentProps<typeof ShadcnSheetOverlay>;
type SheetTriggerProps = React.ComponentProps<typeof ShadcnSheetTrigger>;
type SheetCloseProps = React.ComponentProps<typeof ShadcnSheetClose>;
type SheetContentProps = React.ComponentProps<typeof ShadcnSheetContent>;
type SheetHeaderProps = React.ComponentProps<typeof ShadcnSheetHeader>;
type SheetFooterProps = React.ComponentProps<typeof ShadcnSheetFooter>;
type SheetTitleProps = React.ComponentProps<typeof ShadcnSheetTitle>;
type SheetDescriptionProps = React.ComponentProps<
  typeof ShadcnSheetDescription
>;

export const Sheet = ({ ...props }: SheetProps) => {
  return <ShadcnSheet {...props} />;
};

export const SheetPortal = ({ ...props }: SheetPortalProps) => {
  return <ShadcnSheetPortal {...props} />;
};

export const SheetOverlay = ({ className, ...props }: SheetOverlayProps) => {
  return <ShadcnSheetOverlay className={cn(className)} {...props} />;
};

export const SheetTrigger = ({ className, ...props }: SheetTriggerProps) => {
  return <ShadcnSheetTrigger className={cn(className)} {...props} />;
};

export const SheetClose = ({ className, ...props }: SheetCloseProps) => {
  return <ShadcnSheetClose className={cn(className)} {...props} />;
};

export const SheetContent = ({ className, ...props }: SheetContentProps) => {
  return (
    <ShadcnSheetContent
      className={cn(className)}
      onInteractOutside={(event) => event.preventDefault()}
      {...props}
    />
  );
};

export const SheetHeader = ({ className, ...props }: SheetHeaderProps) => {
  return <ShadcnSheetHeader className={cn(className)} {...props} />;
};

export const SheetFooter = ({ className, ...props }: SheetFooterProps) => {
  return <ShadcnSheetFooter className={cn(className)} {...props} />;
};

export const SheetTitle = ({ className, ...props }: SheetTitleProps) => {
  return <ShadcnSheetTitle className={cn(className)} {...props} />;
};

export const SheetDescription = ({
  className,
  ...props
}: SheetDescriptionProps) => {
  return <ShadcnSheetDescription className={cn(className)} {...props} />;
};
