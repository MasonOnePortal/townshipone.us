"use client";
import React from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { isEmpty } from "lodash";
import { useGetOnePostQuery } from "@/store/community/communityService";
import PostArea from "./PostArea";
import { Loading } from "@/components/Loading";
export const PostFormWrapper = () => {
  const searchParams = useSearchParams();
  const postId = searchParams.get("Id") ?? "";
  const { currentUser } = useSelector((state) => state.auth);

  const { data: postValues, isLoading } = useGetOnePostQuery(postId, {
    skip: postId ? false : true,
  });
  if (!postId) {
    return <PostArea />;
  }
  if (!isLoading && !isEmpty(postValues)) {
    return <PostArea postData={postValues} />;
  }
  return null;
};
