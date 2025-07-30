"use client";
import React, { useEffect, useState } from "react";
import TopShorting from "@/components/main-listing/TopShorting";
import { useParams, useSearchParams } from "next/navigation";
import style from "@/components/main-listing/main-listing.module.css";
import { ListWrapper } from "./ListWrapper";
import { Empty } from "./Empty";
import { useBusinessesQuery } from "@/store/business/businessService";
import { buildQueryString } from "@/utils/helperFn";
import { Loading } from "../Loading";
import { notFound } from "next/navigation";

const BusinessListWrapper = () => {
  const [orderBy, setOrderBy] = useState(-1);
  const { categoryId } = useParams();

  const searchParams = useSearchParams();
  const pageCount = searchParams.get("page");
  const filterZipCode = searchParams.get("filterZipCode");
  const filterName = searchParams.get("filterName");
  const filterLocation = searchParams.get("filterLocation");
  const filterMode = searchParams.get("filterMode");
  const filterRating = searchParams.get("filterRating");
  const filterCity = searchParams.get("filterCity");
  const ecommerceMode = searchParams.get("eCommerceMode");
  const queryURL = buildQueryString(
    pageCount,
    filterZipCode,
    filterName,
    filterLocation,
    filterMode,
    filterRating,
    ecommerceMode,
    orderBy,
    filterCity
  );
  const {
    data: businessList,
    isError,
    isLoading,
    isFetching,
    refetch,
  } = useBusinessesQuery({
    category: categoryId,
    query: queryURL,
  });
  useEffect(() => {
    refetch();
  }, [orderBy, refetch]);
  const [activeTab, setActiveTab] = useState("list");

  const orderChangeHandler = (selectedOption) => {
    let ord = parseInt(selectedOption) || -1;
    setOrderBy(ord);
  };

  const layoutChangeHandler = (value) => {
    setActiveTab(value);
  };

  if (isError) return notFound();
  if (isFetching) return <Loading />;
  return (
    <div className="col-lg-9">
      <div className={activeTab === "list" ? "" : style.for_grid_view}>
        <TopShorting
          category={businessList.category}
          activeLayout={layoutChangeHandler}
          activeTab={activeTab}
          totalItems={businessList.totalDocs}
          orderChangeHandler={orderChangeHandler}
        />

        {Array.isArray(businessList.data) && businessList.data.length ? (
          <ListWrapper businessList={businessList} />
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};

export default React.memo(BusinessListWrapper);
