"use client";
import { useGetAllNewsQuery } from "@/store/news/newsService";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/loader/Loader";
import { BlogListWrapper } from "@/components/blog/BlogListWrapper";
import { buildQuery } from "@/utils/helperFn";
import { BlogListWrappers } from "../blog/BlogListWrappers";
function News() {
  const searchParams = useSearchParams();
  const searchTerms = searchParams.get("searchName")
    ? searchParams.get("searchName")
    : "";
  const pageNo = searchParams.get("page") ? searchParams.get("page") : 1;
  const queryURL = buildQuery(pageNo, searchTerms);

  const { data: response, isLoading } = useGetAllNewsQuery(queryURL);
  if (isLoading) return <Loader />;


  return <>{response ? <BlogListWrappers blogsData={response} /> : null}</>;
}

export default News;
