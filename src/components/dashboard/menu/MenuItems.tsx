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
            <Link 
              to={item.url} 
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 rounded-md"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
          {item.submenu && (
            <div className="ml-6 mt-1 space-y-1">
              {item.submenu.map((subItem) => (
                <SidebarMenuItem key={subItem.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={subItem.url} 
                      className="flex items-center px-3 py-2 text-sm transition-colors hover:bg-gray-100 rounded-md"
                    >
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