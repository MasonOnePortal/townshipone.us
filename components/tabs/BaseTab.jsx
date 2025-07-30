import React, { useState } from "react";
import style from "../../components/user-profile/profile.module.css";

const BaseTab = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <ul className={`nav nav-pills ${style.tb_nv_cl}`} role="tablist">
        {tabs.map((tab, index) => (
          <li className="nav-item" key={index}>
            <a
              className={`nav-link ${activeTab === index ? "active" : ""}`}
              data-bs-toggle="pill"
              href={`#${tab.title}`}
              onClick={() => handleTabClick(index)}
            >
              {tab.title}
            </a>
          </li>
        ))}
      </ul>
      <div className="tab-content">
        {tabs.map((tab, index) => (
          <div
            className={`tab-pane fade ${
              activeTab === index ? "show active" : ""
            }`}
            id={tab.title}
            key={index}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BaseTab;
