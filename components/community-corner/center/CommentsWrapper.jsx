"use client";
import { Loading } from "@/components/Loading";
import React from "react";
import { Reply } from "./Reply";
import { useGetAllCommentOfPostQuery } from "@/store/community/communityService";
import { useParams } from "next/navigation";
import style from "@/components/community-corner/community_corners.module.css";
export const CommentsWrapper = () => {
  const { postId } = useParams();

  const { data: comments, isLoading } = useGetAllCommentOfPostQuery(postId);
  if (isLoading) return <Loading />;

  return (
    <>
      {comments?.map((item) => (
        <div className={style.reply_ms_wrapper} key={item.id}>
          <Reply reply={item} />
        </div>
      ))}
    </>
  );
};
