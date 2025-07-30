"use client";
import React from "react";
import style from "@/components/community-corner/community_corners.module.css";
import { Loading } from "@/components/Loading";
import RightArea from "./RightArea";
import { BlogsList } from "./BlogsList";
import { useGetAllBlogsQuery } from "@/store/blogs/blogService";
import { isArray } from "lodash";
import SearchInput from "@/components/filter-sidebar/SearchInput";
export const RightSidebarWrapper = () => {
  const { data: response, isLoading } = useGetAllBlogsQuery();
  if (isLoading) return <Loading />;
  const { data: blogs, ...restData } = { ...response };
  const recentBlogs = isArray(blogs) && blogs.length ? blogs.slice(0, 5) : null;
  return (
    <div>
      <SearchInput
        locationPlaceholder={"Location"}
        namePlaceholder={"Name"}
        zipCodePlaceholder={"Zip Code"}
        cityPlaceHolder={"City"}
        customFields={{ name: false, location: false }}
      />
      <div className={style.recent_topic}>
        <div className="mb-3">
          <RightArea />
        </div>
        <div className="mb-3">
          <BlogsList
            title={"Recent Blogs"}
            urlPage="blog"
            dataArr={recentBlogs}
          />
        </div>
      </div>
    </div>
  );
};
