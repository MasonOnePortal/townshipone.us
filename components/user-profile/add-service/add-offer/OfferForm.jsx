"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import style from "@/components/user-profile/profile.module.css";
import { Spinner } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { validationOfferSchema } from "./OfferValidation";
import { memo } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { FaPencilAlt } from "react-icons/fa";
import DynamicInput from "@/components/forms/DynamicInput";
import { OfferImageDropbox } from "../add-business/OfferImageDropbox";
import { isEmpty } from "lodash";
import { useGetAllProductByBusinessQuery } from "@/store/products/productService";
import { useUpdateOptions } from "@/hooks/useUpdateOption";
import { useSelector } from "react-redux";
import { WithContext as ReactTags } from "react-tag-input";
import toast from "react-hot-toast";

const OfferForm = ({
  onSubmitOffer,
  offerData,
  businessList,
  offerTypeOptions,
  loading = false,
}) => {
  const [tags, setTags] = useState([]);
  const [offerForEdit] = useState({
    ...offerData,
    business: offerData?.business?.id,
  });
  useEffect(() => {
    if (!isEmpty(offerData) && !isEmpty(offerData.products)) {
      const initialTags = offerData.products.map((item) => {
        return {
          id: item,
          text: item,
        };
      });
      setValue("products", initialTags);
      setTags(initialTags);
    }
  }, [offerData]);
  const { currentUser } = useSelector((state) => state.auth);
  const [businessID, setBusinessID] = useState(offerForEdit.business ?? "");
  const [selectedOptions, setSelectedOptions] = useState();
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const { data: productsList, refetch } =
    useGetAllProductByBusinessQuery(businessID);
  const productsListOptions = useUpdateOptions(productsList);
  const videosMemo = useMemo(() => {
    if (!isEmpty(offerData) && offerData.videos?.length) {
      return offerData.videos.map((video) => ({ value: video }));
    } else {
      return [{ value: "" }];
    }
  }, [offerData]);

  const [videos, setVideos] = useState(videosMemo);

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
    const videosModified = videos.map((item) => item.value);
    const updatedData = {
      ...data,
      videos: videosModified,
      activePlan: currentUser.plan,
      products: [...data.products].map((item) => item.text),
    };
    onSubmitOffer(updatedData);
  };

  const [previewImage, setPreviewImage] = useState(
    offerForEdit.image || "/imgs/blank.svg"
  );
  const fileInputRef = useRef(null);

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
          return toast.error("Image must be 800x800px");
        }
        const reader = new FileReader();

        reader.onloadend = () => {
          setPreviewImage(reader.result);

          setValue("image", reader.result);
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
  const updateFiles = (dataFilesValues) => {
    setValue("images", [...dataFilesValues], {
      shouldValidate: true,
    });
  };

  const businessSelectHandler = useCallback((value) => {
    setValue("business", value, {
      shouldValidate: true,
    });
    setBusinessID((preVal) => (preVal = value));
  }, []);
  const handleDelete = (i) => {
    let updatedTags = tags.filter((tag, index) => index !== i);
    setTags(updatedTags);
    setValue("products", updatedTags);
  };
  const handleAddition = (tag) => {
    let updatedTags = [...tags, tag];
    setTags(updatedTags);
    setValue("products", updatedTags);
  };

  const handleInputBlur = (tag) => {
    if (tag) {
      let updatedTags = [...tags, { text: tag, id: tag }];
      setTags(updatedTags);
      setValue("products", updatedTags);
    }
  };
  const handleInputChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    e.target.value = inputValue;
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="mb-3 text-center">
          <label className="form-label custom_label">Upload Offer Image</label>
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
            Allowed file types: (png, jpg, jpeg). Dimension 800x800px
          </label>
          <div>
            {errors.image && (
              <p className="error-message">{errors.image.message}</p>
            )}
          </div>
        </div>
        <div className="col-lg-6 ">
          <label className="form-label custom_label">
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
            <label className="form-label custom_label">
              Offer Title <span className="required-star">*</span>
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
            <label className="form-label custom_label">
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
                    onChange={(selectedOption) =>
                      businessSelectHandler(selectedOption.value)
                    }
                    options={businessList}
                    isSearchable={true}
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

        <div className="col-lg-6 col-12">
          <div className="mb-3">
            <label className="form-label custom_label">
              Product/Service
              {/* <span className="required-star">*</span> */}
            </label>
            <Controller
              name="products"
              control={control}
              render={({ field }) => (
                <ReactTags
                  {...field}
                  tags={tags}
                  handleDelete={handleDelete}
                  handleAddition={handleAddition}
                  inputFieldPosition="top"
                  autocomplete
                  placeholder="Products / Service"
                  editable
                  handleInputBlur={handleInputBlur}
                />
              )}
            />
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-6">
          <div className="mb-3">
            <label className="form-label custom_label">
              Discount <span className="required-star">*</span>
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
                onInput={handleInputChange}
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
        <div className="col-lg-6 col-md-6 col-6">
          <div className="mb-3">
            <label className="form-label custom_label">
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
            <label className="form-label custom_label">
              Start Date <span className="required-star">*</span>
            </label>
            <div className={`  ${errors.startDate ? style.error : ""} `}>
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
                    onChange={(date) => {
                      field.onChange(date);
                      setSelectedStartDate(date);
                    }}
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
            <label className="form-label custom_label">
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
                      minDate={selectedStartDate || new Date()}
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
            <label className="form-label custom_label">
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
            <label className="form-label custom_label">
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
            <label className="form-label custom_label">
              Upload Images(Dimension 1920x1080)
            </label>
            <OfferImageDropbox
              enableValidation={true}
              validHeight={1080}
              validWidth={1920}
              imagesArrayList={offerForEdit.images ? offerForEdit.images : []}
              updatedImageFiles={updateFiles}
            />
          </div>
        </div>
        {/* Available Date: */}

        <div className="col-lg-6 col-12">
          <div className="mb-3">
            <label className="form-label custom_label">Add Video URLS</label>

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
                  <label className="form-label custom_label">Status</label>
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

export default memo(OfferForm);
