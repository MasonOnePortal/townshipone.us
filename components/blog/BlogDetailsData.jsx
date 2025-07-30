"use client";
import style from "./blog.module.css";
import { FaRegCommentDots } from "react-icons/fa6";
import { isArray, isEmpty } from "lodash";
import Image from "next/image";
import { useState } from "react";
import imgPlaceHolder from "@/public/imgs/PlaceHolder.jpg";
function BlogDetailsData({ blogData }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <>
      <div className={style.blog_details_wrapper}>
        <h2>{blogData?.name}</h2>
        <div className="d-flex align-items-center">
          {!isArray(blogData?.comments) && blogData?.comments ? (
            <div
              className={`d-flex ${style.blog_footer} ${style.blog_details_head}`}
            >
              <div>
                Comments <FaRegCommentDots className="ms-1" />
              </div>
              <div>
                <b>{blogData.comments.length}</b>
              </div>
            </div>
          ) : null}
        </div>
        <div className={style.blogdetails_img}>
          {blogData?.image ? (
            <Image
              // src={blogData.image}
              src={
                imageError ? imgPlaceHolder : blogData.image || imgPlaceHolder
              }
              onError={handleImageError}
              alt="logo"
              width={0}
              height={0}
              sizes="100dvw"
              style={{ width: "100%", height: "450px" }}
            />
          ) : null}
        </div>

        <div className={style.blog_text_cntnt_data}>
          <p
            className="mb-0"
            dangerouslySetInnerHTML={{
              __html: blogData?.description,
            }}
          ></p>
        </div>
        <div>
          {blogData?.website && (
            <div className="web_link">
              <a
                href={blogData.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <b>Websit Url: </b>
                {blogData.website}
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BlogDetailsData;
