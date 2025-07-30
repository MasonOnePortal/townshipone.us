"use client";
import UserTopicsTable from "./UserTopicsTable";
import { useGetAllUserPostQuery } from "@/store/community/communityService";
import { useSelector } from "react-redux";
import { Loading } from "@/components/Loading";
import { isEmpty } from "lodash";
import PaginationTwo from "@/components/user-profile/table/PaginationTwo";
import { useEffect, useMemo, useState } from "react";
import { objectToQueryString } from "@/utils/helperFn";
import { useQueryRequest } from "@/components/user-profile/add-service/real-estate/QueryRequestProvider";
export const TopicsTableWrapper = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { state } = useQueryRequest();
  const [query, setQuery] = useState(objectToQueryString(state));
  const updatedQuery = useMemo(() => objectToQueryString(state), [state]);
  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery);
    }
  }, [updatedQuery, query]);

  const { data: postData, isLoading } = useGetAllUserPostQuery({
    userId: currentUser.id,
    query: query,
  });
  if (isLoading || isEmpty(postData)) return <Loading />;

  return (
    <>
      <UserTopicsTable data={postData.data} />
      <PaginationTwo
        activePage={postData.page}
        totalPages={postData.totalPages}
        prevPage={postData.prevPage}
        nextPage={postData.nextPage}
      />
    </>
  );
};
