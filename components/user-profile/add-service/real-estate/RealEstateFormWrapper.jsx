"use client";
import React from "react";
import { RealEstateForm } from "./RealEstateForm";
import { RealEstateEditForm } from "./RealEstateEditForm";
import { useSearchParams } from "next/navigation";
import { useGetOneRealEstateQuery } from "@/store/real-estate/realEstateService";
import { isEmpty } from "lodash";

export const RealEstateFormWrapper = () => {
  const searchParams = useSearchParams();
  const propertyId = searchParams.get("propertyId")
    ? searchParams.get("propertyId")
    : "";
  const { data: realEstate, isLoading } = useGetOneRealEstateQuery(propertyId, {
    skip: propertyId ? false : true,
  });
  if (!propertyId) {
    return <RealEstateForm />;
  }
  if (!isLoading && propertyId && !isEmpty(realEstate)) {
    return <RealEstateEditForm realEstateDatat={realEstate} />;
  }

  return null;
};
