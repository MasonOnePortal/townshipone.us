import React from "react";
import style from "./community_corners.module.css";
import Link from "next/link";
export const CommunityHeader = ({
  mainTitle,
  linkOne,
  titleOne,
  linkTwo,
  titleTwo,
}) => {
  return (
    <div
      className={`d-flex align-items-center justify-content-between ${style.ask_question_wrap}`}
    >
      <h5>{mainTitle}</h5>
      <div className="d-flex align-items-center">

        <div className="">
          <Link href={`${linkTwo}`}>{titleTwo}</Link>
        </div>
      </div>
    </div>
  );
};
