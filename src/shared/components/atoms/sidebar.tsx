import { cn } from "@/lib/utils";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent as ShadcnSidebarContent,
  SidebarFooter as ShadcnSidebarFooter,
  SidebarGroup as ShadcnSidebarGroup,
  SidebarGroupAction as ShadcnSidebarGroupAction,
  SidebarGroupContent as ShadcnSidebarGroupContent,
  SidebarGroupLabel as ShadcnSidebarGroupLabel,
  SidebarHeader as ShadcnSidebarHeader,
  SidebarInput as ShadcnSidebarInput,
  SidebarInset as ShadcnSidebarInset,
  SidebarMenu as ShadcnSidebarMenu,
  SidebarMenuAction as ShadcnSidebarMenuAction,
  SidebarMenuBadge as ShadcnSidebarMenuBadge,
  SidebarMenuButton as ShadcnSidebarMenuButton,
  SidebarMenuItem as ShadcnSidebarMenuItem,
  SidebarMenuSkeleton as ShadcnSidebarMenuSkeleton,
  SidebarMenuSub as ShadcnSidebarMenuSub,
  SidebarMenuSubButton as ShadcnSidebarMenuSubButton,
  SidebarMenuSubItem as ShadcnSidebarMenuSubItem,
  SidebarProvider as ShadcnSidebarProvider,
  SidebarRail as ShadcnSidebarRail,
  SidebarSeparator as ShadcnSidebarSeparator,
  SidebarTrigger as ShadcnSidebarTrigger,
  useSidebar as ShadcnUseSidebar,
} from "@/shared/components/shadcn/sidebar";

type SidebarProps = React.ComponentProps<typeof ShadcnSidebar>;
type SidebarContentProps = React.ComponentProps<typeof ShadcnSidebarContent>;
type SidebarFooterProps = React.ComponentProps<typeof ShadcnSidebarFooter>;
type SidebarGroupProps = React.ComponentProps<typeof ShadcnSidebarGroup>;
type SidebarGroupActionProps = React.ComponentProps<
  typeof ShadcnSidebarGroupAction
>;
type SidebarGroupContentProps = React.ComponentProps<
  typeof ShadcnSidebarGroupContent
>;
type SidebarGroupLabelProps = React.ComponentProps<
  typeof ShadcnSidebarGroupLabel
>;
type SidebarHeaderProps = React.ComponentProps<typeof ShadcnSidebarHeader>;
type SidebarInputProps = React.ComponentProps<typeof ShadcnSidebarInput>;
type SidebarInsetProps = React.ComponentProps<typeof ShadcnSidebarInset>;
type SidebarMenuProps = React.ComponentProps<typeof ShadcnSidebarMenu>;
type SidebarMenuActionProps = React.ComponentProps<
  typeof ShadcnSidebarMenuAction
>;
type SidebarMenuBadgeProps = React.ComponentProps<
  typeof ShadcnSidebarMenuBadge
>;
type SidebarMenuButtonProps = React.ComponentProps<
  typeof ShadcnSidebarMenuButton
>;
type SidebarMenuItemProps = React.ComponentProps<typeof ShadcnSidebarMenuItem>;
type SidebarMenuSkeletonProps = React.ComponentProps<
  typeof ShadcnSidebarMenuSkeleton
>;
type SidebarMenuSubProps = React.ComponentProps<typeof ShadcnSidebarMenuSub>;
type SidebarMenuSubButtonProps = React.ComponentProps<
  typeof ShadcnSidebarMenuSubButton
>;
type SidebarMenuSubItemProps = React.ComponentProps<
  typeof ShadcnSidebarMenuSubItem
>;
type SidebarProviderProps = React.ComponentProps<typeof ShadcnSidebarProvider>;
type SidebarRailProps = React.ComponentProps<typeof ShadcnSidebarRail>;
type SidebarSeparatorProps = React.ComponentProps<
  typeof ShadcnSidebarSeparator
>;
type SidebarTriggerProps = React.ComponentProps<typeof ShadcnSidebarTrigger>;

export const Sidebar = ({ className, ...props }: SidebarProps) => {
  return <ShadcnSidebar className={cn(className)} {...props} />;
};

