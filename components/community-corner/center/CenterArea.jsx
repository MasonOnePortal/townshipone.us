"use client";
import style from "@/components/community-corners/community_corners.module.css";
import PostingFeed from "./PostingFeed";
function CenterArea() {
  return (
    <>
      <div className={style.center_data_wrap}>
        <PostingFeed />
      </div>
    </>
  );
}

export default CenterArea;
