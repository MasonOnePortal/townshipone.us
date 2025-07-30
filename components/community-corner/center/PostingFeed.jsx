"use client";
import { isArray, isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { CommunityHeader } from "../CommunityHeader";
import style from ".././community_corners.module.css";
import { useGetUserPostCategoriesQuery } from "@/store/community/communityService";
import SearchInPage from "@/components/search-in-page/SearchInPage";

import CommunityTabs from "./CommunityTabs";
import { PostingFeedWrapper } from "./PostingFeedWrapper";
function PostingFeed() {
  const { data: communityType, isLoading } = useGetUserPostCategoriesQuery();
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <>
      {Array.isArray(communityType) && communityType.length ? (
        <CommunityTabs communityData={communityType} />
      ) : null}


      {!isEmpty(communityType) ? (
        <div className={style.searchfilters}>
          <SearchInPage className={style.searchfilterpost} />
        </div>
      ) : null}
      <PostingFeedWrapper />
    </>
  );
}

export default PostingFeed;
