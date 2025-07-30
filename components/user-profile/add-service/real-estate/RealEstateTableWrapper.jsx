"use client";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";

import style from "@/components/user-profile/profile.module.css";
import { RealEstateTable } from "./RealEstateTable";
import { useSelector } from "react-redux";
import { useGetUsersPropertyQuery } from "@/store/real-estate/realEstateService";
import { Loading } from "@/components/Loading";
import PaginationTwo from "../../table/PaginationTwo";
import { isEmpty } from "lodash";
import { useQueryRequest } from "./QueryRequestProvider";
import { useEffect, useMemo, useState } from "react";
import { objectToQueryString } from "@/utils/helperFn";
export const RealEstateTableWrapper = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { currentPlan } = useSelector((state) => state.plan);
  const { state } = useQueryRequest();
  const [query, setQuery] = useState(objectToQueryString(state));
  const updatedQuery = useMemo(() => objectToQueryString(state), [state]);
  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery);
    }
  }, [updatedQuery, query]);
  const { data: realEstates, isLoading } = useGetUsersPropertyQuery({
    userId: currentUser.id,
    query: query,
  });
  const router = useRouter();
  const handleShow = () => {
    router.push(`add-real-estate`);
  };
  if (isLoading || isEmpty(realEstates)) return <Loading />;
  return (
    <>
      <div className={style.profile_heading}>
        <div
          className={`d-flex align-items-center justify-content-between ${style.heading_wr_c} `}
        >
          <div>
            <h1>Real Estate Lists</h1>
          </div>
          <div>
            {currentPlan.canPostRealEstate ? (
              <div className={style.table_top_wrap}>
                <Button
                  className={style.rt_r_cl}
                  variant="primary"
                  type="button"
                  onClick={handleShow}
                >
                  Add Real Estate
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className={style.business_list_wraper}>
        <RealEstateTable data={realEstates.data} />
        {realEstates.data.length ? (
          <PaginationTwo
            activePage={realEstates.page}
            totalPages={realEstates.totalPages}
            prevPage={realEstates.prevPage}
            nextPage={realEstates.nextPage}
          />
        ) : null}
      </div>
    </>
  );
};
