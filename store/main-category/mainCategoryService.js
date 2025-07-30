import { getToken } from "@/utils/token";
import { createEntityAdapter } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { orderBy } from "lodash";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const mainCategoryApi = createApi({
  reducerPath: "mainCategoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  tagTypes: ["MainCategories"],
  endpoints: (builder) => ({
    mainCategories: builder.query({
      query: () => ({
        url: `main_categories`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      transformResponse: (response, meta, arg) => {
        const modifiedResponse = response?.data
          .filter((item) => item.status !== "Inactive")
          .map((item) => {
            const { _id, __v, ...rest } = item;
            return {
              id: _id,
              ...rest,
            };
          });
        return modifiedResponse;
      },

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "main_category", id })),
              { type: "main_category", id: "LIST" },
            ]
          : [{ type: "main_category", id: "LIST" }],
    }),
  }),
});

export const { useMainCategoriesQuery } = mainCategoryApi;
