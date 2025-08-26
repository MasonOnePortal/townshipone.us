"use client";
import React, { useState } from "react";
import style from "@/components/community-corner/community_corners.module.css";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useAddNewPostMutation,
  useGetUserPostCategoriesQuery,
  useUpdateOnePostMutation,
} from "@/store/community/communityService";
import { isEmpty } from "lodash";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { useRouter, useSearchParams } from "next/navigation";

import { CommunityHeader } from "../CommunityHeader";
import { usePostCategoryOptions } from "@/hooks/useUpdateOption";
import { postConstants } from "../community";

const postForm = {
  question: "",
  postType: "",
  details: "",
  city: "",
  zipCode: "",
  address: "",
  state: "",
};

const postSchema = Yup.object().shape({
  question: Yup.string().required("Title is required"),
  city: Yup.string().required("City is required"),
  zipCode: Yup.string().required("Zip Code is required"),
  address: Yup.string().required("Address is required"),
  state: Yup.string().required("State is required"),
});

function PostArea({ postData }) {
  const [loading, setLoading] = useState(false);
  const [postSlug, setPostSlug] = useState("");
  const [postForEdit] = useState({
    ...postForm,
    ...postData,
    postType: postData?.postType.id ?? "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("Id");
  const { currentUser } = useSelector((state) => state.auth);
  const [addNewPost] = useAddNewPostMutation();

  const [updateOnePost] = useUpdateOnePostMutation();
  const { data: communityType } = useGetUserPostCategoriesQuery();
  const postTypeOptions = usePostCategoryOptions(communityType);
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(postSchema),
    defaultValues: postForEdit,
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (postId) {
        const { data: resData, error: errData } = await updateOnePost(data);
        if (errData) {
          throw new Error(errData.data.message);
        }
        if (!isEmpty(resData) && resData.ok) {
          router.push(`/community-corners/my-topics`);
          toast.success("post submitted !");
        }
      } else {
        // Add new Post
        const { data: resData, error: errData } = await addNewPost(data);
        if (errData) {
          throw new Error(errData.data.message);
        }
        if (!isEmpty(resData) && resData.ok) {
          reset({});
          router.push(`/community-corners/my-topics`);
          toast.success("post updated !");
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getPostType = (option) => {
    setValue("postType", option.value);
    setPostSlug((preVal) => (preVal = option.slug));
  };

  if (!currentUser.id) return router.push("/community-corners");

  const checkFieldEnable = () => {
    if (postId) {
      return (
        !isEmpty(postData) && postData.postType.slug !== postConstants.postType
      );
    } else {
      return postSlug !== postConstants.postType;
    }
  };

  return (
    <>
      {currentUser.id ? (
        <CommunityHeader
          mainTitle="Create Post"
          linkOne="/community-corners/my-topics"
          titleOne="Your Posts"
          linkTwo="/community-corners"
          titleTwo="All Posts"
        />
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-3">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label custom_label">Post Type</label>
              <div className={` ${errors.postType ? "error" : ""}`}>
                <Controller
                  name="postType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={postTypeOptions.find(
                        (option) => option.value === field.value
                      )}
                      onChange={(option) => getPostType(option)}
                      options={postTypeOptions}
                    />
                  )}
                />
              </div>
              <div>
                {errors.postType && (
                  <p className={style.textColor}>{errors.postType.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="form-group">
              <label className="col-form-label custom_label">Title</label>
              <textarea
                className={`form-control ${
                  errors.question ? style.error : ""
                } `}
                rows="1"
                {...register("question")}
                placeholder="Title"
              ></textarea>
            </div>
            <div>
              {errors.question && (
                <p className={style.textColor}>{errors.question.message}</p>
              )}
            </div>
          </div>

          {/* Address Fields */}
          <div className="col-md-12">
            <div className="form-group">
              <label className="col-form-label custom_label">Address</label>
              <textarea
                className={`form-control ${errors.address ? style.error : ""} `}
                rows="2"
                {...register("address")}
                placeholder="Enter your address"
              ></textarea>
            </div>
            <div>
              {errors.address && (
                <p className={style.textColor}>{errors.address.message}</p>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label className="col-form-label custom_label">City</label>
              <input
                type="text"
                className={`form-control ${errors.city ? style.error : ""} `}
                {...register("city")}
                placeholder="Enter city"
              />
            </div>
            <div>
              {errors.city && (
                <p className={style.textColor}>{errors.city.message}</p>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label className="col-form-label custom_label">State</label>
              <input
                type="text"
                className={`form-control ${errors.state ? style.error : ""} `}
                {...register("state")}
                placeholder="Enter state"
              />
            </div>
            <div>
              {errors.state && (
                <p className={style.textColor}>{errors.state.message}</p>
              )}
            </div>
          </div>

          <div className="col-md-12">
            <div className="form-group">
              <label className="col-form-label custom_label">Zip Code</label>
              <input
                type="text"
                className={`form-control ${errors.zipCode ? style.error : ""} `}
                {...register("zipCode")}
                placeholder="Enter zip code"
              />
            </div>
            <div>
              {errors.zipCode && (
                <p className={style.textColor}>{errors.zipCode.message}</p>
              )}
            </div>
          </div>

          {checkFieldEnable() ? (
            <div className="col-md-12">
              <div className="form-group">
                <label className="col-form-label custom_label">Details</label>
                <textarea
                  className={`form-control ${
                    errors.message ? style.error : ""
                  } `}
                  rows="4"
                  {...register("details")}
                  placeholder="Details"
                ></textarea>
              </div>
            </div>
          ) : null}
        </div>

        <div className="text-right">
          <button
            type="submit"
            className={`post_submit_btn ${style.post_btn_option}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" role="status">
                  <span className="visually-hidden"> Loading... </span>
                </Spinner>
              </>
            ) : (
              <div>Post</div>
            )}
          </button>
        </div>
      </form>
      <Toaster position="bottom-right" />
    </>
  );
}

export default PostArea;
