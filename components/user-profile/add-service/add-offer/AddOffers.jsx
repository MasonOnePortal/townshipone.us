"use client";
import React, { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import style from "@/components/user-profile/profile.module.css";
import toast, { Toaster } from "react-hot-toast";

import { convertFileToBase64, isBase64Image } from "@/utils/helperFn";
import { parseISO } from "date-fns";
import {
  useAddNewOfferMutation,
  useGetOfferTypesQuery,
  useGetOneOfferQuery,
  useUpdateOfferMutation,
} from "@/store/offers/offerService";
import { isEmpty } from "lodash";
import { useGetUsersBusinessQuery } from "@/store/business/businessService";
import { useUpdateOptions } from "@/hooks/useUpdateOption";
import { offerInfo } from "./OfferValidation";
import OfferForm from "./OfferForm";
import { Loading } from "@/components/Loading";
import { useGetOnePlanQuery } from "@/store/Plan/PlanService";
import { useSelector } from "react-redux";
const AddOffers = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { data, refetch, isSuccess } = useGetOnePlanQuery(currentUser.plan);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: offerTypes } = useGetOfferTypesQuery();
  const searchParams = useSearchParams();
  const [updateOffer] = useUpdateOfferMutation();
  const { data: userBusiness } = useGetUsersBusinessQuery();

  const offerId = searchParams.get("id");
  const { data: offerValues, isLoading } = useGetOneOfferQuery(offerId, {
    skip: offerId ? false : true,
  });
  const [addNewOffer] = useAddNewOfferMutation();
  const offerTypeOptions = useUpdateOptions(offerTypes);
  const businessList = useUpdateOptions(userBusiness, "business_offer");

  const { startDate, endDate, ...restOffer } = { ...offerValues };
  const memoisedOffer = useMemo(() => {
    if (!isEmpty(offerValues)) {
      return {
        ...restOffer,
        endDate: parseISO(endDate),
        startDate: parseISO(startDate),
      };
    }
  }, [offerValues, endDate, restOffer, startDate]);

  const onSubmitForm = async (data) => {
    const imageString = data.image?.[0];
    let imageValueData = "";
    if (imageString instanceof File) {
      imageValueData = await convertFileToBase64(imageString);
    }
    const updatedData = {
      ...data,
      image: isBase64Image(imageValueData) ? imageValueData : data.image,
      activePlan: currentUser.plan,
      id: offerId ? offerId : undefined,
    };

    try {
      setLoading(true);
      if (updatedData.id) {
        const { data: resData, error: errData } = await updateOffer(
          updatedData
        );
        if (errData) {
          throw new Error(errData.data.message);
        }
        if (resData.ok) {
          toast.success("Successfully offer Updated");
          router.push("user-offers");
        }
      } else {
        const { data: resData, error: errData } = await addNewOffer(
          updatedData
        );
        if (errData) {
          throw new Error(errData.data.message);
        }
        if (resData.ok) {
          toast.success("Successfully offer add");
          refetch();
          router.push("user-offers");
        } else {
          toast.error("unable to create offer");
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  if (isLoading) return <Loading />;
  return (
    <>
      <div className="">
        <div className={style.wrpa_add_form_data}>
          <div className={style.profile_heading}>
            <div
              className={`d-flex align-items-center justify-content-between ${style.heading_wr_c} `}
            >
              <h1> Add Offers</h1>
            </div>
          </div>
          <OfferForm
            businessList={businessList}
            offerData={memoisedOffer || offerInfo}
            loading={loading}
            offerTypeOptions={offerTypeOptions}
            onSubmitOffer={onSubmitForm}
          />
        </div>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
};

export default AddOffers;
