import { Link } from "react-router-dom";
import { MenuItem } from "../types/sidebar";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

interface MenuItemsProps {
  items: MenuItem[];
}

export const MenuItems = ({ items }: MenuItemsProps) => {
  return (
    <>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link to={item.url} className="text-base py-3">
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
          {item.submenu && (
            <div className="ml-6 mt-2 space-y-2">
              {item.submenu.map((subItem) => (
                <SidebarMenuItem key={subItem.title}>
                  <SidebarMenuButton asChild>
                    <Link to={subItem.url} className="text-sm py-2">
                      <span>{subItem.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </div>
          )}
        </SidebarMenuItem>
      ))}
    </>
  );
};