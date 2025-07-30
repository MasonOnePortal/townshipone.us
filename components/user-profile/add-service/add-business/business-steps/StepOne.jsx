"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import style from "@/components/user-profile/profile.module.css";
import Select from "react-select";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormData } from "@/context/FormContext";
import {
  convertDates,
  convertFileToBase64,
  isBase64Image,
} from "@/utils/helperFn";
import { FaArrowRight } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import {
  useBusinessesCategoriesQuery,
  useGetBusinessQuery,
} from "@/store/business/businessService";
import { useUpdateOptions } from "@/hooks/useUpdateOption";
import { Loading } from "@/components/Loading";
import { FaPencilAlt } from "react-icons/fa";
import Image from "next/image";
import toast from "react-hot-toast";

const serviceInfo = {
  city: "Township",
  state: "OH",
  category: "",
  avatar: "",
  address: "",
  zipCode: "",
  description: "",
  thumbnail: "",
  name: "",
};
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Business name is required"),
  category: Yup.string().required("Please select a category"),
  avatar: Yup.mixed(),
  address: Yup.string().required("Address is required"),
  state: Yup.string(),
  city: Yup.string(),
  zipCode: Yup.string()
    .required("Zip Code is required")
    .matches(/^[0-9]+$/, "Zip Code must contain only digits")
    .length(5, "Zip Code must be exactly 5 digits"),
  description: Yup.string(),
});
export const StepOne = ({ formStep, nextFormStep }) => {
  const { data: fsdhf, setFormValues } = useFormData();
  const fileInputRef = useRef(null);
  const fileInputRefLogo = useRef(null);
  const [loading, setLoading] = useState(false);
  const { data: businesses } = useBusinessesCategoriesQuery();
  const businessType = useUpdateOptions(businesses);
  const searchParams = useSearchParams();
  const businessId = searchParams.get("id") ? searchParams.get("id") : "";
  const { data: businessData, isLoading } = useGetBusinessQuery(businessId, {
    skip: businessId ? false : true,
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: { ...serviceInfo },
    resolver: yupResolver(validationSchema),
  });
  const [previewImage, setPreviewImage] = useState(
    businessData?.thumbnail || "/imgs/blank.svg"
  );
  const [previewImageLogo, setPreviewImageLogo] = useState(
    businessData?.avatar || "/imgs/blank.svg"
  );
  useEffect(() => {
    if (businessData) {
      const { timetable, ...rest } = businessData;
      const updatedTimeTable = convertDates(timetable);
      reset({ ...rest, timetable: updatedTimeTable });
      setPreviewImageLogo(rest.avatar || "/imgs/blank.svg");
      setPreviewImage(rest.thumbnail || "/imgs/blank.svg");
    }
  }, [businessData, reset]);

  const onSubmit = async (data) => {
    const avatarFile = data.avatar?.[0];
    const thumbnailFile = data.thumbnail?.[0];
    let avatarString = "";
    if (avatarFile instanceof File) {
      avatarString = await convertFileToBase64(avatarFile);
    }
    let thumbnailString = "";
    if (thumbnailFile instanceof File) {
      thumbnailString = await convertFileToBase64(thumbnailFile);
    }
    const updatedData = {
      ...data,
      avatar: isBase64Image(avatarString) ? avatarString : data.avatar,
      thumbnail: isBase64Image(thumbnailString)
        ? thumbnailString
        : data.thumbnail,
    };
    setFormValues(updatedData);
    nextFormStep();
  };

  if (formStep !== 1) {
    return null;
  }
  if (isLoading) return <Loading />;

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
          return toast.error("Thumbnail image must be 800x800px");
        }
        const reader = new FileReader();

        reader.onloadend = () => {
          setPreviewImage(reader.result);

          setValue("thumbnail", reader.result);
        };

        reader.readAsDataURL(file);
      };
      img.onerror = () => {
        URL.revokeObjectURL(imageUrl);
      };
    }
  };
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  const handleImageChangeLogo = (e) => {
    const file = e.target.files[0];

    if (file) {
      const img = new window.Image();
      const imageUrl = URL.createObjectURL(file);
      img.src = imageUrl;

      img.onload = async () => {
        const { width, height } = img;
        if (width !== 800 || height !== 800) {
          URL.revokeObjectURL(imageUrl);
          return toast.error("Avatar must be 800x800px");
        }
        const reader = new FileReader();

        reader.onloadend = () => {
          setPreviewImageLogo(reader.result);

          setValue("avatar", reader.result);
        };

        reader.readAsDataURL(file);
      };
      img.onerror = () => {
        URL.revokeObjectURL(imageUrl);
      };
    }
  };
  const handleImageClickLogo = () => {
    fileInputRefLogo.current.click();
  };
  const handleInputChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    e.target.value = inputValue;
  };

  return (
    <>
      <div className={style.wrpa_add_form_data}>
        <h2 className={style.item_heading_cl}>Service Information</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-6">
              <div className="mb-3 text-center">
                <label className="form-label custom_label">
                  {" "}
                  Business Logo
                </label>
                <div
                  className={`  ${
                    errors.avatar ? style.error : ""
                  } image-container `}
                >
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    name="avatar"
                    {...register("avatar")}
                    onChange={handleImageChangeLogo}
                    style={{ display: "none" }}
                    ref={fileInputRefLogo}
                  />
                  <div className="image-wrapper" onClick={handleImageClickLogo}>
                    <Image
                      src={previewImageLogo}
                      className="image image-styl"
                      width={100}
                      height={100}
                      alt="Previews"
                      style={{ cursor: "pointer" }}
                    />
                    <div className="overlay">
                      <FaPencilAlt className="pencil-icon" />
                    </div>
                  </div>
                </div>
                <label className="form-label form-label-style ">
                  Allowed file types: (png, jpg, jpeg).Dimension 800x800px
                </label>
                <div>
                  {errors.avatar && (
                    <p className="error-message">{errors.avatar.message}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3 text-center">
                <label className="form-label custom_label">
                  {" "}
                  Business Thumbnail
                </label>
                <div
                  className={`  ${
                    errors.avatar ? style.error : ""
                  }  image-container`}
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
                <label className="form-label custom_label form-label-style ">
                  Allowed file types: (png, jpg, jpeg).Dimension 800x800px
                </label>
                <div>
                  {errors.thumbnail && (
                    <p className="error-message">{errors.thumbnail.message}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label custom_label">
                Select Category <span className="required-star">*</span>
              </label>
              <div className={`  ${errors.category ? style.error : ""} `}>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={businessType.find(
                        (option) => option.value === field.value
                      )}
                      onChange={(selectedOption) => {
                        field.onChange(
                          selectedOption ? selectedOption.value : null
                        );
                      }}
                      options={businessType}
                    />
                  )}
                />
              </div>

              <div>
                {errors.category && (
                  <p className="textColor">{errors.category.message}</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label custom_label">
                  Business Name<span className="required-star">*</span>
                </label>
                <div className={`${errors.name ? style.error : ""} `}>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="Business Name"
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

            <div className="col-12">
              <div className="mb-3">
                <label className="form-label custom_label">
                  Description
                  {/* <span className="required-star">*</span> */}
                </label>
                <div className={`  ${errors.description ? style.error : ""} `}>
                  <textarea
                    className="form-control"
                    placeholder="Description"
                    rows="4"
                    name="description"
                    {...register("description")}
                  ></textarea>
                </div>
              </div>
              {errors.description && (
                <p className={style.textColor}>{errors.description.message}</p>
              )}
            </div>
            <div className="col-6">
              <div className="mb-3">
                <label className="form-label custom_label">
                  Address<span className="required-star">*</span>
                </label>
                <div className={`  ${errors.address ? style.error : ""} `}>
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
              <div>
                {errors.address && (
                  <p className={style.textColor}>{errors.address.message}</p>
                )}
              </div>
            </div>

            <div className="col-6">
              <div className="mb-3">
                <label className="form-label custom_label">
                  City
                  {/* <span className="required-star">*</span> */}
                </label>
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
            <div className="col-6">
              <div className="mb-3">
                <label className="form-label custom_label">
                  State
                  {/* <span className="required-star">*</span> */}
                </label>
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

            <div className="col-6">
              <div className="mb-3">
                <label className="form-label custom_label">
                  Zipcode<span className="required-star">*</span>
                </label>
                <div className={`  ${errors.zipCode ? style.error : ""} `}>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="Zip Code"
                    className="form-control"
                    maxLength="5"
                    onInput={handleInputChange}
                    name="zipCode"
                    {...register("zipCode")}
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
            <button type="submit">
              Next <FaArrowRight />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
