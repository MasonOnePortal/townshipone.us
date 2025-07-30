import { fetchBaseQuery } from "@reduxjs/toolkit/query";

import { Mutex } from "async-mutex";
import { logoutUser } from "./auth/authSlice";

const baseUrl = process.env.API_URL;
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl,
});

const customFetchQuery = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.data?.message === "Forbidden") {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          { credentials: "include", url: "auth/refresh" },
          api,
          extraOptions
        );
        if (refreshResult.data) {
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logoutUser());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export default customFetchQuery;
