"use client";
import { useGetOneNewsQuery } from "@/store/news/newsService";
import { useParams } from "next/navigation";
import BlogDetailsData from "@/components/blog/BlogDetailsData";
import { isEmpty } from "lodash";
import { Loading } from "../Loading";
function NewsDetails() {
  const { newsId } = useParams();
  const { data: newsInfo, isLoading } = useGetOneNewsQuery(newsId);
  if (!isEmpty(newsInfo) && isLoading) return <Loading />;
  return (
    <>
      <BlogDetailsData blogData={newsInfo} />
    </>
  );
}

export default NewsDetails;
