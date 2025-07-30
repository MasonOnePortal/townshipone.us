"use client";
import React from "react";
import { useParams, useSearchParams } from "next/navigation";
import Loader from "@/components/loader/Loader";
import { BlogListWrapper } from "@/components/blog/BlogListWrapper";
import { useNewsByCategoryQuery } from "@/store/news/newsService";
import { buildQuery } from "@/utils/helperFn";
import { BlogListWrappers } from "../blog/BlogListWrappers";

function NewsByCategory() {
  const searchParams = useSearchParams();
  const searchTerms = searchParams.get("searchName")
    ? searchParams.get("searchName")
    : "";
  const pageNo = searchParams.get("page") ? searchParams.get("page") : 1;
  const { categoryId } = useParams();
  const queryURL = buildQuery(pageNo, searchTerms);
  const { data: response, isLoading } = useNewsByCategoryQuery(
    {
      category: categoryId,
      query: queryURL,
    },
    { skip: categoryId ? false : true }
  );
  if (isLoading) return <Loader />;
  return <>{response ? <BlogListWrappers blogsData={response} /> : null}</>;
}

export default NewsByCategory;
