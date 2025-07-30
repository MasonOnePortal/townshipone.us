"use client";

import { objectToQueryString } from "@/utils/helperFn";
import { useEffect, useState } from "react";

export const useSetPropertyQuery = (dataSet) => {
  const [queryResult, setQueryResult] = useState("");

  useEffect(() => {
    const queryParams = {};
    for (const [key, value] of dataSet.entries()) {
      queryParams[key] = value;
    }
    const resultData = objectToQueryString(queryParams);
    if (!!resultData) {
      setQueryResult(resultData);
    }
  }, [dataSet]);
  return { queryResult };
};
