"use client";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import * as Yup from "yup";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import style from "@/components/user-profile/profile.module.css";
import toast, { Toaster } from "react-hot-toast";
import { Spinner } from "react-bootstrap";
import {
  useAddJobMutation,
  useGetOneJobQuery,
  useUpdateJobMutation,
} from "@/store/job/JobService";
import "react-quill/dist/quill.snow.css";
import { isEmpty } from "lodash";
import { WithContext as ReactTags } from "react-tag-input";
import { convertFileToBase64, isBase64Image } from "@/utils/helperFn";
import { useGetOnePlanQuery } from "@/store/Plan/PlanService";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import Image from "next/image";
import Input from "react-phone-number-input/input";

import { FaPencilAlt } from "react-icons/fa";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const serviceInfo = {
  title: "",
  company: "",
  aboutCompany: " ",
  website: "",
  email: "",
  phone: "",
  address: "",
  city: "Township",
  state: "OH",
  zipCode: "",
  jobType: "",
  qualifications: "",
  department: "",
  description: "",
  skills: [],
  thumbnail: "",
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  company: Yup.string(),

  website: Yup.string(),
  phone: Yup.string().test({
    name: "phone",
    test: function (value) {
      if (!!value) {
        return Yup.string().isValidSync(value);
      }
      return true;
    },
  }),
  jobType: Yup.string(),
  email: Yup.string().email("Invalid email address"),
  // .required("Email is required"),

  city: Yup.string(),
  state: Yup.string(),
  zipCode: Yup.string(),
  qualifications: Yup.string(),
  department: Yup.string(),
});

