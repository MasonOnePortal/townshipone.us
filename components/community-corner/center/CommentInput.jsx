"use client";
import React, { useState } from "react";
import style from "@/components/community-corner/community_corners.module.css";
import userp_img from "@/public/imgs/user_profile.jpg";
import { useSelector } from "react-redux";
import { useAddCommentOnPostMutation } from "@/store/community/communityService";
import { isEmpty } from "lodash";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Spinner } from "react-bootstrap";
import Image from "next/image";
import { postConstants } from "../community";
const commentInfo = {
  message: "",
};

const validationSchema = Yup.object().shape({
  message: Yup.string().required("Message is required"),
});
export const CommentInput = ({ postType, updateCount, postId }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [addCommentOnPost] = useAddCommentOnPostMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: commentInfo,
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const commentData = {
        postId: postId,
        message: data.message,
      };
      const { data: resData } = await addCommentOnPost(commentData);
      if (!isEmpty(resData) && resData.ok) {
        reset({});
        const randomNumber = Math.floor(Math.random() * 10);
        updateCount(randomNumber);
      }
    } catch (error) {
      console.error(" error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="d-flex py-4">
        <div className={style.comment_frst}>
          <div className={style.post_area_usr_img}>
            <Image
              width={40}
              height={40}
              sizes="100dvw"
              style={{ width: "40px", height: "40px" }}
              src={currentUser.avatar ? currentUser.avatar : userp_img}
              alt=""
            />
          </div>
        </div>
        <div className="w-100">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <div className="mb-3">
                <label className="form-label custom_label">
                  {postType !== postConstants.postType
                    ? `Your Comment`
                    : "Your Answer"}
                </label>
                <div className={`  ${errors.message ? style.error : ""} `}>
                  <textarea
                    className="form-control"
                    placeholder="Write here..."
                    rows="4"
                    name="message"
                    {...register("message")}
                  ></textarea>
                </div>
              </div>
              {errors.message && (
                <p className={style.textColor}>{errors.message.message}</p>
              )}
            </div>

            <div className="">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" role="status">
                      <span className="visually-hidden"> Loading... </span>
                    </Spinner>
                    Loading...
                  </>
                ) : (
                  <div>Post</div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
