"use client";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import {
  useGetUsersBusinessListQuery,
  useGetUsersBusinessQuery,
} from "@/store/business/businessService";
import { Loading } from "@/components/Loading";
import style from "./profile.module.css";
import { BTable } from "./table/BTable";
import { useSelector } from "react-redux";
import { useQueryRequest } from "./add-service/real-estate/QueryRequestProvider";
import { useEffect, useMemo, useState } from "react";
import { objectToQueryString } from "@/utils/helperFn";
import { isEmpty } from "lodash";
import PaginationTwo from "./table/PaginationTwo";

export const BusinessTableWrapper = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { currentPlan } = useSelector((state) => state.plan);
  const { state } = useQueryRequest();
  const [query, setQuery] = useState(objectToQueryString(state));
  const updatedQuery = useMemo(() => objectToQueryString(state), [state]);
  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery);
    }
  }, [query, updatedQuery]);

  const { data: businesses, isLoading } = useGetUsersBusinessListQuery({
    userId: currentUser.id,
    query: query,
  });
  const router = useRouter();
  const handleShow = () => {
    router.push(`add-business`);
  };
  if (isLoading || isEmpty(businesses)) return <Loading />;
  return (
    <>
      <div className={style.profile_heading}>
        <div>
          <div
            className={`d-flex align-items-center justify-content-between ${style.heading_wr_c} `}
          >
            <div>
              <h1>Business Lists</h1>
            </div>
            <div>
              {currentPlan.canAddBusiness ? (
                <div className={style.table_top_wrap}>
                  <Button
                    className={style.rt_r_cl}
                    variant="primary"
                    type="button"
                    onClick={handleShow}
                  >
                    Add Business
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
          <div>
            <div className={`table-responsive ${style.business_list_wraper}`}>
              <BTable data={businesses.data} />
              {businesses.data.length ? (
                <PaginationTwo
                  activePage={businesses.page}
                  totalPages={businesses.totalPages}
                  prevPage={businesses.prevPage}
                  nextPage={businesses.nextPage}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
