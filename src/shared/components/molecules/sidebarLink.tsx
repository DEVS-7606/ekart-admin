import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { SidebarMenuButton } from "../atoms/sidebar";

interface SidebarLinkProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive?: boolean;
}

const SidebarLink = ({
  icon: Icon,
  label,
  href,
  isActive = false,
}: SidebarLinkProps) => {
  const navigate = useNavigate();
  return (
    <SidebarMenuButton isActive={isActive} onClick={() => navigate(href)}>
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </SidebarMenuButton>
  );
};

export default SidebarLink;
