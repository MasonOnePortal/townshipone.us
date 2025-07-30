import { getToken } from "@/utils/token";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),

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
      query: (id) => ({
        url: `users/${id}/jobs`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ["Job"],
      transformResponse: (response, meta, arg) => {
        return response?.data;
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
  useGetOneJobQuery,
  useUpdateJobMutation,
  useRemoveJobMutation,
} = jobApi;
