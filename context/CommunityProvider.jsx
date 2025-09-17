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
        Welcome to the sophisticated heart of our townships — your premier space to connect, share, and stay informed. From upscale community news and exclusive announcements to shared experiences, this is where <strong> Deerfield Township OH & Symmes Township OH</strong> come together.
      </p>
      <p>
         Discover stories and resources that enhance our premium community bonds. Get involved and stay connected to the finest our townships have to offer. This is your digital gathering place for the <strong> Deerfield Township OH & Symmes Township OH</strong> community — always refined, always local.
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
