"use client";
import React from "react";
import userprofile from "@/public/imgs/user.png";
import style from "@/components/community-corner/community_corners.module.css";
import { timeAgoFn } from "@/utils/helperFn";
import Image from "next/image";
import { FaRegComment } from "react-icons/fa6";
export const UserInfo = ({ userData, createdDate, postTypes }) => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-end">
        <div className="d-inline-flex align-items-center ">
          <div className={` d-flex justify-content-end ${style.spnStyl}`}>
            <div className={style.post_area_usr_img}>
              <Image
                width={40}
                height={40}
                sizes="100dvw"
                style={{ width: "40px", height: "40px" }}
                src={userData?.avatar ? userData?.avatar : userprofile}
                alt="user-image"
              />
            </div>
          </div>
          <div>
            <div className={style.name_p_ar}>
              <h4>
                {userData?.first_name} {userData?.last_name}
              </h4>
              {postTypes ? (
                <span className={style.postTypesstyl}>{postTypes}</span>
              ) : null}
            </div>
            <div className={style.time_ago_wrapper}>
              {createdDate ? <p>{timeAgoFn(createdDate)}</p> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
