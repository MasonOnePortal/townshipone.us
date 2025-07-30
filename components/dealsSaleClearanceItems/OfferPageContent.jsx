"use client";
import React from "react";
import { useGetOfferContentQuery } from "@/store/common api/commonService";
import { Loading } from "../Loading";
import style from "./dealssaleclearance.module.css";
import { isEmpty } from "lodash";
export const OfferPageContent = () => {
  const { data, isFetching, isLoading, isError } = useGetOfferContentQuery();
  if (isLoading) return <Loading />;
  if (isEmpty(data)) return null;
  return (
    <div>
      <p className={style.offer_content}>{data.description}</p>
    </div>
  );
};
