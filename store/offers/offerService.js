import { getToken } from "@/utils/token";
import { orderBy } from "lodash";
import { parse, format, parseISO } from "date-fns";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReAuth } from "../auth/refreshToken";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const offerApi = createApi({
  reducerPath: "offerApi",

  baseQuery: baseQueryWithReAuth,
  tagTypes: ["OfferTypes", "Offer"],
  endpoints: (builder) => ({
    getOfferTypes: builder.query({
      query: (searchTerm = "") => ({
        url: `offerTypes${searchTerm ? `?searchName=${searchTerm}` : ""}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ["OfferTypes"],
      transformResponse: (response, meta, arg) => {
        return response?.data;
      },
    }),
    getUsersOffers: builder.query({
      query: ({ userId, query }) => ({
        url: `users/${userId}/offers?${query}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ["Offer"],
      transformResponse: (response, meta, arg) => {
        return response;
      },
    }),

    addNewOffer: builder.mutation({
      query: (newOffer) => ({
        url: "offers",
        method: "POST",
        body: newOffer,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["Offer"],
    }),
    updateOffer: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `offers/${id}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["Offer"],
    }),

    removeOffer: builder.mutation({
      query: (id) => ({
        url: `offers/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["Offer"],
    }),
    removeOfferImage: builder.mutation({
      query: ({ id, data }) => ({
        url: `offers/${id}/removeImage`,
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["Offer"],
    }),
    getOneOffer: builder.query({
      query: (id) => ({
        url: `offers/${id}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),

      transformResponse: (response, meta, arg) => {
        return response?.data;
      },
      providesTags: ["Offer"],
    }),

    getAllOffers: builder.query({
      query: ({ query }) => ({
        url: `offers?${query}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["Offer"],
      transformResponse: (response, meta, arg) => {
        return response;
      },
    }),

    getAllPromotedOffers: builder.query({
      query: () => ({
        url: `offers/promoted`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["Offer"],
      transformResponse: (response, meta, arg) => {
        return response.data;
      },
    }),
    getRecentAllOffers: builder.query({
      query: (businessID) => ({
        url: `offers/businessOffers/${businessID}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["Offer"],
      transformResponse: (response, meta, arg) => {
        return response?.data;
      },
    }),
  }),
});

export const {
  useGetUsersOffersQuery,
  useGetOfferTypesQuery,
  useGetAllOffersQuery,
  useGetAllPromotedOffersQuery,
  useUpdateOfferMutation,
  useRemoveOfferMutation,
  useGetOneOfferQuery,
  useAddNewOfferMutation,
  useRemoveOfferImageMutation,
  useGetRecentAllOffersQuery,
} = offerApi;
