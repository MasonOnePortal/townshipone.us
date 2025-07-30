"use client";
import React, { useLayoutEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import * as Yup from "yup";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import style from "@/components/user-profile/profile.module.css";
import toast, { Toaster } from "react-hot-toast";
import { Spinner } from "react-bootstrap";

import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { convertFileToBase64, isBase64Image } from "@/utils/helperFn";
import {
  useAddNewNewsMutation,
  useGetNewsCategoriesQuery,
  useGetOneNewsQuery,
  useUpdateNewsMutation,
} from "@/store/newss/newsService";
import { useUpdateOptions } from "@/hooks/useUpdateOption";

const serviceInfo = {
  name: "",
  description: "",
  image: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("News name is required"),
  image: Yup.mixed().required("image is required"),
});

const NewsForm = () => {
  const router = useRouter();
  const { data: category } = useGetNewsCategoriesQuery();
  const [addNewNews] = useAddNewNewsMutation();
  const [updateNews] = useUpdateNewsMutation();

  const offerTypeOptions = useUpdateOptions(category);

  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const newsId = searchParams.get("id");

  const { data: existingNewsData } = useGetOneNewsQuery(newsId);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: serviceInfo,
    resolver: yupResolver(validationSchema),
  });

  useLayoutEffect(() => {
    if (existingNewsData) {
      setValue("name", existingNewsData.name);
      setValue("category", existingNewsData.category);
      setValue("image", existingNewsData.image);
      setValue("description", existingNewsData.description);
    }
  }, [existingNewsData, setValue]);

  const onSubmit = async (data) => {
    const imageString = data.image?.[0];
    let imageValueData = "";
    if (imageString instanceof File) {
      imageValueData = await convertFileToBase64(imageString);
    }
    const updatedData = {
      ...data,
      image: isBase64Image(imageValueData) ? imageValueData : data.image,
      id: newsId ? newsId : undefined,
    };

    try {
      setLoading(true);
      if (updatedData.id) {
        const { data: resData } = await updateNews(updatedData);
        if (resData.ok) {
          toast.success("Successfully offer Updated");
          router.push("/user-profile/newss");
        } else {
          toast.error("unable to update offer");
        }
      } else {
        const { data: resData } = await addNewNews(updatedData);
        if (resData.ok) {
          toast.success("Successfully offer add");
          router.push("/user-profile/newss");
        } else {
          toast.error("unable to create offer");
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
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
              <h1> News Form</h1>
            </div>
          </div>

          <div className="row"></div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-lg-4  ">
                <div className="mb-3">
                  <label className="form-label">News Name</label>
                  <div className={`${errors.name ? style.error : ""} `}>
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="News Name"
                      name="name"
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

              <div className="col-lg-4 ">
                <label className="form-label">News Category</label>
                <div className={` ${errors.category ? style.error : ""}`}>
                  <Controller
                    name="category"
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
                <div>
                  {errors.category && (
                    <p className={style.textColor}>{errors.category.message}</p>
                  )}
                </div>
              </div>

              <div className="col-lg-4">
                <div className="mb-3">
                  <label className="form-label"> Image</label>
                  <div className={`  ${errors.avatar ? style.error : ""} `}>
                    <input
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      className="form-control"
                      name="image"
                      {...register("image")}
                    />
                  </div>
                  <div>
                    {errors.image && (
                      <p className="error-message">{errors.image.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-12">
                <div className="mb-3">
                  <label className="form-label">News Description </label>
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

export default NewsForm;
