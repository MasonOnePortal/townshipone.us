"use client";
import React from "react";
import style from "@/components/community-corner/community_corners.module.css";
import { FaEllipsis, FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import Link from "next/link";
import { useRemovePostMutation } from "@/store/community/communityService";

export const PostAction = ({ postId }) => {
  const [removePost] = useRemovePostMutation();

  const editPostHandler = () => {};
  return (
    <>
      <div className={style.ac_btn_feed}>
        <div className="dropdown">
          <button
            className="dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FaEllipsis />
          </button>
          <ul
            className={`dropdown-menu dropdown-menu-end ${style.actn_edt_del}`}
            aria-labelledby="dropdownMenuButton1"
          >
            <li onClick={editPostHandler}>
              <Link className="dropdown-item" href="#">
                <FaPenToSquare /> Edit
              </Link>
            </li>
            <li onClick={() => removePost(postId)} className={style.del_brd_ar}>
              <Link className="dropdown-item" href="#">
                <FaTrashCan /> Delete
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
