// "use client";

// import {
//   Sidebar,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuItem,
//   SidebarMenuButton,
//   SidebarFooter,
// } from "../ui/sidebar";

// import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
// import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

// import { Coffee, EllipsisVertical } from "lucide-react";

// const AppSidebar = () => {
//   return (
//     <Sidebar>
//       <SidebarHeader>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton size="lg">
//               <div className="flex items-center gap-2 font-medium">
//                 <div className="bg-teal-500 flex p-2 items-center justify-center rounded">
//                   <Coffee className="size-4" />
//                 </div>
//                 Ignaciasz Coffe
//               </div>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>
//       <SidebarFooter>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <SidebarMenuButton size="lg">
//                   <Avatar className="h-8 w-8 rounded-lg">
//                     <AvatarImage src="" alt="" />
//                     <AvatarFallback className="rounded-lg">A</AvatarFallback>
//                   </Avatar>
//                   <div className="text-sm leading-tight">
//                     <h4 className="truncate">Muhammad Rifky Ramadani</h4>
//                     <p className="text-muted-foreground truncate text-xs">
//                       Admin
//                     </p>
//                   </div>
//                   <EllipsisVertical className="ml-auto size-4" />
//                 </SidebarMenuButton>
//               </DropdownMenuTrigger>
//             </DropdownMenu>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>
//     </Sidebar>
//   );
// };

// export default AppSidebar;

"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "../ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Coffee, EllipsisVertical, LogOut } from "lucide-react";
import {
  SIDEBAR_MENU_LIST,
  SidebarMenuKey,
} from "@/constants/sidebar-constant";
import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const AppSidebar = () => {
  const { isMobile } = useSidebar();
  const pathname = usePathname();
  const profile = {
    name: "Muhammad Rifky Ramadani",
    role: "admin",
    avatar_url: "",
  };
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <span className="flex items-center gap-2 font-medium">
                <span className="bg-teal-500 flex p-2 items-center justify-center rounded">
                  <Coffee className="size-4 text-white" />
                </span>
                <span>Ignaciasz Coffee</span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              {SIDEBAR_MENU_LIST[profile.role as SidebarMenuKey]?.map(
                (item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      render={
                        <a
                          href={item.url}
                          className={cn(
                            "px-4 py-3 h-auto rounded-md flex items-center gap-3 text-base w-full",
                            {
                              "bg-teal-500 text-white hover:bg-teal-500 hover:text-white":
                                pathname === item.url,
                            },
                          )}
                        >
                          {item.icon && (
                            <item.icon className="size-5 shrink-0" />
                          )}
                          <span>{item.title}</span>
                        </a>
                      }
                    ></SidebarMenuButton>
                  </SidebarMenuItem>
                ),
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              {/* Trigger */}
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    className="data-popup-open:bg-sidebar-accent data-popup-open:text-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg shrink-0">
                      <AvatarImage src="" alt="" />
                      <AvatarFallback className="rounded-lg">A</AvatarFallback>
                    </Avatar>
                    <span className="grid flex-1 min-w-0 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        Muhammad Rifky Ramadani
                      </span>
                      <span className="text-muted-foreground truncate text-xs">
                        Admin
                      </span>
                    </span>
                    <EllipsisVertical className="ml-auto size-4 shrink-0" />
                  </SidebarMenuButton>
                }
              />
              {/* Isi dari trigger yaitu content */}
              <DropdownMenuContent
                className="min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="p-0 font-normal">
                    <span className="flex items-center gap-2 px-1 py-1.5">
                      <Avatar className="h-8 w-8 rounded-lg shrink-0">
                        <AvatarImage src="" alt="" />
                        <AvatarFallback className="rounded-lg">
                          A
                        </AvatarFallback>
                      </Avatar>
                      <span className="grid flex-1 min-w-0 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          Muhammad Rifky Ramadani
                        </span>
                        <span className="text-muted-foreground truncate text-xs">
                          Admin
                        </span>
                      </span>
                    </span>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <LogOut />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            {/*  */}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
