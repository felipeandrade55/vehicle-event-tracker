import { LucideIcon } from "lucide-react";

export interface MenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
  submenu?: SubMenuItem[];
}

export interface SubMenuItem {
  title: string;
  url: string;
}