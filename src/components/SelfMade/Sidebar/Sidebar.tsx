import {
  SidebarGroup,
  SidebarMenuButton,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { memo, useCallback, useMemo } from "react";
import { getSidebar, sidebar_data } from "./sidebarUtils";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import useZustandStore from "@/Zustand/store";
const SidebarComp = () => {
  const { isSidebarVisible } = useZustandStore();
  return (
    <>
      <BgFade />
      <div
        className={cn(
        `
        backdrop-blur-[10px]
        border-r-1
        border-glass-border
        h-screen
        screen
        top-[var(--navbar-height)]
        w-[var(--side-bar-width)] 
        bg-glass-bg  
        z-[var(--navbar-z-index)] 
        fixed 
        lg:block 
        lg:translate-x-0
        transform transition-transform duration-300 ease-in-out
        `,
          isSidebarVisible
            ? "translate-x-0 z-41"
            : "-translate-x-full lg:translate-x-0"
        )}
      >
        <SidebarProvider>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {sidebar_data.map((elem) => (
                  <EachMenu key={elem} route={elem} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarProvider>
      </div>
    </>
  );
};

interface MenuProp {
  route: string;
}
const EachMenu = ({ route }: MenuProp) => {
  const { pathname } = useLocation();
  const isActive = useMemo(() => pathname === route, [pathname]);
  const { title, icon: IconComponent } = getSidebar(route);
  const navigate = useNavigate();
  const navigationFn = useCallback(() => {
    navigate(route);
  }, [route]);
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={navigationFn}
        className={cn(
          "text-[1rem] px-[1rem] py-[1.5rem] font-medium hover:cursor-pointer rounded-[var(--border-radius-all)] hover:scale-104 transition duration-300 transform",
          isActive && "gradient-bg"
        )}
        isActive={isActive}
      >
        <IconComponent /> {title}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

const BgFade = () => {
  const { isSidebarVisible, toggleMobileMenu } = useZustandStore();
  return (
    <div
      className={cn(
        "fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300",
        isSidebarVisible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
      onClick={toggleMobileMenu}
    />
  );
};

const Sidebar = memo(SidebarComp);
export default Sidebar;
