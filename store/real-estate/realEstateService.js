import { getToken } from "@/utils/token";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { orderBy } from "lodash";
import { planApi } from "../Plan/PlanService";
import { baseQueryWithReAuth } from "../auth/refreshToken";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const realEstateApi = createApi({
  reducerPath: "realEstateApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["real-estate"],
  endpoints: (builder) => ({
    getAllRealEstates: builder.query({
      query: (query) => ({
        url: `real_estates?${query}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["real-estate"],
    }),
    getAllPromotedRealEstates: builder.query({
      query: (query) => ({
        url: `real_estates/promoted`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["real-estate"],
      transformResponse: (response, meta, arg) => {
        return response?.data;
      },
    }),

    getUsersProperty: builder.query({
      query: ({ userId, query }) => ({
        url: `users/${userId}/real_estates?${query}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ["real-estate"],
      transformResponse: (response, meta, arg) => {
        return response;
      },
    }),

    getOneRealEstate: builder.query({
      query: (id) => ({
        url: `real_estates/${id}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        providesTags: ["realEstate"],
      }),
      transformResponse: (response, meta, arg) => {
        return response?.data;
      },
      // async onQueryStarted(args, { dispatch, queryFulfilled }) {
      //   try {
      //     await queryFulfilled;
      //     await dispatch(planApi.endpoints.getOnePlan.initiate(null));
      //   } catch (error) {}
      // },
      providesTags: ["real-estate"],
    }),

    addRealEstate: builder.mutation({
      query: (realEstateData) => ({
        url: "real_estates",
        method: "POST",
        body: realEstateData,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["real-estate"],
    }),
    updateRealEstate: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `real_estates/${id}`,
        method: "PUT",
        body: rest,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["real-estate"],
    }),
    removeRealEstate: builder.mutation({
      query: (id) => ({
        url: `real_estates/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["real-estate"],
    }),
  }),
});

export const {
  useGetUsersPropertyQuery,
  useAddRealEstateMutation,
  useGetAllPromotedRealEstatesQuery,
  useGetAllRealEstatesQuery,
  useGetOneRealEstateQuery,
  useUpdateRealEstateMutation,
  useRemoveRealEstateMutation,
} = realEstateApi;