export const SidebarContent = ({
  className,
  ...props
}: SidebarContentProps) => {
  return <ShadcnSidebarContent className={cn(className)} {...props} />;
};

export const SidebarFooter = ({ className, ...props }: SidebarFooterProps) => {
  return <ShadcnSidebarFooter className={cn(className)} {...props} />;
};

export const SidebarGroup = ({ className, ...props }: SidebarGroupProps) => {
  return <ShadcnSidebarGroup className={cn(className)} {...props} />;
};

export const SidebarGroupAction = ({
  className,
  ...props
}: SidebarGroupActionProps) => {
  return <ShadcnSidebarGroupAction className={cn(className)} {...props} />;
};

export const SidebarGroupContent = ({
  className,
  ...props
}: SidebarGroupContentProps) => {
  return <ShadcnSidebarGroupContent className={cn(className)} {...props} />;
};

export const SidebarGroupLabel = ({
  className,
  ...props
}: SidebarGroupLabelProps) => {
  return <ShadcnSidebarGroupLabel className={cn(className)} {...props} />;
};

export const SidebarHeader = ({ className, ...props }: SidebarHeaderProps) => {
  return <ShadcnSidebarHeader className={cn(className)} {...props} />;
};

export const SidebarInput = ({ className, ...props }: SidebarInputProps) => {
  return <ShadcnSidebarInput className={cn(className)} {...props} />;
};

export const SidebarInset = ({ className, ...props }: SidebarInsetProps) => {
  return <ShadcnSidebarInset className={cn(className)} {...props} />;
};

export const SidebarMenu = ({ className, ...props }: SidebarMenuProps) => {
  return <ShadcnSidebarMenu className={cn(className)} {...props} />;
};

export const SidebarMenuAction = ({
  className,
  ...props
}: SidebarMenuActionProps) => {
  return <ShadcnSidebarMenuAction className={cn(className)} {...props} />;
};

export const SidebarMenuBadge = ({
  className,
  ...props
}: SidebarMenuBadgeProps) => {
  return <ShadcnSidebarMenuBadge className={cn(className)} {...props} />;
};

export const SidebarMenuButton = ({
  className,
  ...props
}: SidebarMenuButtonProps) => {
  return <ShadcnSidebarMenuButton className={cn(className)} {...props} />;
};

export const SidebarMenuItem = ({
  className,
  ...props
}: SidebarMenuItemProps) => {
  return <ShadcnSidebarMenuItem className={cn(className)} {...props} />;
};

export const SidebarMenuSkeleton = ({
  className,
  ...props
}: SidebarMenuSkeletonProps) => {
  return <ShadcnSidebarMenuSkeleton className={cn(className)} {...props} />;
};

export const SidebarMenuSub = ({
  className,
  ...props
}: SidebarMenuSubProps) => {
  return <ShadcnSidebarMenuSub className={cn(className)} {...props} />;
};

export const SidebarMenuSubButton = ({
  className,
  ...props
}: SidebarMenuSubButtonProps) => {
  return <ShadcnSidebarMenuSubButton className={cn(className)} {...props} />;
};

export const SidebarMenuSubItem = ({
  className,
  ...props
}: SidebarMenuSubItemProps) => {
  return <ShadcnSidebarMenuSubItem className={cn(className)} {...props} />;
};

export const SidebarProvider = ({
  className,
  ...props
}: SidebarProviderProps) => {
  return <ShadcnSidebarProvider className={cn(className)} {...props} />;
};

export const SidebarRail = ({ className, ...props }: SidebarRailProps) => {
  return <ShadcnSidebarRail className={cn(className)} {...props} />;
};

export const SidebarSeparator = ({
  className,
  ...props
}: SidebarSeparatorProps) => {
  return <ShadcnSidebarSeparator className={cn(className)} {...props} />;
};

export const SidebarTrigger = ({
  className,
  ...props
}: SidebarTriggerProps) => {
  return <ShadcnSidebarTrigger className={cn(className)} {...props} />;
};

export const useSidebar = ShadcnUseSidebar;
