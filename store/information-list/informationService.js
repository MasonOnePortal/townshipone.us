import { getToken } from "@/utils/token";
import { createEntityAdapter } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { orderBy } from "lodash";
import { baseQueryWithReAuth } from "../auth/refreshToken";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const informationApi = createApi({
  reducerPath: "informationApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Business", "information_category"],
  endpoints: (builder) => ({
    informationCategories: builder.query({
      query: (searchTerm = "") => ({
        url: `information_category?searchName=${searchTerm}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      transformResponse: (response, meta, arg) => {
        const modifiedResponse = response?.data
          .filter((item) => item.status !== "Inactive")
          .map((item) => {
            const { _id, name, __v, ...rest } = item;
            return {
              id: _id,
              url: name.replace(" ", "-").toLowerCase(),
              name: name,
              ...rest,
            };
          });
        return modifiedResponse;
      },

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "information_category", id })),
              { type: "information_category", id: "LIST" },
            ]
          : [{ type: "information_category", id: "LIST" }],
    }),

    getOneCotegeryInformation: builder.query({
      query: (id) => ({
        url: `information_category/${id}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      transformResponse: (response, meta, arg) => {
        const { _id, _v, ...rest } = response?.data;
        const modified = {
          ...rest,
          id: _id,
        };
        return modified;
      },
      providesTags: ["information-list"],
    }),

    informationList: builder.query({
      query: ({ category, query, searchTerms = "", otherQuery = {} }) => ({
        url: `information?category=${category}&page=${query}&items_per_page=12&searchName=${searchTerms}&${otherQuery}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),

      providesTags: ["information-list"],
    }),
    getOneInformation: builder.query({
      query: (id) => ({
        url: `information/${id}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      transformResponse: (response, meta, arg) => {
        const { _id, _v, ...rest } = response?.data;
        const modified = {
          ...rest,
          id: _id,
        };
        return modified;
      },
      providesTags: ["information-list"],
    }),
    addInformation: builder.mutation({
      query: (information) => ({
        url: "information",
        method: "POST",
        body: information,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      transformResponse: (response, meta, arg) => {
        const { _id, _v, ...rest } = response?.data;
        const modified = {
          ...rest,
          id: _id,
        };
        return modified;
      },
      transformErrorResponse: (response, meta, arg) => {},
      invalidatesTags: ["information-list"],
    }),
    updateInformation: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `information/${id}`,
        method: "PUT",
        body: rest,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["Business"],
    }),
    getAllPromotedInformation: builder.query({
      query: () => ({
        url: `information/promoted`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      transformResponse: (response, meta, arg) => {
        return response.data;
      },
    }),
    removeInformation: builder.mutation({
      query: (id) => ({
        url: `information/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["information-list"],
    }),
  }),
});

export const {
  useInformationCategoriesQuery,
  useGetOneInformationQuery,
  useGetAllPromotedInformationQuery,
  useGetOneCotegeryInformationQuery,
  useInformationListQuery,
} = informationApi;
