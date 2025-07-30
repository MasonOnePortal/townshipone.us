"use client";
import React, { useMemo, useState } from "react";
import JobItems from "@/components/job/JobItems";
import Pagination from "@/components/main-listing/Pagination";
import { useGetAllJobsQuery } from "@/store/job/JobService";
import { useSearchParams } from "next/navigation";
import { buildQueryString, objectToQueryString } from "@/utils/helperFn";
import { Empty } from "@/components/Empty";
import { Loading } from "../Loading";
import JobSorting from "./JobSorting";
import { PropertySorting } from "../main-listing/PropertySorting";
export const JobsfilterOptions = [
  // { value: "listed_a_z", label: "A - Z " },
  // { value: "listed_z_a", label: "Z - A" },
  { value: "listed_asc", label: "Listed Date Older to Latest" },
  { value: "listed_desc", label: "Listed Date Latest to Older" },
];

export const JobListWrapper = () => {
  const searchParams = useSearchParams();
  const pageCount = parseInt(searchParams.get("page")) || 1;
  const filterZipCode = parseInt(searchParams.get("filterZipCode"));
  const filterName = searchParams.get("filterName");
  const filterCity = searchParams.get("filterCity");
  const filterLocation = searchParams.get("filterLocation");
  const filterCompany = searchParams.get("company");
  const filterOrderBy = searchParams.get("order_filter");
  const queryURL = buildQueryString(
    pageCount,
    filterZipCode,
    filterName,
    filterLocation,
    undefined,
    undefined,
    undefined,
    undefined,
    filterCity,
    filterCompany,
    undefined,
    filterOrderBy
  );
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

  const { data: getAllJobs, isFetching } = useGetAllJobsQuery(queryURL);
  const [activeTab, setActiveTab] = useState("");
  const layoutChangeHandler = (value) => {
    setActiveTab(value);
  };
  if (isFetching) return <Loading />;
  return (
    <div className="col-lg-9 col-md-9">
      <div className="mb-3">
        <JobSorting />
      </div>
      <div className="p-2">
        <PropertySorting
          activeLayout={layoutChangeHandler}
          activeTab={activeTab}
          filterOptions={JobsfilterOptions}
          filter={false}
        />
      </div>
      <div>
        {Array.isArray(getAllJobs.data) && getAllJobs.data.length ? (
          getAllJobs?.data?.map((jobs, index) => (
            <div key={index} className="">
              <JobItems {...jobs} />
            </div>
          ))
        ) : (
          <Empty />
        )}

        {Array.isArray(getAllJobs.data) && getAllJobs.data.length ? (
          <Pagination
            currentPage1={getAllJobs.page}
            totalPages={getAllJobs.totalPages}
            prevPage={getAllJobs.prevPage}
            nextPage={getAllJobs.nextPage}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
