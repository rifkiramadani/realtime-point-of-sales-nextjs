import { Album, LayoutDashboard } from "lucide-react";

export const SIDEBAR_MENU_LIST = {
  admin: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Order",
      url: "/order",
      icon: Album,
    },
  ],
};
