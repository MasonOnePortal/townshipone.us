"use client";
import React from "react";
import { useBlogsByCategoryQuery } from "@/store/blogs/blogService";
import { useParams, useSearchParams } from "next/navigation";
import { BlogListWrapper } from "@/components/blog/BlogListWrapper";
import { Loading } from "../Loading";
import { buildQuery } from "@/utils/helperFn";

function BlogByCategory() {
  const searchParams = useSearchParams();
  const searchTerms = searchParams.get("searchName")
    ? searchParams.get("searchName")
    : "";
  const pageNo = searchParams.get("page") ? searchParams.get("page") : 1;
  const { categoryId } = useParams();
  const queryURL = buildQuery(pageNo, searchTerms);
  const { data: response, isLoading } = useBlogsByCategoryQuery(
    {
      category: categoryId,
      query: queryURL,
    },
    { skip: categoryId ? false : true }
  );
  if (isLoading) return <Loading />;
  return <>{response ? <BlogListWrapper blogsData={response} /> : null}</>;
}

export default BlogByCategory;
