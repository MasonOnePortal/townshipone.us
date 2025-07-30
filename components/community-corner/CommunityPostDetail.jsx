"use client";
import { Empty } from "@/components/Empty";
import { Loading } from "@/components/Loading";
import { CommentInput } from "@/components/community-corner/center/CommentInput";
import { CommentsWrapper } from "@/components/community-corner/center/CommentsWrapper";
import { QuestionInfo } from "@/components/community-corner/center/QuestionInfo";
import { useGetOnePostQuery } from "@/store/community/communityService";
import React from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { PostDetails } from "./PostDetails";
export const CommunityPostDetail = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { postId } = useParams();
  const {
    data: post,
    isLoading,
    refetch,
  } = useGetOnePostQuery(postId, {
    refetchOnMountOrArgChange: true,
  });
  if (isLoading) return <Loading />;
  return (
    <>
      <QuestionInfo postData={post} />
      {!!post.details ? (
        <div className="">
          <PostDetails content={post.details} />
        </div>
      ) : null}
      {!!post.postType?.isCommentEnable ? (
        <>
          {post?.comments?.length ? (
            <CommentsWrapper />
          ) : (
            <div className="">
              <Empty message="No Comments available" />
            </div>
          )}
        </>
      ) : null}
      {post.postType?.isCommentEnable &&
      currentUser.id &&
      post?.approvalStatus === "Verified" ? (
        <CommentInput
          postType={post.postType.slug}
          updateCount={refetch}
          postId={postId}
        />
      ) : null}
    </>
  );
};
