"use client";
import React from "react";
import { UserInfo } from "./UserInfo";
import style from "@/components/community-corner/community_corners.module.css";

export const Reply = ({ reply }) => {
  return (
    <>
      <div className={style.post_reply_n_t}>
        <div
          className="mb-0"
          dangerouslySetInnerHTML={{
            __html: reply.message,
          }}
        ></div>
      </div>
      <UserInfo createdDate={reply.createdAt} userData={reply.repliedBy} />
    </>
  );
};
