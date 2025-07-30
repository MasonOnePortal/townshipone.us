import { transformAmenities, transformTimeData } from "@/utils/helperFn";
import { getToken } from "@/utils/token";
import { createEntityAdapter } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { orderBy } from "lodash";
import { baseQueryWithReAuth } from "../auth/refreshToken";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const businessApi = createApi({
  reducerPath: "businessApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Business", "business_category", "Reviews"],
  endpoints: (builder) => ({
    businessesCategories: builder.query({
      query: (searchTerm = "") => ({
        url: `businesses_categories?searchName=${searchTerm}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      transformResponse: (response, meta, arg) => {
        return response.data;
      },
      providesTags: ["business_category"],
    }),

    businesses: builder.query({
      query: ({ category, query }) => ({
        url: `businesses?category=${category}&items_per_page=10${query}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["Business"],
    }),
    getPromotedBusinesses: builder.query({
      query: () => ({
        url: `businesses/promoted_business`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      transformResponse: (response, meta, arg) => {
        return response?.data;
      },
      providesTags: ["Business"],
    }),

    getBusiness: builder.query({
      query: (id) => ({
        url: `businesses/${id}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      transformResponse: (response, meta, arg) => {
        return response?.data;
      },
      providesTags: ["Business"],
    }),
    addBusiness: builder.mutation({
      query: (business) => ({
        url: "businesses",
        method: "POST",
        body: business,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),

      invalidatesTags: ["Business"],
    }),
    updateBusiness: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `businesses/${id}`,
        method: "PUT",
        body: rest,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["Business"],
    }),
    removeBusiness: builder.mutation({
      query: (id) => ({
        url: `businesses/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["Business"],
    }),
    rateBusiness: builder.mutation({
      query: ({ id, data }) => ({
        url: `businesses/${id}/rating`,
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["Business"],
    }),
    addBusinessReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `businesses/${id}/reviews`,
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["Business"],
    }),
    getBusinessReview: builder.query({
      query: ({ id, reviewId }) => ({
        url: `businesses/${id}/reviews/${reviewId}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    getUsersBusiness: builder.query({
      query: () => ({
        url: `businesses`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      transformResponse: (response, meta, arg) => {
        return response.data;
      },
      providesTags: ["Business"],
    }),
    getUsersBusinessList: builder.query({
      query: ({ userId, query }) => ({
        url: `users/${userId}/businesses?${query}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      transformResponse: (response, meta, arg) => {
        return response;
      },
      providesTags: ["Business"],
    }),
    // all review on user dashboard
    getAllBusinessReviewsByOwner: builder.query({
      query: ({ businessId, query }) => ({
        url: `businesses/${businessId}/allReviews?${query}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ["Reviews"],
    }),

    // all review on details page
    getAllBusinessReviews: builder.query({
      query: (businessId) => ({
        url: `reviews?businessId=${businessId}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      transformResponse: (response, meta, arg) => {
        const modifiedArray = response.data.map((obj) => {
          const { _id, _v, ...rest } = obj;
          return {
            ...rest,
            id: _id,
          };
        });
        return orderBy(modifiedArray, ["createdAt"], ["desc"], ["assen"]);
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Business", id })),
              { type: "Business", id: "LIST" },
            ]
          : [{ type: "Business", id: "LIST" }],
    }),

    getBusinessReviews: builder.query({
      query: ({ id, startIndex = 1 }) => ({
        url: `businesses/${id}/reviews/?page=${startIndex}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      transformResponse: (response, meta, arg) => {
        return response;
      },
      providesTags: ["Business"],
    }),
  }),
});

export const {
  useBusinessesCategoriesQuery,
  useBusinessesQuery,
  useGetPromotedBusinessesQuery,
  useGetAllBusinessReviewsQuery,
  useGetUsersBusinessQuery,
  useAddBusinessMutation,
  useUpdateBusinessMutation,
  useRemoveBusinessMutation,
  useAddBusinessReviewMutation,
  useRateBusinessMutation,
  useGetUsersBusinessListQuery,
  useGetBusinessQuery,
  useGetAllBusinessReviewsByOwnerQuery,
  useGetBusinessReviewsQuery,
  useGetBusinessReviewQuery,
} = businessApi;
