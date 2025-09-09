"use client";
import { useTabContent } from "@/context/CommunityProvider";
import React from "react";
import Content from "../card/Content";

export const TabContainer = () => {
  const { activeTabContent } = useTabContent();
  return (
    <div className="container">
      <h1 className="fs-4 mb-3">
        Deerfield & Symmes Township OH Community Hub
      </h1>
      <p
        className="contentCss"
        dangerouslySetInnerHTML={{ __html: activeTabContent }}
      ></p>
      {/* <Content contentData={activeTabContent} /> */}
    </div>
  );
};
