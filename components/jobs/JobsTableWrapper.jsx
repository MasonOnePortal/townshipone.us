"use client";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import style from "@/components/user-profile/profile.module.css";
import { JobsTable } from "./JobsTable";
import { useGetUsersJobsQuery } from "@/store/job/JobService";
import { useSelector } from "react-redux";
import { Loading } from "../Loading";
import { useEffect, useMemo, useState } from "react";
import { objectToQueryString } from "@/utils/helperFn";
import { useQueryRequest } from "../user-profile/add-service/real-estate/QueryRequestProvider";
import PaginationTwo from "../user-profile/table/PaginationTwo";
import { isEmpty } from "lodash";

export const JobsTableWrapper = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { currentPlan } = useSelector((state) => state.plan);
  const { state } = useQueryRequest();
  const [query, setQuery] = useState(objectToQueryString(state));
  const updatedQuery = useMemo(() => objectToQueryString(state), [state]);
  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery);
    }
  }, [updatedQuery]);

  const { data: jobsData, isLoading } = useGetUsersJobsQuery({
    userId: currentUser.id,
    query: query,
  });

  const router = useRouter();
  const handleShow = () => {
    router.push(`/user-profile/add-job`);
  };
  if (isLoading || isEmpty(jobsData)) return <Loading />;
  return (
    <>
      <div className={style.profile_heading}>
        <div
          className={`d-flex align-items-center justify-content-between ${style.heading_wr_c} `}
        >
          <div>
            <h1>Job Lists</h1>
          </div>
          {currentPlan.canPostJob ? (
            <div className={style.table_top_wrap}>
              <Button
                className={style.rt_r_cl}
                variant="primary"
                type="button"
                onClick={handleShow}
              >
                Add Jobs
              </Button>
            </div>
          ) : null}
        </div>
      </div>
      <div className={style.business_list_wraper}>
        <JobsTable data={jobsData.data} />
        {jobsData.data.length ? (
          <PaginationTwo
            activePage={jobsData.page}
            totalPages={jobsData.totalPages}
            prevPage={jobsData.prevPage}
            nextPage={jobsData.nextPage}
          />
        ) : null}
      </div>
    </>
  );
};
