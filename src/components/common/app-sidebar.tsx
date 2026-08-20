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

const AppSidebar = () => {
  const { isMobile } = useSidebar();
  return (
    <Sidebar>
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
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              {/* Triger */}
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton size="lg">
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
