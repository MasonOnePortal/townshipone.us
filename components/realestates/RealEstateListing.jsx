"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useGetAllRealEstatesQuery } from "@/store/real-estate/realEstateService";
import { Empty } from "../businesses/Empty";
import TopShorting from "@/components/main-listing/TopShorting";
import { RealEstateListWrapper } from "@/components/RealEstate/RealEstateListWrapper";
import Loader from "@/components/loader/Loader";
import { usePathname, useSearchParams } from "next/navigation";
import { isEmpty } from "lodash";
import {
  buildQueryString,
  getSortResult,
  objectToQueryString,
} from "@/utils/helperFn";
import { PropertySorting } from "../main-listing/PropertySorting";
import { Loading } from "../Loading";
import { useSetPropertyQuery } from "@/hooks/useSetPropertyQuery";
export const RealEstateListing = () => {
  const searchParams = useSearchParams();
  const pageCount = searchParams.get("page");
  const orderFilter = searchParams.get("order_filter");
  const filterZipCode = searchParams.get("filterZipCode");
  const filterName = searchParams.get("filterName");
  const filterLocation = searchParams.get("filterLocation");

  const memoisedQuery = useMemo(() => {
    let queryResult = "";
    const queryParams = {};
    for (const [key, value] of searchParams.entries()) {
      queryParams[key] = value;
    }
    const resultData = objectToQueryString(queryParams);
    if (!!resultData) {
      return resultData;
    } else {
      return queryResult;
    }
  }, [searchParams]);

  const {
    data: realEstates,
    isFetching,
    isLoading,
    refetch,
  } = useGetAllRealEstatesQuery(memoisedQuery);

  const [activeTab, setActiveTab] = useState("list");
  if (!realEstates) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const layoutChangeHandler = (value) => {
    setActiveTab(value);
  };
  if (isFetching) return <Loading />;
  return (
    <div className="col-lg-9 col-md-9">
      <div className="mb-3">
        <PropertySorting
          activeLayout={layoutChangeHandler}
          activeTab={activeTab}
        />
      </div>
      <div>
        <div
          className={
            activeTab === "list" ? "for_list_view_cl" : "for_list_view_cl-"
          }
        >
          {!isLoading ? (
            Array.isArray(realEstates?.data) && !isEmpty(realEstates?.data) ? (
              <>
                <RealEstateListWrapper realEstates={realEstates} />
              </>
            ) : (
              <Empty />
            )
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};
