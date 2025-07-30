"use client";
import React from "react";
import { useGetAllBlogsQuery } from "@/store/blogs/blogService";
import { useSearchParams } from "next/navigation";
import { BlogListWrapper } from "@/components/blog/BlogListWrapper";
import { Loading } from "../Loading";
import { buildQuery, buildQueryString } from "@/utils/helperFn";
import Head from "next/head";
function Blog() {
  const searchParams = useSearchParams();
  const searchTerms = searchParams.get("searchName");

  const pageNo = parseInt(searchParams.get("page")) || 1;

  const queryURL = buildQueryString(pageNo);
  const { data: response, isLoading } = useGetAllBlogsQuery(queryURL);
  if (isLoading) return <Loading />;

  return <>{response ? <BlogListWrapper blogsData={response} /> : null}</>;
}

export default Blog;
