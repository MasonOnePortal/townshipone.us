"use client";
import React, { useState } from "react";
import style from "./blog.module.css";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Spinner } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { isEmpty } from "lodash";
import { useAddCommentOnBlogMutation } from "@/store/blogs/blogService";
import { useParams } from "next/navigation";
const inquiryForm = {
  email: "",
  name: "",
  message: "",
};
const schema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email"),
  message: Yup.string().required("Message is required"),
  name: Yup.string().required("Name is required"),
});
function CommentForm({ commentAdded }) {
  const [addCommentOnBlog] = useAddCommentOnBlogMutation();
  const [loading, setLoading] = useState(false);
  const { blogId } = useParams();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: inquiryForm,
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const newComment = {
      blogId: blogId,
      comment: data,
    };
    try {
      const { data: resData } = await addCommentOnBlog(newComment);
      if (!isEmpty(resData) && resData.ok) {
        reset({});
        commentAdded();
        toast.success("form submitted !");
      }
    } catch (error) {
      console.error(" error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div>
        <div className={style.new_comment} id="comment_here">
          <h4>Write A Comments</h4>
          <form className={style.auth_form} onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className={`custom_label ${style.col_form_label}`}>
                    Name*
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    autoComplete="off"
                    className={`form-control mb-0 ${
                      errors.name ? style.error : ""
                    } `}
                    {...register("name")}
                  />
                  <div>
                    {errors.name && (
                      <p className={style.textColor}>{errors.name.message}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label className={`custom_label ${style.col_form_label}`}>
                    Email*
                  </label>
                  <input
                    type="email"
                    autoComplete="off"
                    placeholder="Enter Email Address"
                    className={`form-control mb-0 ${
                      errors.email ? style.error : ""
                    } `}
                    {...register("email")}
                  />
                  <div>
                    {errors.email && (
                      <p className={style.textColor}>{errors.email.message}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label className={` custom_label ${style.col_form_label}`}>
                    Message*
                  </label>
                  <textarea
                    rows="4"
                    autoComplete="off"
                    className={`form-control  ${
                      errors.message ? style.error : ""
                    } `}
                    placeholder="Enter Your Comment Here...."
                    {...register("message")}
                  ></textarea>
                  <div>
                    {errors.message && (
                      <p className={style.textColor}>
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className={style.submit_section}>
                <button
                  type="submit"
                  className={`btn btn-primary ${style.submit_btn}`}
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
                    <div>Post Comment</div>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
}

export default CommentForm;
