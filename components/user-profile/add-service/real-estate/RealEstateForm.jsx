"use client";
import React, { useRef, useState } from "react";
import style from "@/components/user-profile/profile.module.css";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  validationSchema,
  propertyOptions,
  exteriorOptions,
  realEstateInfo,
} from "./realEstateValidation";
import toast from "react-hot-toast";
import { convertFileToBase64, isBase64Image } from "@/utils/helperFn";
import { useRouter } from "next/navigation";
import { useAddRealEstateMutation } from "@/store/real-estate/realEstateService";
import { ImageDropbox } from "../add-business/ImageDropbox";

import { isEmpty } from "lodash";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useGetOnePlanQuery } from "@/store/Plan/PlanService";
import { FaPencilAlt } from "react-icons/fa";
import Image from "next/image";
import DynamicInput from "@/components/forms/DynamicInput";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Input from "react-phone-number-input/input";

export const RealEstateForm = () => {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([{ value: "" }]);
  const { currentUser } = useSelector((state) => state.auth);

  const [addRealEstate] = useAddRealEstateMutation();
  const [refetchPlan, setRefetchPlan] = useState(true);

  const { data, refetch, isSuccess } = useGetOnePlanQuery(currentUser.plan);

  const fileInputRef = useRef(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    control,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: { ...realEstateInfo, city: "Township" },
    resolver: yupResolver(validationSchema),
  });

  const updatedData = (dataValue) => {
    setVideos([...dataValue]);
  };
  const onSubmit = async (data) => {
    const videosModified = videos.map((item) => item.value);
    try {
      setLoading(true);
      const thumbnailFile = data.thumbnail?.[0];

      let thumbnailString = "";
      if (thumbnailFile instanceof File) {
        thumbnailString = await convertFileToBase64(thumbnailFile);
      }

      const updatedData = {
        ...data,
        videos: videosModified,
        thumbnail: isBase64Image(thumbnailString)
          ? thumbnailString
          : data.thumbnail,
        activePlan: currentUser.plan,
      };

      const { data: resData, error: errAdd } = await addRealEstate(updatedData);

      if (errAdd) {
        throw new Error(errAdd.data.message);
      }

      if (!isEmpty(resData) && resData.ok) {
        setRefetchPlan(false);
        refetch();
        router.push("user-real-estates");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const [previewImage, setPreviewImage] = useState(
    realEstateInfo.thumbnail || "/imgs/blank.svg"
  );
  const updateFiles = (dataFilesValues) => {
    setValue("images", [...dataFilesValues], {
      shouldValidate: true,
    });
  };
  const handleInputChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    e.target.value = inputValue;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const img = new window.Image();
      const imageUrl = URL.createObjectURL(file);
      img.src = imageUrl;
      img.onload = async () => {
        const { width, height } = img;
        if (width !== 800 || height !== 800) {
          URL.revokeObjectURL(imageUrl);
          return toast.error("Thumbnail should be 800x800px");
        }
        const reader = new FileReader();

        reader.onloadend = () => {
          setPreviewImage(reader.result);

          setValue("thumbnail", reader.result);
        };

        reader.readAsDataURL(file);
      };
      img.onerror = () => {
        toast.error("Failed to load image");
      };
    }
  };
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  return (
    <>
      <div className={style.profile_heading}>
        <div
          className={`d-flex align-items-center justify-content-between ${style.heading_wr_c} `}
        >
          <h1>Add Real Estate </h1>
        </div>
      </div>

      <div className={style.wrpa_add_form_data}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-lg-12">
              <div className="mb-3 text-center">
                <label className="form-label custom_label"> Thumbnail</label>
                <div
                  className={`  ${
                    errors.avatar ? style.error : ""
                  }image-container `}
                >
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    name="thumbnail"
                    {...register("thumbnail")}
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    ref={fileInputRef}
                  />
                  <div className="image-wrapper" onClick={handleImageClick}>
                    <Image
                      alt="Preview"
                      className="image image-styl"
                      style={{ cursor: "pointer" }}
                      src={previewImage || "/imgs/blank.svg"}
                      height={200}
                      width={200}
                    />
                    <div className="overlay">
                      <FaPencilAlt className="pencil-icon" />
                    </div>
                  </div>
                </div>
                <label className="form-label form-label-style ">
                  Allowed file types: (png, jpg, jpeg). Dimension 800x800px
                </label>
                <div>
                  {errors.thumbnail && (
                    <p className="error-message">{errors.thumbnail.message}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label className="form-label custom_label">
                  Title <span className="required-star">*</span>
                </label>
                <div className={`${errors.name ? style.error : ""} `}>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder=" Title"
                    className="form-control"
                    {...register("name")}
                  />
                </div>
              </div>
              <div>
                {errors.name && (
                  <p className={style.textColor}>{errors.name.message}</p>
                )}
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-3">
                <label className="form-label custom_label">
                  Contact Person
                  {/* <span className="required-star">*</span> */}
                </label>
                <div className={`${errors.ownerName ? style.error : ""} `}>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder=" Contact Person"
                    className="form-control"
                    {...register("ownerName")}
                  />
                </div>
              </div>
              <div>
                {errors.ownerName && (
                  <p className={style.textColor}>{errors.ownerName.message}</p>
                )}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="mb-3">
                <label className="form-label custom_label">
                  Email
                  {/* <span className="required-star">*</span> */}
                </label>
                <div className={`  ${errors?.email ? style.error : ""} `}>
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    name="email"
                    {...register("email")}
                  />
                </div>
              </div>
              <div>
                {errors?.email && (
                  <p className={style.textColor}>{errors?.email.message}</p>
                )}
              </div>
            </div>
            <div className="col-lg-6  ">
              <div className="mb-3">
                <label className="form-label custom_label">Website</label>
                <div className={`${errors.website ? style.error : ""} `}>
                  <input
                    type="text"
                    placeholder="Website"
                    name="website"
                    className="form-control"
                    {...register("website")}
                  />
                </div>
                <small className="text-muted">https://www.example.com</small>
              </div>
              <div>
                {errors.website && (
                  <p className={style.textColor}>{errors.website.message}</p>
                )}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label custom_label">Contact No</label>
                <div>
                  <Input
                    country="US"
                    name="phone"
                    autoComplete="off"
                    maxLength="14"
                    className={`form-control`}
                    placeholder="Contact No"
                    {...register("phone")}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label className="form-label custom_label">Beds</label>
                <div className={`${errors.bedroom ? style.error : ""} `}>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="Beds"
                    maxLength="6"
                    className="form-control"
                    {...register("bedroom")}
                    onInput={handleInputChange}
                  />
                </div>
              </div>
              <div>
                {errors.bedroom && (
                  <p className={style.textColor}>{errors.bedroom.message}</p>
                )}
              </div>
            </div>
            {/* beds */}
            <div className="col-md-3">
              <div className="mb-3">
                <label className="form-label custom_label">Baths</label>
                <div className={`${errors.bathroom ? style.error : ""} `}>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="baths"
                    maxLength="4"
                    className="form-control"
                    {...register("bathroom")}
                    onInput={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label className="form-label custom_label">
                  Property Type
                  {/* <span className="required-star">*</span> */}
                </label>
                <div className={` ${errors.propertyType ? "error" : ""}`}>
                  <Controller
                    name="propertyType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={propertyOptions.find(
                          (option) => option.value === field.value
                        )}
                        onChange={(selectedOption) => {
                          field.onChange(
                            selectedOption ? selectedOption.value : null
                          );
                        }}
                        options={propertyOptions}
                      />
                    )}
                  />
                </div>
              </div>
              <div>
                {errors.propertyType && (
                  <p className={style.textColor}>
                    {errors.propertyType.message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label className="form-label custom_label">
                  Property Available
                </label>
                <div className={` ${errors.propertyAvailable ? "error" : ""}`}>
                  <Controller
                    name="propertyAvailable"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={exteriorOptions.find(
                          (option) => option.value === field.value
                        )}
                        onChange={(selectedOption) => {
                          field.onChange(
                            selectedOption ? selectedOption.value : null
                          );
                        }}
                        options={exteriorOptions}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="mb-3">
                <label className="form-label custom_label">
                  Area (sq ft/Acres/Others){" "}
                </label>
                <div className={`${errors.area ? style.error : ""} `}>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="Area (sq ft/Acres/Others)"
                    className="form-control"
                    maxLength="6"
                    {...register("area")}
                  />
                </div>
              </div>
              <div>
                {errors.area && (
                  <p className={style.textColor}>{errors.area.message}</p>
                )}
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label className="form-label custom_label">
                  Build Year
                  {/* <span className="required-star">*</span> */}
                </label>
                <div className={`${errors.year ? style.error : ""} `}>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="Year"
                    maxLength="4"
                    className="form-control"
                    {...register("year")}
                  />
                </div>
              </div>
              <div>
                {errors.year && (
                  <p className={style.textColor}>{errors.year.message}</p>
                )}
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <label className="form-label custom_label">
                  Price
                  {/* <span className="required-star">*</span> */}
                </label>
                <div className={`${errors.price ? style.error : ""} `}>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="Price"
                    className="form-control"
                    name="price"
                    {...register("price")}
                  />
                </div>
              </div>
              <div>
                {errors.price && (
                  <p className={style.textColor}>{errors.price.message}</p>
                )}
              </div>
            </div>
            <div className="col-lg-3 col-12">
              <div className="mb-3">
                <label className="form-label custom_label">
                  Available Date
                  {/* <span className="required-star">*</span> */}
                </label>
                <div
                  className={`  ${errors.availableDate ? style.error : ""} `}
                >
                  <Controller
                    name="availableDate"
                    control={control}
                    render={({ field }) => (
                      <ReactDatePicker
                        className="form-control"
                        minDate={new Date()}
                        {...field}
                        placeholderText="Available Date"
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
                {errors.availableDate && (
                  <p className={style.textColor}>
                    {errors.availableDate.message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <div className="">
                  <label className="form-label custom_label">WiFi</label>
                </div>
                <div className="d-flex align-items-center radio_btn_wrap">
                  <label className="me-5">
                    <input
                      type="radio"
                      className=""
                      value="yes"
                      {...register("wifi")}
                    />
                    Yes
                  </label>
                  <label>
                    <input type="radio" value="no" {...register("wifi")} />
                    No
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <div className="">
                  <label className="form-label custom_label">Fireplace</label>
                </div>
                <div className="d-flex align-items-center radio_btn_wrap">
                  <label className="me-5">
                    <input
                      type="radio"
                      className=""
                      value="yes"
                      {...register("fireplace")}
                    />
                    Yes
                  </label>
                  <label>
                    <input type="radio" value="no" {...register("fireplace")} />
                    No
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <div className="">
                  <label className="form-label custom_label">Elevator</label>
                </div>
                <div className="d-flex align-items-center radio_btn_wrap">
                  <label className="me-5">
                    <input
                      type="radio"
                      className=""
                      value="yes"
                      {...register("elevator")}
                    />
                    Yes
                  </label>
                  <label>
                    <input type="radio" value="no" {...register("elevator")} />
                    No
                  </label>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="mb-3">
                <div className="">
                  <label className="form-label custom_label">
                    Swimming Pool
                  </label>
                </div>
                <div className="d-flex align-items-center radio_btn_wrap">
                  <label className="me-5">
                    <input
                      type="radio"
                      className=""
                      value="yes"
                      {...register("swimmingPool")}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="no"
                      {...register("swimmingPool")}
                    />
                    No
                  </label>
                </div>
              </div>
            </div>
            {/* Interior Details */}
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label custom_label">
                  Interior Details
                </label>
                <div className={`  ${errors.interior ? style.error : ""} `}>
                  <textarea
                    className="form-control"
                    placeholder="Rooms, Kitchen, HVAC, Garag , Others "
                    rows="5"
                    name="interior"
                    {...register("interior")}
                  ></textarea>
                </div>
              </div>
              {errors.interior && (
                <p className={style.textColor}>{errors.interior.message}</p>
              )}
            </div>
            {/* Exterior Details */}
            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label custom_label">
                  Exterior Details
                </label>
                <div className={`  ${errors.exterior ? style.error : ""} `}>
                  <textarea
                    className="form-control"
                    placeholder="Exterior Details "
                    rows="5"
                    name="exterior"
                    {...register("exterior")}
                  ></textarea>
                </div>
              </div>
              {errors.exterior && (
                <p className={style.textColor}>{errors.exterior.message}</p>
              )}
            </div>

            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label custom_label">
                  Property Descriptions
                </label>
                <div className={`  ${errors.description ? style.error : ""} `}>
                  <textarea
                    className="form-control"
                    placeholder="Description"
                    rows="5"
                    name="description"
                    {...register("description")}
                  ></textarea>
                </div>
              </div>
              {errors.description && (
                <p className={style.textColor}>{errors.description.message}</p>
              )}
            </div>
            {/* price */}

            <div className="col-lg-6">
              <div className="mb-3">
                <label className="form-label custom_label">
                  Upload Images ( 1920x1080 px )
                </label>
                <ImageDropbox
                  validHeight={1080}
                  validWidth={1920}
                  enableValidation={true}
                  imagesArrayList={[]}
                  updatedImageFiles={updateFiles}
                />
              </div>
            </div>
            {/* Available Date: */}

            <div className="col-lg-6 col-12">
              <div className="mb-3">
                <label className="form-label custom_label">
                  Add Video URLS
                </label>
                <DynamicInput
                  arrData={videos}
                  updateData={updatedData}
                  hasError={!!errors.videos}
                />
                {errors.videos && (
                  <p className={style.textColor}>{errors.videos.message}</p>
                )}
              </div>
            </div>
            <div className="col-lg-6 ">
              <div className="mb-3">
                <label className="form-label custom_label">Address</label>
                <div>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="Address"
                    name="address"
                    className="form-control"
                    {...register("address")}
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-4">
              <div className="mb-3">
                <label className="form-label custom_label">City</label>
                <div className={`  ${errors.city ? style.error : ""} `}>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="City"
                    className="form-control"
                    name="city"
                    {...register("city")}
                  />
                </div>
              </div>
              <div>
                {errors.city && (
                  <p className={style.textColor}>{errors.city.message}</p>
                )}
              </div>
            </div>
            <div className="col-6 col-lg-4 col-md-4">
              <div className="mb-3">
                <label className="form-label custom_label">State</label>
                <div className={`  ${errors.state ? style.error : ""} `}>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="State"
                    className="form-control"
                    name="state"
                    {...register("state")}
                  />
                </div>
              </div>
              <div>
                {errors.state && (
                  <p className={style.textColor}>{errors.state.message}</p>
                )}
              </div>
            </div>

            <div className="col-6 col-lg-4 col-md-4">
              <div className="mb-3">
                <label className="form-label custom_label">
                  Zipcode
                  {/* <span className="required-star">*</span> */}
                </label>
                <div className={`  ${errors.zipCode ? style.error : ""} `}>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="ZipCode"
                    className="form-control"
                    name="zipCode"
                    {...register("zipCode")}
                    maxLength="5"
                    onInput={handleInputChange}
                  />
                </div>
              </div>
              <div>
                {errors.zipCode && (
                  <p className={style.textColor}>{errors.zipCode.message}</p>
                )}
              </div>
            </div>
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
      </div>
    </>
  );
};
