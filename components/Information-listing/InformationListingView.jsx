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
  const filterQuery = new URLSearchParams(rest).toString();

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

  return (
    <>
      <div className="grid_container">
        {Array.isArray(informationList.data) && informationList.data.length ? (
          <div className="row ">
            {informationList.data.map((item) => (
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
        {informationList.data.length > 0 ? (
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
