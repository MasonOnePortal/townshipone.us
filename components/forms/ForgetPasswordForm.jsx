"use client";
import React, { useState } from "react";
import style from "./auth.module.css";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaRegEnvelope } from "react-icons/fa6";

import { useForgotUserPasswordMutation } from "@/store/auth/authService";
import { isEmpty } from "lodash";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/navigation";

export const ForgetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [forgotUserPassword, { error, isSuccess }] =
    useForgotUserPasswordMutation();

  const schema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { data: resData } = await forgotUserPassword(data);
      if (resData.ok) {
        reset({});
        router.push("reset-link-message");
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={style.auth_sec_wrap}>
      <div className="container">
        {!isEmpty(error) && error.data.message ? (
          <ErrorMessage message={error.data.message} />
        ) : null}
        <div className={style.auth_inner_data}>
          <h2>Reset Your password</h2>
          <h5>
            Please enter your email address and we will send you a password
            password link.
          </h5>
          <form className={style.auth_form} onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p>Email Id</p>
              <div
                className={`input-group mb-3 ${
                  errors.email ? style.error : ""
                } `}
              >
                <span className={`${style["inpt_icon"]} input-group-text`}>
                  <FaRegEnvelope />
                </span>
                <input
                  type="text"
                  autoComplete="off"
                  className={`${style["auth_input"]} form-control`}
                  placeholder="Email Address"
                  {...register("email")}
                />
              </div>
              <div>
                {errors.email && (
                  <p className={style.textColor}>{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className={style.auth_btn}>
              <button
                type="submit"
                className="btn btn-secondary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" role="status">
                      <span className="visually-hidden"> Loading... </span>
                    </Spinner>
                    Loading...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
