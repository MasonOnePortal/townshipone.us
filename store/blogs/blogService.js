import { getToken } from "@/utils/token";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReAuth } from "../auth/refreshToken";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: baseQueryWithReAuth,

  tagTypes: ["Blog", "Blog-Categories", "Comments"],
  endpoints: (builder) => ({
    getBlogCategories: builder.query({
      query: () => ({
        url: `blog_categories`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["Blog-Categories"],
      transformResponse: (response, meta, arg) => {
        return response?.data;
      },
    }),
    getOneBlogCategory: builder.query({
      query: (id) => ({
        url: `blog_categories/${id}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["Blog-Categories"],
      transformResponse: (response, meta, arg) => {
        return response?.data;
      },
    }),
    getUsersBlogs: builder.query({
      query: ({ userId, query }) => ({
        url: `users/${userId}/blogs?${query}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ["Blog"],
      transformResponse: (response, meta, arg) => {
        return response;
      },
    }),

    blogsByCategory: builder.query({
      query: ({ category, query }) => ({
        url: `blogs?category=${category}${query}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["Blog"],
    }),
    addNewBlog: builder.mutation({
      query: (newBlog) => ({
        url: "blogs",
        method: "POST",
        body: newBlog,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["Blog"],
    }),
    addCommentOnBlog: builder.mutation({
      query: ({ blogId, comment }) => ({
        url: `blogs/${blogId}/comment`,
        method: "POST",
        body: comment,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Blog"],
    }),
    getCommentsOnBlog: builder.query({
      query: ({ blogId, page = 1 }) => ({
        url: `blogs/${blogId}/comment?page=${page}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      providesTagsTags: ["Comments"],
    }),
    updateBlog: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `blogs/${id}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["Blog"],
    }),

    removeBlog: builder.mutation({
      query: (id) => ({
        url: `blogs/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["Blog"],
    }),

    getOneBlog: builder.query({
      query: (id) => ({
        url: `blogs/${id}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),

      transformResponse: (response, meta, arg) => {
        return response?.data;
      },
      providesTags: ["Blog"],
    }),

    getAllBlogs: builder.query({
      query: (queryURL = "") => ({
        url: `blogs?${queryURL}`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["Blog"],
    }),
  }),
});

export const {
  useGetUsersBlogsQuery,
  useBlogsByCategoryQuery,
  useGetCommentsOnBlogQuery,
  useAddCommentOnBlogMutation,
  useGetBlogCategoriesQuery,
  useGetAllBlogsQuery,
  useGetOneBlogCategoryQuery,
  useUpdateBlogMutation,
  useRemoveBlogMutation,
  useGetOneBlogQuery,
  useAddNewBlogMutation,
} = blogApi;
