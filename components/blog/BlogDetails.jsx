"use client";
import React, { useState } from "react";
import { useGetOneBlogQuery } from "@/store/blogs/blogService";
import { useParams } from "next/navigation";
import { useGetCommentsOnBlogQuery } from "@/store/blogs/blogService";
import { isEmpty } from "lodash";
import Loader from "@/components/loader/Loader";
import BlogDetailsData from "@/components/blog/BlogDetailsData";
import BlogComments from "@/components/blog/BlogComments";
import CommentForm from "@/components/blog/CommentForm";
import { Empty } from "../Empty";

function BlogDetails() {
  const { blogId } = useParams();
  const [count, setCount] = useState(1);
  const { data: blogInfo, isLoading } = useGetOneBlogQuery(blogId);
  const { data: commentsData, refetch } = useGetCommentsOnBlogQuery({
    blogId: blogId,
    page: count,
  });

  const commentHandler = () => {
    refetch();
  };
  const updateCommentPageCount = () => {
    setCount((preVal) => preVal + 1);
  };
  if (isLoading) return <Loader />;
  return (
    <>
      {!isEmpty(blogInfo) ? (
        <>
          <BlogDetailsData blogData={blogInfo} />
          {!isEmpty(commentsData) && commentsData.data.length ? (
            <BlogComments
              updatePageCount={updateCommentPageCount}
              commentsData={commentsData}
            />
          ) : null}
          <CommentForm commentAdded={commentHandler} />
        </>
      ) : (
        <Empty />
      )}
    </>
  );
}

export default BlogDetails;
