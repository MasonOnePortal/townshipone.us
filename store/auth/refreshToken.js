import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { logoutUser, updateToken } from "./authSlice";
import { Mutex } from "async-mutex";
import { getToken, removeToken } from "@/utils/token";

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 403) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          {
            url: "auth/refresh",
            method: "GET",
            credentials: "include",
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          api.dispatch(updateToken(refreshResult.data));

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

export { baseQueryWithReAuth };
