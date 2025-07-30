import { Outlet } from "next/navigation";
// import { ResponsiveSidebarProvider } from "@/context/SidebarContext";
// import Header from "../Header/Header";
import { FooterWrapper } from "../footer/FooterWrapper";

function MainLayout() {
  return (
    <div>
      {/* <Header /> */}

      <Outlet />
      <FooterWrapper />
    </div>
  );
}

export default MainLayout;
