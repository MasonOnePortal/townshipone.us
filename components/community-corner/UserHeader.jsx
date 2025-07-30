"use client";
import React from "react";
import { useSelector } from "react-redux";
import style from "./community_corners.module.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getTitle } from "./community";
import { useCurrentUserQuery } from "@/store/auth/authService";

export const UserHeader = () => {
  const { data: userData, isLoading: load, isError } = useCurrentUserQuery();
  const { currentUser } = useSelector((state) => state.auth);
  const params = useSearchParams();
  const postType = params.get("type") ?? "";
  return (
    <>
      <div
        className={`d-flex align-items-center justify-content-between ${style.ask_question_wrap}`}
      >
        <h5>{getTitle(postType) ? getTitle(postType) : "All"}</h5>
        {currentUser.id ? (
          <div className="d-flex align-items-center">
            <div className="me-2">
              <Link href="/community-corners/ask-question">Create Post</Link>
            </div>
            <div className="">
              <Link href="/community-corners/my-topics">Dashboard</Link>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};
