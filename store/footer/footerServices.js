"use client";
import { getToken } from "@/utils/token";
import { orderBy } from "lodash";
import { parse, format, parseISO } from "date-fns";
import { pageContent } from "@/store/auth/authSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReAuth } from "../auth/refreshToken";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const footerApi = createApi({
  reducerPath: "footerApi",

  baseQuery: baseQueryWithReAuth,
  refetchOnReconnect: true,
  tagTypes: ["Footer", "Slider"],
  endpoints: (builder) => ({
    getAllFooter: builder.query({
      query: () => ({
        url: `/content_setting/general_setting`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["Footer"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(pageContent(data[0]));
        } catch (error) {}
      },
      transformResponse: (response, meta, arg) => {
        return response?.data[0];
      },
    }),
    getAllFooterOfPost: builder.query({
      query: () => ({
        url: `/content_setting/slider`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      transformResponse: (response, meta, arg) => {
        return response?.data;
      },
      providesTags: ["Slider"],
    }),
    getAllPostFooter: builder.query({
      query: () => ({
        url: `/content_setting/footer_links`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),

      transformResponse: (response, meta, arg) => {
        return response?.data;
      },
      providesTags: ["Footer"],
    }),
    getContactDetails: builder.query({
      query: () => ({
        url: `/content_setting/contact_us`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),

      transformResponse: (response, meta, arg) => {
        return response?.data;
      },
      providesTags: ["Footer"],
    }),
  }),
});

export const {
  useGetAllFooterOfPostQuery,
  useGetAllFooterQuery,
  useGetAllPostFooterQuery,
  useGetContactDetailsQuery,
} = footerApi;
