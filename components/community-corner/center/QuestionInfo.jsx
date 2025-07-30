"use client";
import React from "react";
import style from "@/components/community-corner/community_corners.module.css";
import { timeAgoFn } from "@/utils/helperFn";
export const QuestionInfo = ({ postData }) => {
  return (
    <div className={style.topic_data_wrapper}>
      <div className={style.topic_area}>
        <p>{postData?.question}</p>
      </div>
      <div className={style.topic_time_area}>
        {postData?.createdAt ? <p>{timeAgoFn(postData?.createdAt)}</p> : null}
      </div>
    </div>
  );
};
