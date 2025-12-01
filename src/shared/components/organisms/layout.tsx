import { SidebarProvider, SidebarTrigger } from "../atoms/sidebar";
import AppSidebar from "./sidebar";
import Header from "./header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Header />
      <SidebarProvider>
        <AppSidebar className="top-[58px] h-[calc(100vh-58px)]" />

        <main className="p-4 md:pl-64 w-full">
          <SidebarTrigger className="md:hidden" />
          <Outlet />
        </main>
      </SidebarProvider>
    </>
  );
};

export default MainLayout;
