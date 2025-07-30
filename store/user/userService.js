import { getToken } from "@/utils/token";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { updateCurrentUser } from "../auth/authSlice";
import { baseQueryWithReAuth } from "../auth/refreshToken";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReAuth,

  refetchOnReconnect: true,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: `users/me`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      transformResponse: (response, meta, arg) => {
        return response.user;
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { user: userData },
          } = await queryFulfilled;
          dispatch(updateCurrentUser(userData));
        } catch (error) {}
      },
      providesTags: ["User"],
    }),
    // update user
    updateUser: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: rest,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      transformResponse: (response, meta, arg) => {
        const { _id: id, updatedAt, __v, ...rest } = response.user;
        const currentUser = {
          ...rest,
          id,
        };
        return currentUser;
      },
      invalidatesTags: ["User"],
    }),
    // user statics
    userStatistics: builder.query({
      query: () => ({
        url: `users/user_statics`,
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      transformResponse: (response, meta, arg) => {
        return response.data;
      },
      invalidatesTags: ["User"],
    }),
    changeProfile: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `users/${id}/profile_update`,
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { user: userData },
          } = await queryFulfilled;
          dispatch(updateCurrentUser(userData));
        } catch (error) {}
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useUserStatisticsQuery,
  useChangeProfileMutation,
  useUpdateUserMutation,
} = userApi;
