"use client";
import { useSearchParams } from "next/navigation";

import style from "@/components/user-profile/profile.module.css";
import ReviewsTable from "./ReviewsTable";
import { useGetAllBusinessReviewsByOwnerQuery } from "@/store/business/businessService";
import { Loading } from "@/components/Loading";
import { useEffect, useMemo, useState } from "react";
import { objectToQueryString } from "@/utils/helperFn";
import { useQueryRequest } from "@/components/user-profile/add-service/real-estate/QueryRequestProvider";
import PaginationTwo from "@/components/user-profile/table/PaginationTwo";
import { isEmpty } from "lodash";
export const UserReviewWrapper = () => {
  const searchParams = useSearchParams();
  const { state } = useQueryRequest();
  const [query, setQuery] = useState(objectToQueryString(state));
  const updatedQuery = useMemo(() => objectToQueryString(state), [state]);
  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery);
    }
  }, [updatedQuery]);

  const { data: reviewData, isLoading } = useGetAllBusinessReviewsByOwnerQuery({
    businessId: searchParams.get("businessId"),
    query: query,
  });

  if (isLoading || isEmpty(reviewData)) return <Loading />;

  return (
    <>
      <div className={style.profile_heading}>
        <div
          className={`d-flex align-items-center justify-content-between ${style.heading_wr_c} `}
        >
          <div>
            <h1>Reviews List</h1>
          </div>
        </div>
      </div>
      <div className={style.business_list_wraper}>
        <ReviewsTable data={reviewData.data} />
        <PaginationTwo
          activePage={reviewData.page}
          totalPages={reviewData.totalPages}
          prevPage={reviewData.prevPage}
          nextPage={reviewData.nextPage}
        />
      </div>
    </>
  );
};
