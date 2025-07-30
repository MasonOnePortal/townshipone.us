"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import * as Yup from "yup";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import style from "@/components/user-profile/profile.module.css";
import toast, { Toaster } from "react-hot-toast";
import { Spinner } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { offerInfo, validationOfferSchema } from "./OfferValidation";
import { memo } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { FaPencilAlt } from "react-icons/fa";
import { ImageDropbox } from "../add-business/ImageDropbox";
import DynamicInput from "@/components/forms/DynamicInput";
const OfferFormEdit = ({
  onSubmitOffer,
  offerData,
  businessList,
  offerTypeOptions,
  loading = false,
}) => {
  const [offerForEdit] = useState({
    ...offerData,
    business: offerData?.business?.id,
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: offerForEdit,
    resolver: yupResolver(validationOfferSchema),
  });
  const onSubmit = (data) => {
    onSubmitOffer(data);
  };

  const [previewImage, setPreviewImage] = useState(
    offerForEdit.image || "/imgs/blank.svg"
  );
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result);

        setValue("image", reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="mb-3 text-center">
          <label className="form-label">Upload Offer Image</label>
          <div
            className={`  ${errors.image ? style.error : ""} image-container`}
          >
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              name="image"
              {...register("image")}
              onChange={handleImageChange}
              style={{ display: "none" }}
              ref={fileInputRef}
            />
            <div className="image-wrapper" onClick={handleImageClick}>
              <Image
                src={previewImage}
                className="image image-styl"
                alt="Preview"
                width={100}
                height={100}
                style={{ cursor: "pointer" }}
              />
              <div className="overlay">
                <FaPencilAlt className="pencil-icon" />
              </div>
            </div>
          </div>
          <label className="form-label form-label-style ">
            Allowed file types: (png, jpg, jpeg).
          </label>
          <div>
            {errors.image && (
              <p className="error-message">{errors.image.message}</p>
            )}
          </div>
        </div>
        <div className="col-lg-6 ">
          <label className="form-label">
            Select Offer Category <span className="required-star">*</span>
          </label>
          <div className={`  ${errors.offerType ? style.error : ""} `}>
            <Controller
              name="offerType"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  value={offerTypeOptions.find(
                    (option) => option.value === field.value
                  )}
                  onChange={(selectedOption) => {
                    field.onChange(
                      selectedOption ? selectedOption.value : null
                    );
                  }}
                  options={offerTypeOptions}
                />
              )}
            />
          </div>

          <div style={{ marginTop: "12px" }}>
            {errors.offerType && (
              <p className={style.textColor}>{errors.offerType.message}</p>
            )}
          </div>
        </div>
        <div className="col-lg-6  ">
          <div className="mb-3">
            <label className="form-label">
              OfferTitle <span className="required-star">*</span>
            </label>
            <div className={`${errors.title ? style.error : ""} `}>
              <input
                type="text"
                autoComplete="off"
                placeholder="Offer Title"
                name="title"
                className="form-control"
                {...register("title")}
              />
            </div>
          </div>
          <div>
            {errors.title && (
              <p className={style.textColor}>{errors.title.message}</p>
            )}
          </div>
        </div>

        <div className="col-lg-6 col-12">
          <div className="mb-3">
            <label className="form-label">
              Select Business <span className="required-star">*</span>
            </label>
            <div className={`${errors.business ? style.error : ""} `}>
              <Controller
                name="business"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    value={businessList.find(
                      (option) => option.value === field.value
                    )}
                    onChange={(selectedOption) => {
                      field.onChange(
                        selectedOption ? selectedOption.value : null
                      );
                    }}
                    options={businessList}
                    isSearchable={true}
                    getOptionLabel={(option) => option.label}
                    getOptionValue={(option) => option.value}
                  />
                )}
              />
            </div>
            <div style={{ marginTop: "12px" }}>
              {errors.business && (
                <p className={style.textColor}>{errors.business.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-3 col-6">
          <div className="mb-3">
            <label className="form-label">
              Discount(%) <span className="required-star">*</span>
            </label>
            <div
              className={`  ${errors.discountPercentage ? style.error : ""} `}
            >
              <input
                type="text"
                autoComplete="off"
                placeholder="Discount"
                className="form-control"
                name="discountPercentage"
                maxLength="3"
                {...register("discountPercentage")}
              />
            </div>
            <div></div>
          </div>
          <div>
            {errors.discountPercentage && (
              <p className={style.textColor}>
                {errors.discountPercentage.message}
              </p>
            )}
          </div>
        </div>
        <div className="col-lg-3 col-md-3 col-6">
          <div className="mb-3">
            <label className="form-label">
              Coupon Code <span className="required-star">*</span>
            </label>
            <div className={`  ${errors.couponCode ? style.error : ""} `}>
              <input
                type="text"
                autoComplete="off"
                placeholder="Coupan Code"
                className="form-control"
                name="couponCode"
                {...register("couponCode")}
              />
            </div>
          </div>
          <div>
            {errors.couponCode && (
              <p className={style.textColor}>{errors.couponCode.message}</p>
            )}
          </div>
        </div>
        <div className="col-lg-6 col-12">
          <div className="mb-3">
            <label className="form-label">
              Start Date <span className="required-star">*</span>
            </label>
            <div className={`  ${errors.endDate ? style.error : ""} `}>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <ReactDatePicker
                    className="form-control"
                    minDate={new Date()}
                    {...field}
                    placeholderText="Select start date"
                    autoComplete="off"
                    selected={field.value}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => field.onChange(date)}
                  />
                )}
              />
            </div>
          </div>
          <div>
            {errors.startDate && (
              <p className={style.textColor}>{errors.startDate.message}</p>
            )}
          </div>
        </div>
        <div className="col-lg-6 col-12">
          <div className="mb-3">
            <label className="form-label">
              End Date <span className="required-star">*</span>
            </label>
            <div className={`  ${errors.endDate ? style.error : ""} `}>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => {
                  return (
                    <ReactDatePicker
                      {...field}
                      autoComplete="off"
                      className="form-control"
                      selected={field.value}
                      placeholderText="Select end date"
                      dateFormat="dd/MM/yyyy"
                      onChange={(date) => field.onChange(date)}
                      minDate={new Date()}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div>
            {errors.endDate && (
              <p className={style.textColor}>{errors.endDate.message}</p>
            )}
          </div>
        </div>

        <div className="col-lg-6 col-12">
          <div className="mb-3">
            <label className="form-label">
              Description <span className="required-star">*</span>
            </label>
            <div className={`  ${errors.description ? style.error : ""} `}>
              <textarea
                className="form-control"
                rows="4"
                type="text"
                autoComplete="off"
                placeholder="Description"
                name="description"
                {...register("description")}
              ></textarea>
            </div>
          </div>
          <div>
            {errors.description && (
              <p className={style.textColor}>{errors.description.message}</p>
            )}
          </div>
        </div>
        <div className="col-lg-6 col-12">
          <div className="mb-3">
            <label className="form-label">
              Terms and Conditions <span className="required-star">*</span>
            </label>
            <div
              className={`  ${errors.termsAndConditions ? style.error : ""} `}
            >
              <textarea
                className="form-control"
                placeholder="Terms and Conditions"
                rows="4"
                name="termsAndConditions"
                {...register("termsAndConditions")}
              ></textarea>
            </div>
          </div>
          {errors.termsAndConditions && (
            <p className={style.textColor}>
              {errors.termsAndConditions.message}
            </p>
          )}
        </div>

        <div className="col-lg-6">
          <div className="mb-3">
            <label className="form-label">Upload Images</label>
            <ImageDropbox
              imagesArrayList={[]}
              updatedImageFiles={updateFiles}
            />
          </div>
        </div>
        {/* Available Date: */}

        <div className="col-lg-6 col-12">
          <div className="mb-3">
            <label className="form-label">Add Video URLS</label>

            <DynamicInput
              arrData={videos}
              updateData={setVideos}
              hasError={!!errors.videos}
            />
            {errors.videos && (
              <p className={style.textColor}>{errors.videos.message}</p>
            )}
          </div>
        </div>

        {offerForEdit.id ? (
          <>
            <div className="col-lg-6">
              <div className="mb-3">
                <div className="">
                  <label className="form-label">Status</label>
                </div>
                <div className="d-flex align-items-center radio_btn_wrap">
                  <label className="me-5">
                    <input
                      type="radio"
                      className=""
                      value="Active"
                      {...register("status")}
                    />
                    Active
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Inactive"
                      {...register("status")}
                    />
                    Inactive
                  </label>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
      <div className={style.next_btn}>
        <button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Spinner animation="border" size="sm" role="status">
                <span className="visually-hidden"> Loading... </span>
              </Spinner>
              Loading...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
};

export default memo(OfferFormEdit);
