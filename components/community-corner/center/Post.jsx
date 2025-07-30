"use client";
import React from "react";
import style from "@/components/community-corner/community_corners.module.css";
import { FaRegComment } from "react-icons/fa6";
import userprofile from "@/public/imgs/user.png";
import Link from "next/link";
import { useSelector } from "react-redux";
import Image from "next/image";
import { timeAgoFn } from "@/utils/helperFn";
import { postConstants } from "../community";
export const Post = ({ postData }) => {
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <>
      <div className={`mb-4 ${style.fd_tp} ${style.wrap_lst_fd} `}>
        <div className={`${style.name_cl_aew}`}>
          <div></div>
        </div>
        <Link
          href={postData.id ? `/community-corners/${postData.id}` : ""}
          className={`d-flex justify-content-between ${style.cmnt_ara_cl}`}
        >
          <div className={style.post_question_cl_ns}>
            <div>{postData.question}</div>
          </div>
        </Link>
        <div className={style.cmnt_ara_cl}>
          <div className="row">
            <div className="col-6">
              <span>
                {postData.postType?.name ? (
                  <span className={style.postTypesstyl}>
                    {postData.postType?.name}
                  </span>
                ) : null}
              </span>
              {postData.postType?.slug !== postConstants.announcement ? (
                <span>
                  <span className={style.postTypesstyls}>
                    <FaRegComment />
                  </span>
                  <span className={style.lk_txt_ar}>
                    (<span>{postData?.comments?.length}</span>)
                  </span>
                </span>
              ) : null}
            </div>

            <div
              className={`col-6 d-flex justify-content-end ${style.spnStyl}`}
            >
              <div className={style.post_area_usr_img}>
                <Image
                  width={35}
                  height={35}
                  sizes="100dvw"
                  style={{
                    width: "35px",
                    height: "35px",
                  }}
                  src={
                    postData.postedBy?.avatar
                      ? postData.postedBy?.avatar
                      : userprofile
                  }
                  alt="user-image"
                />
              </div>

              <div className={style.user_style}>
                {/* <div
                  className={style.postTypesstyls}
                  style={{
                    fontSize: "12px",
                    padding: "0 10px 0 0px",
                    height: "50%",
                    fontWeight: 700,
                  }}
                >
                  {postData.postedBy?.first_name}
                  {postData.postedBy?.last_name}
                </div> */}
                <h4>
                  {postData.postedBy?.first_name} {postData.postedBy?.last_name}
                </h4>
                <div className={style.postTypesstyls}>
                  {postData.createdAt ? (
                    <span className={style.spnStyl}>
                      {timeAgoFn(postData.createdAt)}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
