"use client";
import React, { useCallback, useEffect, useState } from "react";
import "../../../components/user-profile/profile-sidbar/TabComponent.css";
import style from "@/components/user-profile/profile.module.css";
import { useGetUserPostCategoriesQuery } from "@/store/community/communityService";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useTabContent } from "@/context/CommunityProvider";

const CommunityTabs = ({ communityData }) => {
  const [activeTab, setActiveTab] = useState("");
  const { changeContent } = useTabContent();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const postType = searchParams.get("type") ? searchParams.get("type") : "";
  useEffect(() => {
    if (Array.isArray(communityData) && communityData.length && postType) {
      setActiveTab(postType);
      router.replace(
        pathname,
        {
          query: { type: postType ? postType : communityData[0]?.id },
          scroll: false,
        }
        // { scroll: false }
      );
    }
  }, [communityData]);
  const handleTabClick = useCallback((content, categoryId) => {
    setActiveTab(categoryId);
    changeContent(content);
  }, []);

  const buttons = communityData?.map((data, index) => (
    <Link
      key={index}
      className={`tab-button dfd_tab ${activeTab === data.id ? "active" : ""}`}
      onClick={() => handleTabClick(data.description, data.id)}
      href={{
        pathname: "/community-corners",
        query: { type: `${data.id}&${data.slug}` },
      }}
      scroll={false}
    >
      {data.name}
    </Link>
  ));
  return (
    <>
      <div className="tab-container">
        <div className={style.profile_heading}>
          <div className="d-flex align-items-center justify-content-between">
            <div className="tab-buttons">{buttons}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityTabs;
