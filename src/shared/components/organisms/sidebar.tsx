import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/atoms/sidebar";
import SidebarLink from "../molecules/sidebarLink";
import {
  languages,
  navigationItems,
} from "@/shared/constants/sidebar.constant";
import { ChevronUp, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/shared/components/atoms/dropdown-menu";

interface AppSidebarProps {
  className?: string;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ className, ...props }) => {
  const [language, setLanguage] = useState("English");
  const { pathname } = useLocation();

  return (
    <Sidebar className={className} {...props}>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navigationItems.map((item) => {
            const isActive =
              item.href !== "#" &&
              (pathname === item.href || pathname.startsWith(`${item.href}/`));

            return (
              <SidebarMenuItem key={item.label}>
                <SidebarLink
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  isActive={isActive}
                />
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Globe className="h-4 w-4" />
                  {language}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                {languages.map((lang) => (
                  <DropdownMenuCheckboxItem
                    key={lang}
                    checked={language === lang}
                    onCheckedChange={(checked) => {
                      if (checked) setLanguage(lang);
                    }}
                  >
                    {lang}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
