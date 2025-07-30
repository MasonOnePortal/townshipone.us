"use client";
import React, { useState } from "react";
import "./TabComponent.css";
import style from "@/components/user-profile/profile.module.css";
import UpdatePassword from "./UpdatePassword";
import Plan from "../Plan";
import PersonalDetails from "./PersonalDetails";
import PlanHistory from "./PlanHistory";

const MyProfileView = () => {
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <>
      <div className="tab-container">
        <div className={style.profile_heading}>
          <div
            className={`d-flex align-items-center justify-content-between ${style.heading_wr_c} `}
          >
            <div className="tab-buttons">
              <button
                className={`tab-button ${activeTab === 1 ? "active" : ""}`}
                onClick={() => handleTabClick(1)}
              >
                Personal Details
              </button>
              <button
                className={`tab-button ${activeTab === 2 ? "active" : ""}`}
                onClick={() => handleTabClick(2)}
              >
                Update Password
              </button>
              <button
                className={`tab-button ${activeTab === 3 ? "active" : ""}`}
                onClick={() => handleTabClick(3)}
              >
                Plan
              </button>
              <button
                className={`tab-button ${activeTab === 4 ? "active" : ""}`}
                onClick={() => handleTabClick(4)}
              >
                Plan History
              </button>
            </div>
          </div>
        </div>
        <div className="tab-content">
          {activeTab === 1 && <PersonalDetails />}
          {activeTab === 2 && <UpdatePassword />}
          {activeTab === 3 && <Plan />}
          {activeTab === 4 && <PlanHistory />}
        </div>
      </div>
    </>
  );
};

export default MyProfileView;
