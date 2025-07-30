import { getToken } from "@/utils/token";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  tagTypes: ["News", "News-Categories", "Comments"],
  endpoints: (builder) => ({
    getNewsCategories: builder.query({
      query: () => ({
        url: `news_categories`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["News-Categories"],
      transformResponse: (response, meta, arg) => {
        return response?.data;
      },
    }),
    getOneNewsCategory: builder.query({
      query: (id) => ({
        url: `news_categories/${id}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["News-Categories"],
      transformResponse: (response, meta, arg) => {
        return response?.data;
      },
    }),

    filterNews: builder.query({
      query: (searchTerm = "") => ({
        url: `news${searchTerm ? `?search=${searchTerm}` : ""}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      transformResponse: (response, meta, arg) => {
        return response.data;
      },
      providesTags: ["News"],
    }),
    newsByCategory: builder.query({
      query: ({ category, query }) => ({
        url: `news?category=${category}${query}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["News"],
    }),
    addNewNews: builder.mutation({
      query: (newNews) => ({
        url: "news",
        method: "POST",
        body: newNews,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["News"],
    }),
    addCommentOnNews: builder.mutation({
      query: ({ newsId, comment }) => ({
        url: `news/${newsId}/comment`,
        method: "POST",
        body: comment,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["News"],
    }),
    getCommentsOnNews: builder.query({
      query: ({ newsId, page = 1 }) => ({
        url: `news/${newsId}/comment?page=${page}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      providesTagsTags: ["Comments"],
    }),
    updateNews: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `news/${id}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["News"],
    }),

    removeNews: builder.mutation({
      query: (id) => ({
        url: `news/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["News"],
    }),

    getOneNews: builder.query({
      query: (id) => ({
        url: `news/${id}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),

      transformResponse: (response, meta, arg) => {
        return response?.data;
      },
      providesTags: ["News"],
    }),

    getAllNews: builder.query({
      query: (query) => ({
        url: `news?${query}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["News"],
    }),
  }),
});

export const {
  useGetUsersNewsQuery,
  useNewsByCategoryQuery,
  useFilterNewsQuery,
  useGetCommentsOnNewsQuery,
  useAddCommentOnNewsMutation,
  useGetNewsCategoriesQuery,
  useGetAllNewsQuery,
  useGetOneNewsCategoryQuery,
  useUpdateNewsMutation,
  useRemoveNewsMutation,
  useGetOneNewsQuery,
  useAddNewNewsMutation,
} = newsApi;
