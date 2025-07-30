"use client";
import React, { useState } from "react";
import style from "./auth.module.css";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaUnlock } from "react-icons/fa6";
import { useRouter, useSearchParams } from "next/navigation";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useResetUserPasswordMutation } from "@/store/auth/authService";
import { ErrorMessage } from "@/components/ErrorMessage";
import { isEmpty } from "lodash";
import { Spinner } from "react-bootstrap";

const schema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character."
    ),
});
export const ResetPasswordForm = () => {
  const [resetUserPassword, { error }] = useResetUserPasswordMutation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const token = searchParams.get("token");
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
    const updatePasswordData = {
      ...data,
      userId: userId,
      token: token,
    };
    try {
      const { data: resData } = await resetUserPassword(updatePasswordData);
      if (resData.ok) {
        reset({});
        router.push("/auth/password-updated-message");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className={style.auth_sec_wrap}>
      <div className="container">
        {!isEmpty(error) && error.data.message ? (
          <ErrorMessage message={error.data.message} />
        ) : null}
        <div className={style.auth_inner_data}>
          <h2>Update Your password</h2>
          <h5>Create your new password</h5>
          <form className={style.auth_form} onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p>New Password</p>
              <div
                className={`input-group mb-3 ${
                  errors.password ? style.error : ""
                } `}
              >
                <span className={`${style["inpt_icon"]} input-group-text`}>
                  <FaUnlock />
                </span>
                <input
                  autoComplete="off"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={`${style["auth_input"]} form-control`}
                  placeholder="Enter Your New Password"
                  {...register("password")}
                />
                <span className={`${style["inpt_icon"]} input-group-text`}>
                  {showPassword ? (
                    <FaEye onClick={togglePasswordVisibility} />
                  ) : (
                    <FaEyeSlash onClick={togglePasswordVisibility} />
                  )}
                </span>
              </div>
              <div>
                {errors.password && (
                  <p className={style.textColor}>{errors.password.message}</p>
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
                  "Update Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
