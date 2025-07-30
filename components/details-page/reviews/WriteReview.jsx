"use client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useForm, Controller } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import style2 from "./rating_raview.module.css";
import style from "@/components/user-profile/profile.module.css";

import * as Yup from "yup";
import { useParams } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddBusinessReviewMutation } from "@/store/business/businessService";

import { Rating } from "react-simple-star-rating";
import { Spinner } from "react-bootstrap";
const validationSchema = Yup.object().shape({
  comment: Yup.string().required("Review is required"),
});
const reviewInfo = { comment: "" };

export const WriteReview = ({ reviewId = "" }) => {
  const { businessID } = useParams();
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: reviewInfo,
    resolver: yupResolver(validationSchema),
  });
  const [rating, setRating] = useState(0);
  const [addBusinessReview] = useAddBusinessReviewMutation();
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    reset({});
    setRating(0);
    setShow(false);
  };

  const handleShow = () => {
    reset({});
    setRating(0);
    setShow(true);
  };

  const updateRating = (rate) => {
    setRating(rate);
  };

  const submitReview = async (data) => {
    const addRatingData = { ...data, rating: rating };
    try {
      setLoading(true);
      const { data: dataSet } = await addBusinessReview({
        id: businessID,
        data: addRatingData,
      });
      if (dataSet && dataSet.ok) {
        reset({});
        setRating(0);
        setShow(false);
      }
    } catch ({ data: error }) {
      console.log("catch", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className={`btn btn-primary ${style2.rt_r_cl}`}
        type="button "
        onClick={handleShow}
      >
        Write Review
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Write a Review </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            <form onSubmit={handleSubmit(submitReview)}>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <div className={style2.rating_wrapper}>
                      <Rating initialValue={rating} onClick={updateRating} />
                    </div>
                    <div className={`  ${errors.comment ? style.error : ""} `}>
                      <textarea
                        className="form-control"
                        placeholder="Write a review"
                        rows="4"
                        name="comment"
                        {...register("comment")}
                      ></textarea>
                    </div>
                  </div>
                  <div>
                    {errors.comment && (
                      <p className={style.textColor}>
                        {errors.comment.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <button type="submit">
                {loading ? (
                  <>
                    <Spinner
                      animation="border"
                      size="sm"
                      qualifications="status"
                    >
                      <span className="visually-hidden"> Loading... </span>
                    </Spinner>
                    Loading...
                  </>
                ) : (
                  "Save"
                )}
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
