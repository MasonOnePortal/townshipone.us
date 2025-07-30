import { getToken } from "@/utils/token";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReAuth } from "../auth/refreshToken";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const productApi = createApi({
  reducerPath: "productApi",

  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Product", "Offer"],
  endpoints: (builder) => ({
    getUsersProducts: builder.query({
      query: (id) => ({
        url: `products`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ["Product"],
      transformResponse: (response, meta, arg) => {
        return response.data;
      },
    }),

    addNewProduct: builder.mutation({
      query: (newProduct) => ({
        url: "products",
        method: "POST",
        body: newProduct,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["Product"],
    }),

    removeProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["Product"],
    }),
    removeProductImage: builder.mutation({
      query: ({ id, data }) => ({
        url: `products/${id}/removeImage`,
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["Product"],
    }),
    getOneProduct: builder.query({
      query: (id) => ({
        url: `products/${id}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),

      transformResponse: (response, meta, arg) => {
        return response?.data;
      },
      providesTags: ["Product"],
    }),
    getAllProductByBusiness: builder.query({
      query: (businessID) => ({
        url: `products/business/${businessID}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ["Product"],
      transformResponse: (response, meta, arg) => {
        return response?.data;
      },
    }),
  }),
});

export const {
  useGetUsersProductsQuery,
  // useGetProductTypesQuery,
  useGetAllProductByBusinessQuery,
  useUpdateProductMutation,
  useRemoveProductMutation,
  useGetOneProductQuery,
  useAddNewProductMutation,
  useRemoveProductImageMutation,
  // useGetRecentAllProductsQuery,
} = productApi;
