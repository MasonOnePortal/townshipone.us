"use client";
import React, { useEffect, useState } from "react";
import style from "./auth.module.css";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import { FaEnvelope, FaPhone, FaRegUser, FaUnlock } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Spinner } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useSignUpUserMutation } from "@/store/auth/authService";
import { isEmpty } from "lodash";

import { useGetPlanDetailQuery } from "@/store/Plan/PlanService";
import { ErrorMessage } from "../ErrorMessage";
import { VerifyEmailModal } from "../modals/VerifyEmailModal";
import { signUpForm, schema } from "./auth-validation";
import { removeSessionToken, setSessionToken } from "@/utils/token";
import Input from "react-phone-number-input/input";
import { InfoMessage } from "../messages/InfoMessage";
const SignupForm = () => {
  const [signUpUser, { data: userData, error, isSuccess: userCreated }] =
    useSignUpUserMutation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const params = useParams();
  const { planId } = params;
  useEffect(() => {
    removeSessionToken();
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: signUpForm,
  });

  const onSubmit = async (data, e) => {
    setLoading(true);

    const { confirmPassword, ...rest } = data;
    const updatedData = {
      ...rest,
      selectedPlan: planId,
    };
    try {
      const { data: resData, error: errData } = await signUpUser(updatedData);
      if (errData) {
        throw new Error(errData.data.message);
      }
      if (!isEmpty(resData)) {
        setSessionToken(resData.api_token);
        reset({});
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((preShowConfirmPassword) => !preShowConfirmPassword);
  };

  return (
    <>
      <div className={style.auth_sec_wrap}>
        <div className="container">
          {!isEmpty(error) && error.data.message ? (
            <ErrorMessage message={error.data.message} />
          ) : null}
          <div className={`${style.signup_wrap} ${style.auth_inner_datas}`}>
            <InfoMessage />
          </div>
          <div className={`${style.signup_wrap} ${style.auth_inner_data}`}>
            <h2>Create an account</h2>
            <h5>Setup a new account in a minute.</h5>
            <form className={style.auth_form} onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-6">
                  <p>
                    First Name<span className="required-star">*</span>
                  </p>
                  <div
                    className={`input-group mb-3 ${
                      errors.first_name ? style.error : ""
                    } `}
                  >
                    <span className={`${style["inpt_icon"]} input-group-text`}>
                      <FaRegUser />
                    </span>
                    <input
                      type="text"
                      autoComplete="off"
                      name="first_name"
                      className={`${style["auth_input"]} form-control`}
                      placeholder="First Name"
                      {...register("first_name")}
                    />
                  </div>
                  <div>
                    {errors.first_name && (
                      <p className={style.textColor}>
                        {errors.first_name.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <p>
                    Last Name<span className="required-star">*</span>
                  </p>
                  <div
                    className={`input-group mb-3 ${
                      errors.last_name ? style.error : ""
                    } `}
                  >
                    <span className={`${style["inpt_icon"]} input-group-text`}>
                      <FaRegUser />
                    </span>
                    <input
                      type="text"
                      autoComplete="off"
                      name="last_name"
                      className={`${style["auth_input"]} form-control`}
                      placeholder="Last Name"
                      {...register("last_name")}
                    />
                  </div>
                  <div>
                    {errors.last_name && (
                      <p className={style.textColor}>
                        {errors.last_name.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <p>
                    Contact No<span className="required-star">*</span>
                  </p>
                  <div
                    className={`input-group mb-3 ${
                      errors.phone ? style.error : ""
                    } `}
                  >
                    <span className={`${style["inpt_icon"]} input-group-text`}>
                      <FaPhone />
                    </span>
                    <Input
                      country="US"
                      name="phone"
                      autoComplete="off"
                      maxLength="14"
                      className={`${style["auth_input"]} form-control`}
                      placeholder="Contact No"
                      {...register("phone")}
                    />
                  </div>
                  <div>
                    {errors.phone && (
                      <p className={style.textColor}>{errors.phone.message}</p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <p>
                    Email Id <span className="required-star">*</span>
                  </p>
                  <div
                    className={`input-group mb-3 ${
                      errors.email ? style.error : ""
                    } `}
                  >
                    <span className={`${style["inpt_icon"]} input-group-text`}>
                      <FaEnvelope />
                    </span>
                    <input
                      type="text"
                      autoComplete="off"
                      name="email"
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
                <div className="col-md-6">
                  <p>
                    Password<span className="required-star">*</span>
                  </p>
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
                      placeholder="Password"
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
                      <p className={style.textColor}>
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <p>
                    Confirm Password<span className="required-star">*</span>
                  </p>
                  <div
                    className={`input-group mb-3 ${
                      errors.confirmPassword ? style.error : ""
                    } `}
                  >
                    <span className={`${style["inpt_icon"]} input-group-text`}>
                      <FaUnlock />
                    </span>
                    <input
                      autoComplete="off"
                      type={showConfirmPassword ? "text" : "password"}
                      className={`${style["auth_input"]} form-control`}
                      placeholder="Confirm Password"
                      {...register("confirmPassword")}
                    />
                    <span className={`${style["inpt_icon"]} input-group-text`}>
                      {showConfirmPassword ? (
                        <FaEye onClick={toggleConfirmPasswordVisibility} />
                      ) : (
                        <FaEyeSlash onClick={toggleConfirmPasswordVisibility} />
                      )}
                    </span>
                  </div>
                  <div>
                    {errors.confirmPassword && (
                      <p className={style.textColor}>
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
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
                    "Register"
                  )}
                </button>
              </div>
              <div className={style.login_with_social}></div>
              <div className={style.register_here}>
                <p>
                  Already have an account?{" "}
                  <Link href="/auth/login" className="alink">
                    Login here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      {userCreated && !isEmpty(userData) ? (
        <VerifyEmailModal show={true} userEmail={userData.email} />
      ) : null}
      <Toaster position="bottom-right" />
    </>
  );
};
export default SignupForm;
