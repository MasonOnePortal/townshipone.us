import { getToken } from "@/utils/token";
import { orderBy } from "lodash";
import { parse, format, parseISO } from "date-fns";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReAuth } from "../auth/refreshToken";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const communityApi = createApi({
  reducerPath: "communityApi",
  baseQuery: baseQueryWithReAuth,

  tagTypes: ["Posts", "Comments"],
  endpoints: (builder) => ({
    getAllPostByType: builder.query({
      query: ({ category, query }) => ({
        url: `community_posts?category=${category}&items_per_page=10&${query}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["Posts"],
    }),
    getAllPost: builder.query({
      query: () => ({
        url: `community_posts`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["Posts"],
    }),

    addNewPost: builder.mutation({
      query: (newNews) => ({
        url: "community_posts",
        method: "POST",
        body: newNews,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["Posts"],
    }),
    addCommentOnPost: builder.mutation({
      query: ({ postId, ...data }) => ({
        url: `community_posts/${postId}/comment`,
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["Comments"],
    }),
    getAllCommentOfPost: builder.query({
      query: (postId) => ({
        url: `community_posts/${postId}/comment`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      transformResponse: (response, meta, arg) => {
        return response?.data;
      },
      providesTags: ["Comments"],
    }),

    updateOnePost: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `community_posts/${id}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["Posts"],
    }),

    removePost: builder.mutation({
      query: (id) => ({
        url: `community_posts/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["Posts"],
    }),

    getOnePost: builder.query({
      query: (id) => ({
        url: `community_posts/${id}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),

      transformResponse: (response, meta, arg) => {
        return response?.data;
      },
      providesTags: ["Posts"],
    }),
    getAllUserPost: builder.query({
      query: ({ userId, query }) => ({
        url: `users/${userId}/community_posts?${query}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),

      transformResponse: (response, meta, arg) => {
        return response;
      },
      providesTags: ["Posts"],
    }),
    getUserPostCategories: builder.query({
      query: () => ({
        url: `community_category`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["Posts"],
      transformResponse: (response, meta, arg) => {
        return response?.data;
      },
    }),
  }),
});

export const {
  useGetAllCommentOfPostQuery,
  useGetUserPostCategoriesQuery,
  useAddCommentOnPostMutation,
  useGetAllPostQuery,
  useGetAllPostByTypeQuery,
  useGetAllUserPostQuery,
  useUpdateOnePostMutation,
  useRemovePostMutation,
  useGetOnePostQuery,
  useAddNewPostMutation,
} = communityApi;
