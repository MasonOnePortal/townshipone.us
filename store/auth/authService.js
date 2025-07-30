"use client";
import { getSessionToken, getToken, setToken } from "@/utils/token";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCookie } from "cookies-next";
import { isNull } from "lodash";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const accessToken = getToken() ? getToken() : getSessionToken();

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  refetchOnReconnect: true,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: data,
      }),
      transformResponse: (response, meta, arg) => {
        const now = new Date();
        const expirerIn = new Date(now.getTime() + 24 * 3600 * 1000);
        const optionsLogin = {
          // httpOnly: false,
          // secure: true,
          // sameSite: "None",
          expires: expirerIn,
        };
        if (!isNull(response.emailVerificationStatus)) {
          setCookie("isAuthenticated", true, optionsLogin);
        }

        const expireRefresh = new Date(now.getTime() + 24 * 7 * 3600 * 1000);
        const options = {
          // httpOnly: false,
          // secure: true,
          // sameSite: "None",
          expires: expireRefresh,
        };
        if (!isNull(response.emailVerificationStatus) && response.rememberMe) {
          setCookie("jwt_token", response.refreshToken, options);
        }
        return response;
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (!isNull(data.emailVerificationStatus)) {
            await dispatch(authApi.endpoints.currentUser.initiate(null));
          }
        } catch (error) {
          console.log("error", error);
        }
      },
      transformErrorResponse: (response, meta, arg) => {
        return response;
      },
      invalidatesTags: ["User"],
    }),
    currentUser: builder.query({
      query: () => ({
        url: "auth/verify_token",
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      transformResponse: (response, meta, arg) => {
        const { user: userData, ...restResponse } = response;
        const { _id: id, updatedAt, __v, ...rest } = userData;
        const currentUser = {
          ...rest,
          id,
          ...restResponse,
        };
        return currentUser;
      },
      providesTags: ["User"],
    }),

    emailVerification: builder.mutation({
      query: (data) => ({
        url: "auth/email_verification",
        method: "GET",
        credentials: "same-origin",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: data,
      }),
      transformResponse: (response, meta, arg) => {},

      invalidatesTags: ["User"],
    }),
    resendEmailVerification: builder.query({
      query: () => ({
        url: "auth/resend_email_verification",
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken() ? getToken() : getSessionToken()}`,
        },
      }),
    }),

    userLogout: builder.query({
      query: () => ({
        url: "auth/logout",
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      invalidatesTags: ["User"],
    }),
    signUpUser: builder.mutation({
      query: (newUser) => ({
        url: "auth/register",
        method: "POST",
        body: newUser,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      providesTags: ["User"],
    }),
    forgotUserPassword: builder.mutation({
      query: (data) => ({
        url: "auth/forgot_password",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    resetUserPassword: builder.mutation({
      query: (data) => ({
        url: "auth/reset_password",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: "auth/update_password",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getToken()}`,
        },
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "auth/email_verification",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
  }),
});

export const {
  useUserLogoutQuery,
  useCurrentUserQuery,
  useSignUpUserMutation,
  useForgotUserPasswordMutation,
  useResetUserPasswordMutation,
  useUpdatePasswordMutation,
  useLoginUserMutation,
  useEmailVerificationMutation,
  useResendEmailVerificationQuery,
  useVerifyEmailMutation,
} = authApi;
