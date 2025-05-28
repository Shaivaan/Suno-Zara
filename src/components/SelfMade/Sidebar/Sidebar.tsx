import {
  SidebarGroup,
  SidebarMenuButton,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { memo, useMemo } from "react";
import { getSidebar, sidebar_data } from "./sidebarUtils";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
const SidebarComp = () => {
  return (
    <div
      className={`border-r-1 border-glass-border h-screen screen top-[var(--navbar-height)] fixed w-[var(--side-bar-width)] bg-glass-bg z-[var(--navbar-z-index)]`}
    >
      <SidebarProvider>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebar_data.map((elem) => <EachMenu route={elem}/>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarProvider>
    </div>
  );
};

interface MenuProp{
    route:string
}
const EachMenu = ({route}:MenuProp) => {
  const {pathname} = useLocation();
  const isActive = useMemo(()=>pathname === route,[pathname])
  const { title, icon: IconComponent } = getSidebar(route);
  return (
    <SidebarMenuItem>
      <SidebarMenuButton className={cn('text-[1rem] px-[1rem] py-[1.5rem] font-medium hover:cursor-pointer rounded-[var(--border-radius-all)]',isActive && 'gradient-bg')} isActive={isActive}><IconComponent/> {title}</SidebarMenuButton>
    </SidebarMenuItem>
  );
};

const Sidebar = memo(SidebarComp);
export default Sidebar;
