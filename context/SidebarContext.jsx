import { useContext, useState, createContext } from "react";
export const initialValue = {
  toggleSidsebar: () => {},
  sidebarStatus: false,
};
export const ResponsiveSidebarContext = createContext(initialValue);
export const ResponsiveSidebarProvider = ({ children }) => {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const toggleSidsebar = (val) => {
    setSidebarStatus(val);
  };
  return (
    <ResponsiveSidebarContext.Provider
      value={{ sidebarStatus, toggleSidsebar }}
    >
      {children}
    </ResponsiveSidebarContext.Provider>
  );
};

export const useResponsiveSidebar = () => useContext(ResponsiveSidebarContext);
