"use client";
import { useContext, useState, createContext } from "react";
export const initialValue = {
  changeContent: () => {},
  activeTabContent: "",
};
export const CommunityContext = createContext(initialValue);
export const CommunityProvider = ({ children }) => {
  const [activeTabContent, setActiveTabContent] = useState(
    `<p>
        Engage with your community through our dedicated space for updates, discussions, and shared experiences. Stay informed with local announcements from <strong>Township OH</strong>.
      </p>
      <p>
        Participate in Q&A sessions to share knowledge or seek advice and reconnect with lost items through our active lost and found section. Together, we’re building a stronger, more connected community. 
      </p>`
  );
  const changeContent = (val) => {
    setActiveTabContent(val);
  };
  return (
    <CommunityContext.Provider value={{ activeTabContent, changeContent }}>
      {children}
    </CommunityContext.Provider>
  );
};

export const useTabContent = () => useContext(CommunityContext);
