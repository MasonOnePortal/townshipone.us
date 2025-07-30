"use client";
import React from "react";
import ServiceCard from "./ServiceCard";
// import { Loading } from "@/components/Loading";
import { NoData } from "@/components/NoData";
import { useGetAllServicesQuery } from "@/store/common api/commonService";
import Pagination from "../main-listing/Pagination";
import { useSearchParams } from "next/navigation";
import { buildQueryString } from "@/utils/helperFn";
import { Loading } from "../Loading";
import { isEmpty } from "lodash";
import { Empty } from "../Empty";

export const ServiceWrapper = () => {
  const searchParams = useSearchParams();
  const pageCount = parseInt(searchParams.get("page")) || 1;
  const queryURL = buildQueryString(pageCount);
  const {
    data: getAllInformation,
    isLoading,
    isFetching,
    ...restData
  } = useGetAllServicesQuery(queryURL);

  if (isLoading || isFetching) {
    return <Loading />;
  }
  return (
    <>
      {!isEmpty(getAllInformation) ? (
        <>
          {Array.isArray(getAllInformation?.data) &&
          getAllInformation?.data?.length ? (
            <div className="row">
              {getAllInformation?.data.map((item) => (
                <div key={item.id} className="col-lg-3 col-md-4">
                  <ServiceCard item={item} />
                </div>
              ))}
            </div>
          ) : (
            <NoData />
          )}

          {Array.isArray(getAllInformation.data) &&
          getAllInformation.data.length ? (
            <Pagination
              currentPage1={getAllInformation.page}
              totalPages={getAllInformation.totalPages}
              prevPage={getAllInformation.prevPage}
              nextPage={getAllInformation.nextPage}
            />
          ) : (
            ""
          )}
        </>
      ) : (
        <Empty />
      )}
    </>
  );
};
