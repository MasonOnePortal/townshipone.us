import { getToken } from "@/utils/token";
import { orderBy } from "lodash";
import { parse, format, parseISO } from "date-fns";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authApi } from "../auth/authService";
import { baseQueryWithReAuth } from "../auth/refreshToken";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
  baseQuery: baseQueryWithReAuth,

  tagTypes: ["subscription"],
  endpoints: (builder) => ({
    paymentInitiate: builder.mutation({
      query: (data) => ({
        url: "subscription",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["subscription"],
    }),

    getOnePayment: builder.query({
      query: (id) => ({
        url: `subscription/${id}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(authApi.endpoints.currentUser.initiate(null));
        } catch (error) {}
      },
      providesTags: ["subscription"],
    }),
    getAllPayment: builder.query({
      query: () => ({
        url: `subscription`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ["subscription"],
    }),
  }),
});

export const {
  usePaymentInitiateMutation,
  useGetAllPaymentQuery,
  useGetOnePaymentQuery,
} = subscriptionApi;
