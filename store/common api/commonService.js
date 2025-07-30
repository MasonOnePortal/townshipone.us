import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReAuth } from "../auth/refreshToken";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const commonApi = createApi({
  reducerPath: "commonApi",

  baseQuery: baseQueryWithReAuth,
  refetchOnReconnect: true,
  tagTypes: ["Inquiry", "Contact-Us", "Search", "Faqs"],
  endpoints: (builder) => ({
    getContactInformation: builder.query({
      query: () => ({
        url: "content_setting/contact_us",
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["Contact-Us"],
      transformResponse: (response, meta, arg) => {
        return response?.data;
      },
    }),
    getOfferContent: builder.query({
      query: () => ({
        url: "content_setting/offer_content",
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      transformResponse: (response, meta, arg) => {
        return response?.data;
      },
    }),

    getAllFaqs: builder.query({
      query: () => ({
        url: "faqs",
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["Faqs"],
    }),
    getSearchList: builder.query({
      query: (query) => ({
        url: `search?${query}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      transformResponse: (response, meta, arg) => {
        return response?.data;
      },
      providesTags: ["Search"],
    }),

    addNewInquiry: builder.mutation({
      query: (newOffer) => ({
        url: "inquiry",
        method: "POST",
        body: newOffer,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Inquiry"],
    }),
    addNewsLetterSubscriber: builder.mutation({
      query: (data) => ({
        url: "news_letter",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    getAllServices: builder.query({
      query: (query) => ({
        url: `professional_services?items_per_page=10${query}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      // transformResponse: (response, meta, arg) => {
      //   return response?.data;
      // },
      providesTags: ["professional"],
    }),
  }),
});

export const {
  useGetContactInformationQuery,
  useGetSearchListQuery,
  useAddNewInquiryMutation,
  useAddNewsLetterSubscriberMutation,
  useGetAllFaqsQuery,
  useGetAllServicesQuery,
  useGetOfferContentQuery,
} = commonApi;
