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

// Middletown city ke liye data filter karne ka function
function filterMiddletownData(apiResponse) {
  if (!apiResponse || !apiResponse.data || !Array.isArray(apiResponse.data)) {
    return {
      ok: true,
      totalPages: 0,
      data: [],
      prevPage: null,
      nextPage: null,
      limit: 0,
      page: 1,
      totalDocs: 0,
    };
  }

  // Middletown city filter karo
  const filteredData = apiResponse.data.filter(
    (item) => item.city && item.city.toLowerCase() === "township"
  );

  return {
    ...apiResponse,
    data: filteredData,
    totalDocs: filteredData.length,
    totalPages: Math.ceil(filteredData.length / (apiResponse.limit || 12)),
  };
}

// Aapke component mein ye function use karo
function DealsSaleClearance() {
  const searchParams = useSearchParams();
  const searchZips = parseInt(searchParams.get("filter_zipcode"));
  const searchTerms = searchParams.get("searchName") || "";
  const searchProduct = searchParams.get("filter_product") || "";
  const filterCity = searchParams.get("filterCity") || "";
  const businessName = searchParams.get("businessName") || "";
  const pageNo = searchParams.get("page") || 1;

  const queryURL = buildQuery(
    pageNo,
    searchTerms,
    searchZips,
    searchProduct,
    filterCity,
    businessName
  );

  const {
    data: offersResponse,
    isFetching,
    isLoading,
    isError,
  } = useGetAllOffersQuery({ query: queryURL });

  // Middletown ke liye filter karo
  const offers = filterMiddletownData(offersResponse);

  console.log("filtered middletown offers:", offers);

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
