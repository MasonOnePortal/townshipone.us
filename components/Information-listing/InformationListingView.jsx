import { useParams, useSearchParams } from "next/navigation";
import {
  useGetOneInformationQuery,
  useInformationListQuery,
} from "@/store/information-list/informationService";
import { Loading } from "@/components/Loading";
import Pagination from "../main-listing/Pagination";
import { Empty } from "../Empty";
import BusinessCard from "../card/BuisnessCard";
import { getQueryParamsAsObject } from "@/utils/helperFn";
import { useEffect } from "react";

function InformationListingView({ visibleFilter = false }) {
  const params = useParams();
  const searchParams = useSearchParams();
  const searchTerms = searchParams.get("searchName")
    ? searchParams.get("searchName")
    : "";

  const { searchName, ...rest } = getQueryParamsAsObject(searchParams);
  const filterQuery = new URLSearchParams({
    ...rest,
    filterCity: "township",
  }).toString();

  const { id } = params;
  const { data: infoDetail } = useGetOneInformationQuery(id);
  const pageCount = searchParams.get("page");
  const {
    data: informationList,
    isFetching,
    isLoading,
  } = useInformationListQuery({
    category: id,
    query: pageCount,
    searchTerms,
    otherQuery: filterQuery,
  });

  if (isFetching) return <Loading />;

  console.log("informationList.data", informationList.data);

  // --- Filter to show only Middletown city data ---
  const allowedCities = ["deerfield", "`symmes", "township"];

  const filteredData = Array.isArray(informationList?.data)
    ? informationList.data.filter((item) => {
        const cityName = item.city?.trim().toLowerCase();
        return (
          cityName &&
          allowedCities.some((allowed) => cityName.includes(allowed))
        );
      })
    : [];

  console.log("filteredData.data", filteredData);

  return (
    <>
      <div className="grid_container">
        {filteredData.length ? (
          <div className="row">
            {filteredData.map((item) => (
              <div
                key={item.id}
                className={`${
                  !visibleFilter
                    ? "col-lg-4 col-md-6 full_size_card"
                    : "col-lg-3 col-md-4"
                }`}
              >
                <BusinessCard itemInfo={item} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <Empty />
          </div>
        )}
        {filteredData.length > 0 ? (
          <Pagination
            currentPage1={informationList.page}
            totalPages={informationList.totalPages}
            prevPage={informationList.prevPage}
            nextPage={informationList.nextPage}
          />
        ) : null}
      </div>
    </>
  );
}

export default InformationListingView;
