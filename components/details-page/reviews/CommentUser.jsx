import React from "react";
import Image from "next/image";
import defaultImage from "@/public/imgs/user.png";

export const CommentUser = ({ user }) => {
  return (
    <div className="d-flex align-items-center no_wrap">
      <div className="symbol symbol-circle symbol-50px me-3">
        <a href="#">
          <div className="symbol-label tbl_img">
            <Image
              // onError={}
              src={user.avatar ? user.avatar : defaultImage}
              alt=" logo"
              className="w-100"
              width={0}
              height={0}
              sizes="100dvw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </a>
      </div>
      <div className="tbl_nm">
        {user.name ? <p> {user.name}</p> : null}
        {user?.email ? (
          <h5>
            <span>{user?.email}</span>
          </h5>
        ) : null}
      </div>
    </div>
  );
};