const JobForm = () => {
  const [tags, setTags] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [addNewJob] = useAddJobMutation();
  const [updateJob] = useUpdateJobMutation();
  const searchParams = useSearchParams();
  const { currentUser } = useSelector((state) => state.auth);

  const { data, refetch, isSuccess } = useGetOnePlanQuery(currentUser.plan);

  const jobId = searchParams.get("id") ? searchParams.get("id") : "";
  const { data: jobValues } = useGetOneJobQuery(jobId, {
    skip: jobId ? false : true,
  });
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...serviceInfo,
      jobType: jobValues?.jobType || "",
      // city: "Mason",
    },

    resolver: yupResolver(validationSchema),
  });

  const { createdAt, updatedAt, ...restJob } = { ...jobValues };
  const memoisedVal = useMemo(() => restJob, [jobValues]);

  useLayoutEffect(() => {
    if (!isEmpty(memoisedVal)) {
      if (memoisedVal?.thumbnail) {
        setPreviewImage(memoisedVal.thumbnail);
      } else {
        setPreviewImage("/imgs/blank.svg");
      }

      if (memoisedVal?.skills?.length) {
        const initialTags = memoisedVal.skills.map((item, index) => {
          return {
            id: index,
            text: item,
          };
        });
        setTags(initialTags);
      }
    }
    reset(memoisedVal);
  }, [memoisedVal]);

  const jobTypeOptions = [
    { value: "full-time", label: "Full Time" },
    { value: "part-time", label: "Part Time" },
    { value: "contract", label: "Contract" },
    { value: "temporary", label: "Temporary" },
    { value: "freelance ", label: "Freelance " },
    { value: "remote", label: "Remote" },
    { value: "internship ", label: "Internship " },
    { value: "seasonal  ", label: "Seasonal  " },
    { value: "non-Profit  ", label: "Non-Profit  " },
  ];

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (Array.isArray(tags) && tags.length) {
        data.skills = tags.map((tag) => tag.text);
      }
      const thumbnailFile = data.thumbnail?.[0];

      let thumbnailString = "";
      if (thumbnailFile instanceof File) {
        thumbnailString = await convertFileToBase64(thumbnailFile);
      }
      const updatedjobData = {
        ...data,
        thumbnail: isBase64Image(thumbnailString)
          ? thumbnailString
          : data.thumbnail,
        activePlan: currentUser.plan,
      };

      if (updatedjobData.id) {
        const { postedBy, createdAt, updatedAt, ...restData } = updatedjobData;
        const { data: resData, error: errData } = await updateJob(restData);
        if (errData) {
          throw new Error(errData.data.message);
        }
        if (!isEmpty(resData) && resData.ok) {
          refetch();
          router.push("user-jobs");
        }
      } else {
        const { data: resData, error: errData } = await addNewJob(
          updatedjobData
        );
        if (errData) {
          throw new Error(errData.data.message);
        }
        if (!isEmpty(resData) && resData.ok) {
          refetch();
          toast.success("Successfully add job");
          reset({});
          router.push("user-jobs");
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const [previewImage, setPreviewImage] = useState(
    jobValues?.thumbnail || "/imgs/blank.svg"
  );
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const image = new window.Image();
      const imageUrl = URL.createObjectURL(file);
      image.src = imageUrl;
      image.onload = async () => {
        const { width, height } = image;
        if (width !== 800 || height !== 800) {
          URL.revokeObjectURL(imageUrl);
          return toast.error("Image must be 800x800px");
        }
        const reader = new FileReader();

        reader.onloadend = () => {
          setPreviewImage(reader.result);

          setValue("thumbnail", reader.result);
        };

        reader.readAsDataURL(file);
      };
      image.onerror = () => {
        toast.error("Failed to load image");
      };
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  useEffect(() => {
    if (jobValues) {
      setValue("title", jobValues.title);
      setValue("company", jobValues.company);
      const initialTags = jobValues.skills.map((item) => {
        return {
          id: item,
          text: item,
        };
      });
      setTags(initialTags);
    }
  }, [jobValues, setValue]);

  const handleDelete = (i) => {
    let updatedTags = tags.filter((tag, index) => index !== i);
    setTags(updatedTags);
  };
  const handleAddition = (tag) => {
    let updatedTags = [...tags, tag];
    setTags(updatedTags);
  };
  const handleInputChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    e.target.value = inputValue;
  };
  const handleInputBlur = (tag) => {
    if (tag) {
      setTags([...tags, { text: tag, id: tag }]);
    }
  };
  return (
    <>
      <div className="container">
        <div className={style.wrpa_add_form_data}>
          <div className={style.profile_heading}>
            <div
              className={`d-flex align-items-center justify-content-between ${style.heading_wr_c} `}
            >
              <h1> Job Form</h1>
            </div>
          </div>

          <div className="row"></div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-lg-12">
                <div className="mb-3 text-center">
                  <label className="form-label custom_label">
                    {" "}
                    Company Logo
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
                        onClick={handleImageClick}
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
                  <div style={{ marginTop: "11px" }}>
                    {errors.thumbnail && (
                      <p className={style.textColor}>
                        {errors.thumbnail.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-6  ">
                <div className="mb-3">
                  <label className="form-label custom_label">
                    Job Title <span className="required-star">*</span>
                  </label>
                  <div className={`${errors.title ? style.error : ""} `}>
                    <input
                      type="text"
                      placeholder="Job Title"
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
              <div className="col-lg-6  ">
                <div className="mb-3">
                  <label className="form-label custom_label">
                    Company Name
                    {/* <span className="required-star">*</span> */}
                  </label>
                  <div className={`${errors.company ? style.error : ""} `}>
                    <input
                      type="text"
                      placeholder="Company Name"
                      name="company"
                      className="form-control"
                      {...register("company")}
                    />
                  </div>
                </div>
                <div>
                  {errors.company && (
                    <p className={style.textColor}>{errors.company.message}</p>
                  )}
                </div>
              </div>
              <div className="col-lg-6  ">
                <div className="mb-3">
                  <label className="form-label custom_label">
                    Email
                    {/* <span className="required-star">*</span> */}
                  </label>
                  <div className={`${errors.email ? style.error : ""} `}>
                    <input
                      type="text"
                      placeholder="Email"
                      name="email"
                      className="form-control"
                      {...register("email")}
                    />
                  </div>
                </div>
                <div>
                  {errors.email && (
                    <p className={style.textColor}>{errors.email.message}</p>
                  )}
                </div>
              </div>
              <div className="col-lg-6  ">
                <div className="mb-3">
                  <label className="form-label custom_label">Phone </label>
                  <div className={`${errors.phone ? style.error : ""} `}>
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
                <div>
                  {errors.phone && (
                    <p className={style.textColor}>{errors.phone.message}</p>
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

              <div className="col-lg-6 ">
                <label className="form-label custom_label">
                  Job Type
                  {/* <span className="required-star">*</span> */}
                </label>
                <div className={`  ${errors.jobType ? style.error : ""}`}>
                  <Controller
                    name="jobType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={jobTypeOptions.find(
                          (option) => option.value === field.value
                        )}
                        onChange={(selectedOption) => {
                          field.onChange(
                            selectedOption ? selectedOption.value : null
                          );
                        }}
                        options={jobTypeOptions}
                      />
                    )}
                  />
                </div>
                <div style={{ marginTop: "11px" }}>
                  {errors.jobType && (
                    <p className={style.textColor}>{errors.jobType.message}</p>
                  )}
                </div>
              </div>

              <div className="col-lg-6  ">
                <div className="mb-3">
                  <label className="form-label custom_label">
                    Department
                    {/* <span className="required-star">*</span> */}
                  </label>
                  <div className={`${errors.department ? style.error : ""} `}>
                    <input
                      type="text"
                      placeholder="Department"
                      name="department"
                      className="form-control"
                      {...register("department")}
                    />
                  </div>
                </div>
                <div>
                  {errors.department && (
                    <p className={style.textColor}>
                      {errors.department.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-lg-6  ">
                <div className="mb-3">
                  <label className="form-label custom_label">
                    Required Qualifications{" "}
                    {/* <span className="required-star">*</span> */}
                  </label>
                  <div
                    className={`${errors.qualifications ? style.error : ""} `}
                  >
                    <input
                      type="text"
                      placeholder=" Qualifications"
                      name="qualifications"
                      className="form-control"
                      {...register("qualifications")}
                    />
                  </div>
                </div>
                <div>
                  {errors.qualifications && (
                    <p className={style.textColor}>
                      {errors.qualifications.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label custom_label">
                    Skills Required
                  </label>

                  <Controller
                    name="skills"
                    control={control}
                    render={({ field }) => (
                      <ReactTags
                        tags={tags}
                        handleDelete={handleDelete}
                        handleAddition={handleAddition}
                        inputFieldPosition="top"
                        autocomplete
                        placeholder="Skills Required"
                        editable
                        handleInputBlur={handleInputBlur}
                        {...field}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label custom_label">
                    Job Description & Responsibilities{" "}
                  </label>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <ReactQuill
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                        theme="snow"
                        modules={{
                          toolbar: [
                            ["bold", "italic", "underline", "strike"],
                            ["link"],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["clean"],
                          ],
                        }}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label custom_label">
                    About Company
                  </label>
                  <Controller
                    name="aboutCompany"
                    control={control}
                    render={({ field }) => (
                      <ReactQuill
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                        theme="snow"
                        modules={{
                          toolbar: [
                            ["bold", "italic", "underline", "strike"],
                            ["link"],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["clean"],
                          ],
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="col-lg-6  ">
                <div className="mb-3">
                  <label className="form-label custom_label">Address</label>
                  <div>
                    <input
                      type="text"
                      placeholder="Address "
                      name="address"
                      className="form-control"
                      {...register("address")}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6  ">
                <div className="mb-3">
                  <label className="form-label custom_label">
                    City
                    {/* <span className="required-star">*</span> */}
                  </label>
                  <div className={`${errors.city ? style.error : ""} `}>
                    <input
                      type="text"
                      placeholder="City"
                      name="city"
                      className="form-control"
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
              <div className="col-lg-6  ">
                <div className="mb-3">
                  <label className="form-label custom_label">
                    State
                    {/* <span className="required-star">*</span> */}
                  </label>
                  <div className={`${errors.state ? style.error : ""} `}>
                    <input
                      type="text"
                      placeholder="State "
                      name="state"
                      className="form-control"
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

              <div className="col-lg-6">
                <div className="mb-3">
                  <label className="form-label custom_label">
                    ZipCode
                    {/* <span className="required-star">*</span> */}
                  </label>
                  <div className={`  ${errors.zipCode ? style.error : ""} `}>
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="Zip Code"
                      className="form-control"
                      maxLength="5"
                      name="zipCode"
                      {...register("zipCode")}
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
              {jobId ? (
                <>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <div className="">
                        <label className="form-label custom_label">
                          Status
                        </label>
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
            <button type="submit">
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" qualifications="status">
                    <span className="visually-hidden"> Loading... </span>
                  </Spinner>
                  Loading...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
};

export default JobForm;
