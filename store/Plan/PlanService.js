import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "@/utils/token";
import { baseQueryWithReAuth } from "../auth/refreshToken";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const planApi = createApi({
  reducerPath: "planApi",
  baseQuery: baseQueryWithReAuth,

  tagTypes: ["Plans"],
  endpoints: (builder) => ({
    getPlans: builder.query({
      query: () => ({
        url: "plans",
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["Plans"],
      transformResponse: (response, meta, arg) => {
        return response.data;
      },
    }),

    getOnePlan: builder.query({
      query: (planId) => ({
        url: `plans/${planId}/user`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      transformResponse: (response, meta, arg) => {
        return response.data;
      },
      providesTags: ["Plans"],
    }),
    getPlanDetail: builder.query({
      query: (planId) => ({
        url: `plans/${planId}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      transformResponse: (response, meta, arg) => {
        return response.data;
      },
      providesTags: ["Plans"],
    }),
    removeBusinessImage: builder.mutation({
      query: ({ id, data }) => ({
        url: `businesses/${id}/removeImage`,
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["Plans"],
    }),

    removeBusinessVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `businesses/${id}/removeVideo`,
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),

      invalidatesTags: ["Plans"],
    }),
    addBusinessVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `businesses/${id}/addVideo`,
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),

      invalidatesTags: ["Plans"],
    }),
    removePropertyImage: builder.mutation({
      query: ({ id, data }) => ({
        url: `real_estates/${id}/removeImage`,
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["Plans"],
    }),
  }),
});

export const {
  useGetPlansQuery,
  useRemoveBusinessImageMutation,
  useRemovePropertyImageMutation,
  useAddBusinessVideoMutation,
  useGetPlanDetailQuery,
  useRemoveBusinessVideoMutation,
  useGetOnePlanQuery,
} = planApi;
