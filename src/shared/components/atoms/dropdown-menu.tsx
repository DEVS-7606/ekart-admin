import { cn } from "@/lib/utils";
import {
  DropdownMenu as ShadcnDropdownMenu,
  DropdownMenuTrigger as ShadcnDropdownMenuTrigger,
  DropdownMenuContent as ShadcnDropdownMenuContent,
  DropdownMenuItem as ShadcnDropdownMenuItem,
  DropdownMenuCheckboxItem as ShadcnDropdownMenuCheckboxItem,
  DropdownMenuRadioItem as ShadcnDropdownMenuRadioItem,
  DropdownMenuLabel as ShadcnDropdownMenuLabel,
  DropdownMenuSeparator as ShadcnDropdownMenuSeparator,
  DropdownMenuShortcut as ShadcnDropdownMenuShortcut,
  DropdownMenuGroup as ShadcnDropdownMenuGroup,
  DropdownMenuPortal as ShadcnDropdownMenuPortal,
  DropdownMenuSub as ShadcnDropdownMenuSub,
  DropdownMenuRadioGroup as ShadcnDropdownMenuRadioGroup,
} from "@/shared/components/shadcn/dropdown-menu";

export const DropdownMenu = ShadcnDropdownMenu;
export const DropdownMenuGroup = ShadcnDropdownMenuGroup;
export const DropdownMenuPortal = ShadcnDropdownMenuPortal;
export const DropdownMenuSub = ShadcnDropdownMenuSub;
export const DropdownMenuRadioGroup = ShadcnDropdownMenuRadioGroup;

// Simple wrappers that allow extending className via cn, similar to other atoms.

type DropdownMenuTriggerProps = React.ComponentProps<
  typeof ShadcnDropdownMenuTrigger
>;
export const DropdownMenuTrigger = ({
  className,
  ...props
}: DropdownMenuTriggerProps) => {
  return <ShadcnDropdownMenuTrigger className={cn(className)} {...props} />;
};

type DropdownMenuContentProps = React.ComponentProps<
  typeof ShadcnDropdownMenuContent
>;
export const DropdownMenuContent = ({
  className,
  ...props
}: DropdownMenuContentProps) => {
  return <ShadcnDropdownMenuContent className={cn(className)} {...props} />;
};

type DropdownMenuItemProps = React.ComponentProps<
  typeof ShadcnDropdownMenuItem
>;
export const DropdownMenuItem = ({
  className,
  ...props
}: DropdownMenuItemProps) => {
  return <ShadcnDropdownMenuItem className={cn(className)} {...props} />;
};

type DropdownMenuCheckboxItemProps = React.ComponentProps<
  typeof ShadcnDropdownMenuCheckboxItem
>;
export const DropdownMenuCheckboxItem = ({
  className,
  ...props
}: DropdownMenuCheckboxItemProps) => {
  return (
    <ShadcnDropdownMenuCheckboxItem className={cn(className)} {...props} />
  );
};

type DropdownMenuRadioItemProps = React.ComponentProps<
  typeof ShadcnDropdownMenuRadioItem
>;
export const DropdownMenuRadioItem = ({
  className,
  ...props
}: DropdownMenuRadioItemProps) => {
  return <ShadcnDropdownMenuRadioItem className={cn(className)} {...props} />;
};

type DropdownMenuLabelProps = React.ComponentProps<
  typeof ShadcnDropdownMenuLabel
>;
export const DropdownMenuLabel = ({
  className,
  ...props
}: DropdownMenuLabelProps) => {
  return <ShadcnDropdownMenuLabel className={cn(className)} {...props} />;
};

type DropdownMenuSeparatorProps = React.ComponentProps<
  typeof ShadcnDropdownMenuSeparator
>;
export const DropdownMenuSeparator = ({
  className,
  ...props
}: DropdownMenuSeparatorProps) => {
  return <ShadcnDropdownMenuSeparator className={cn(className)} {...props} />;
};

type DropdownMenuShortcutProps = React.ComponentProps<
  typeof ShadcnDropdownMenuShortcut
>;
export const DropdownMenuShortcut = ({
  className,
  ...props
}: DropdownMenuShortcutProps) => {
  return <ShadcnDropdownMenuShortcut className={cn(className)} {...props} />;
};
