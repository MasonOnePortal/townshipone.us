"use client";
import React, { useEffect, useLayoutEffect } from "react";
import style from "@/components/user-profile/profile.module.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DynamicInput from "@/components/forms/DynamicInput";
import { useFormData } from "@/context/FormContext";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import {
  useAddBusinessMutation,
  useUpdateBusinessMutation,
} from "@/store/business/businessService";
import { isArray, isEmpty } from "lodash";
import { ImageDropbox } from "../ImageDropbox";
import { useSelector } from "react-redux";
import { useGetOnePlanQuery } from "@/store/Plan/PlanService";
import toast from "react-hot-toast";
import { BusinessImageDropbox } from "../BusinessImageDropbox";

const mediaInfo = {
  images: [],
};
const validationSchema = Yup.object().shape({});

export const StepFour = ({ formStep }) => {
  const { data: infoData } = useFormData();
  const router = useRouter();
  const [videos, setVideos] = useState([{ value: "" }]);
  const [loading, setLoading] = useState(false);
  const [refetchPlan, setRefetchPlan] = useState(true);
  const [addBusiness, { isSuccess }] = useAddBusinessMutation();
  const [updateBusiness] = useUpdateBusinessMutation();
  const { currentUser } = useSelector((state) => state.auth);
  const searchParams = useSearchParams();
  const businessId = searchParams.get("id");
  const { currentPlan } = useSelector((state) => state.plan);
  const { data, refetch } = useGetOnePlanQuery(currentUser.plan);

  useEffect(() => {
    if (!isEmpty(infoData)) {
      const updateVideos = infoData.videos?.map((item) => {
        return {
          value: item,
        };
      });

      if (!isArray(updateVideos) || updateVideos.length === 0) {
        setVideos([{ value: "" }]);
      } else {
        setVideos(updateVideos);
      }
      if (Array.isArray(infoData.images) && infoData.images.length) {
        mediaInfo.images = [...infoData.images];
      }
    }
  }, [infoData]);
  const updatedData = (dataValue) => {
    setVideos([...dataValue]);
  };
  const updateFiles = (dataFilesValues) => {
    mediaInfo.images = dataFilesValues;
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: mediaInfo,
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = async (data) => {
    const videosModified = videos.map((item) => {
      if (typeof item === "object") {
        return item.value;
      } else {
        return item;
      }
    });
    const updatedData = {
      ...infoData,
      videos:
        isArray(videosModified) && videosModified.length ? videosModified : [],
      images:
        isArray(mediaInfo.images) && mediaInfo.images.length
          ? mediaInfo.images
          : [],
      activePlan: currentUser.plan,
    };
    try {
      setLoading(true);
      if (!updatedData.id) {
        const { data: resData, error: errData } = await addBusiness(
          updatedData
        );
        if (errData) {
          throw new Error(errData.data.message);
        }
        if (resData && resData.ok) {
          refetch();
          router.push("user-businesses");
        }
      } else {
        const {
          updatedAt,
          createdAt,
          url,
          owner,
          offers,
          reviews,
          products,
          totalReviews,
          averageRating,
          averageUserRating,
          ...restData
        } = updatedData;
        const { data: resData, error: errData } = await updateBusiness(
          restData
        );
        if (errData) {
          throw new Error(errData.data.message);
        }
        if (resData && resData.ok) {
          refetch();
          router.push("user-businesses");
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setRefetchPlan(false);
    }
  };
  if (formStep !== 4) {
    return null;
  }
  return (
    <>
      <div className={style.wrpa_add_form_data}>
        <h2 className={style.item_heading_cl}>Image and Video</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-lg-6 col-12">
              <div className="mb-3">
                <label className="form-label custom_label">Upload Images</label>
                <BusinessImageDropbox
                  validHeight={1080}
                  validWidth={1920}
                  enableValidation={true}
                  imagesArrayList={infoData.images ? infoData.images : []}
                  updatedImageFiles={updateFiles}
                />
              </div>
            </div>
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
          </div>
          <div className={style.next_btn}>
            <button type="submit">
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
      <Toaster position="bottom-right" />
    </>
  );
};
