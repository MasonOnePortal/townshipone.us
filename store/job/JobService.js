import { getToken } from "@/utils/token";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { orderBy } from "lodash";
import { planApi } from "../Plan/PlanService";
import { baseQueryWithReAuth } from "../auth/refreshToken";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Job"],
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: (query) => ({
        url: `jobs?items_per_page=10&${query}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["Job"],
    }),
    getAllPromotedJobs: builder.query({
      query: () => ({
        url: `jobs/promoted`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["Job"],
      transformResponse: (response, meta, arg) => {
        return response?.data;
      },
    }),

    getOneJob: builder.query({
      query: (id) => ({
        url: `jobs/${id}/`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      transformResponse: (response, meta, arg) => {
        return response?.data;
      },
      providesTags: ["Job"],
    }),
    addJob: builder.mutation({
      query: (jobData) => ({
        url: "jobs",
        method: "POST",
        body: jobData,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["Job"],
    }),
    getUsersJobs: builder.query({
      query: ({ userId, query }) => ({
        url: `users/${userId}/jobs?${query}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ["Job"],
      transformResponse: (response, meta, arg) => {
        return response;
      },
    }),
    updateJob: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `jobs/${id}`,
        method: "PUT",
        body: rest,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),

      invalidatesTags: ["Job"],
    }),
    removeJob: builder.mutation({
      query: (id) => ({
        url: `jobs/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["Job"],
    }),
  }),
});

export const {
  useGetUsersJobsQuery,
  useAddJobMutation,
  useGetAllJobsQuery,
  useGetAllPromotedJobsQuery,
  useGetOneJobQuery,
  useUpdateJobMutation,
  useRemoveJobMutation,
} = jobApi;
