"use client";
import style from "./dealssaleclearance.module.css";
import { useSearchParams } from "next/navigation";
import { useGetAllOffersQuery } from "@/store/offers/offerService";
import { Loading } from "@/components/Loading";
import { Empty } from "../Empty";
import Pagination from "../main-listing/Pagination";
import { isArray } from "lodash";
import { buildQuery } from "@/utils/helperFn";
import { OfferBox } from "./OfferBox";
function DealsSaleClearance() {
  const searchParams = useSearchParams();
  const searchZips = parseInt(searchParams.get("filter_zipcode"));
  const searchTerms = searchParams.get("searchName")
    ? searchParams.get("searchName")
    : "";
  const searchProduct = searchParams.get("filter_product")
    ? searchParams.get("filter_product")
    : "";
  const filterCity = searchParams.get("filterCity")
    ? searchParams.get("filterCity")
    : "";
  const businessName = searchParams.get("businessName")
    ? searchParams.get("businessName")
    : "";

  const pageNo = searchParams.get("page") ? searchParams.get("page") : 1;

  const queryURL = buildQuery(
    pageNo,
    searchTerms,
    searchZips,
    searchProduct,
    filterCity,
    businessName
  );

  const {
    data: offers,
    isFetching,
    isLoading,
    isError,
  } = useGetAllOffersQuery({ query: queryURL });

  if (isFetching) return <Loading />;
  if (isError) return <p>Oops! Some issue</p>;
  return (
    <>
      <div className={`container ${style.wrap_deals_data}`}>
        <div className="col-12">
          {Array.isArray(offers.data) && offers.data.length ? (
            <div className="row">
              {offers.data.map((item) => (
                <div key={item.id} className="col-lg-4 col-md-6 mb-4">
                  <OfferBox offer={item} />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      {!isLoading && Array.isArray(offers.data) && offers.data.length === 0 ? (
        <div className="text-center">
          <Empty />
        </div>
      ) : null}

      <div>
        {isArray(offers.data) && offers.data.length ? (
          <Pagination
            currentPage1={offers.page}
            totalrecord={offers.totalDocs}
            recordLimit={offers.limit}
            totalPages={offers.totalPages}
            prevPage={offers.prevPage}
            nextPage={offers.nextPage}
          />
        ) : null}
      </div>
    </>
  );
}

export default DealsSaleClearance;
