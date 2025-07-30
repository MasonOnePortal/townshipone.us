"use client";
import { Post } from "./Post";
import { isArray, isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { Empty } from "@/components/Empty";
import { CommunityHeader } from "../CommunityHeader";
import style from ".././community_corners.module.css";
import {
  useGetAllPostByTypeQuery,
  useGetAllPostQuery,
  useGetUserPostCategoriesQuery,
} from "@/store/community/communityService";
import { Loading } from "@/components/Loading";
import Pagination from "@/components/main-listing/Pagination";
import { useSearchParams } from "next/navigation";
import { buildQuery } from "@/utils/helperFn";
import SearchInPage from "@/components/search-in-page/SearchInPage";
import Link from "next/link";
import Content from "@/components/card/Content";
import CommunityTabs from "./CommunityTabs";
import { useMemo } from "react";
export const PostingFeedWrapper = () => {
  const searchParams = useSearchParams();
  const postType = searchParams.get("type") ? searchParams.get("type") : "";
  const searchTerms = searchParams.get("searchName")
    ? searchParams.get("searchName")
    : "";
  const pageNo = searchParams.get("page") ? searchParams.get("page") : 1;
  const filterZipCode = searchParams.get("filterZipCode");
  const filterCity = searchParams.get("filterCity");

  const queryURL = useMemo(
    () => buildQuery(pageNo, searchTerms, filterZipCode, undefined, filterCity),
    [pageNo, searchTerms, filterCity, filterZipCode]
  );

  const {
    data: posts,
    isLoading,
    refetch,
    isFetching,
  } = useGetAllPostByTypeQuery({
    category: postType,
    query: queryURL,
  });
  if (isFetching || isLoading) return <Loading />;
  return (
    <div>
      {Array.isArray(posts.data) && posts.data.length ? (
        <div>
          {posts.data?.map((item) => (
            <div key={item.id} className="">
              <Post postData={item} />
            </div>
          ))}
        </div>
      ) : (
        <Empty />
      )}
      <div>
        {!isEmpty(posts.data) ? (
          <Pagination
            currentPage1={posts.page}
            totalrecord={posts.totalDocs}
            recordLimit={posts.limit}
            totalPages={posts.totalPages}
            prevPage={posts.prevPage}
            nextPage={posts.nextPage}
          />
        ) : null}
      </div>
    </div>
  );
};
