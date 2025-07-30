"use client";
import { useRouter } from "next/navigation";
import { OfferTable } from "./table/OfferTable";
import { useGetUsersOffersQuery } from "@/store/offers/offerService";
import { Loading } from "@/components/Loading";
import { Button } from "react-bootstrap";
import style from "./profile.module.css";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { objectToQueryString } from "@/utils/helperFn";
import { useQueryRequest } from "./add-service/real-estate/QueryRequestProvider";
import PaginationTwo from "./table/PaginationTwo";
import { isEmpty } from "lodash";

export const OfferListWrapper = () => {
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

  const { data: offers, isLoading } = useGetUsersOffersQuery({
    userId: currentUser.id,
    query: query,
  });
  const router = useRouter();
  const handleShow = () => {
    router.push("add-offer");
  };
  if (isLoading || isEmpty(offers)) return <Loading />;
  return (
    <>
      <div className={style.profile_heading}>
        <div
          className={`d-flex align-items-center justify-content-between ${style.heading_wr_c} `}
        >
          <div>
            <h1>Offer Lists</h1>
          </div>
          {currentPlan.canAddOffer ? (
            <div className={style.table_top_wrap}>
              <Button
                className={style.rt_r_cl}
                variant="primary"
                type="button"
                onClick={handleShow}
              >
                Add Offer
              </Button>
            </div>
          ) : null}
        </div>
        <div className="">
          <div className={style.business_list_wraper}>
            <OfferTable data={offers.data} />
            {offers.data.length ? (
              <PaginationTwo
                activePage={offers.page}
                totalPages={offers.totalPages}
                prevPage={offers.prevPage}
                nextPage={offers.nextPage}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
