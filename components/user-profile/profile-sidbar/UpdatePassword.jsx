"use client";
import React, { useState } from "react";
import style from "@/components/forms/auth.module.css";

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Spinner } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useUpdatePasswordMutation } from "@/store/auth/authService";
import { isEmpty } from "lodash";
import { FaUnlock } from "react-icons/fa6";
import { ErrorMessage } from "@/components/ErrorMessage";

const UpdatePassword = () => {
  const router = useRouter();
  const [updatePassword, { error }] = useUpdatePasswordMutation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [shownewPassword, setShownnewPassword] = useState(false);

  const schema = Yup.object().shape({
    password: Yup.string()
      .required("Current Password is required")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Current Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character."
      ),
    newPassword: Yup.string()
      .required("New Password is required")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "New Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character."
      ),
  });

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const updatedData = {
      currentPassword: data.password,
      newPassword: data.newPassword,
    };
    try {
      const { data: resData, error } = await updatePassword(updatedData);

      if (error) {
        console.error(" error:", error);
      } else if (resData) {
        router.push(`/user-profile/`);
        reset({});
        toast.success("Password updated successfully");
      }
    } catch (error) {
      console.error(" error:", error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const togglePasswordVisibilitynew = () => {
    setShownnewPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <div className="">
        {!isEmpty(error) && error.data.message ? (
          <ErrorMessage message={error.data.message} />
        ) : null}
        <div className={style.wrpa_add_form_data}>
          <div className={style.profile_heading}>
            <h5 className={style.hedding_psw}>Update Your Password</h5>
          </div>
          <div className={style.rst_psw_wrp}>
            <div className="row">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-md-12">
                  <p>Current Password</p>
                  <div
                    className={`input-group mb-3 ${style.border} ${
                      errors.password ? "border border-danger" : ""
                    }`}
                  >
                    <span className={`${style["inpt_icon"]} input-group-text`}>
                      <FaEye />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className={`${style["auth_input"]} form-control`}
                      placeholder="Current Password"
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
                      <p className={`${style.textColor} text-danger`}>
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-md-12">
                  <p>New Password</p>
                  <div
                    className={`input-group mb-3 ${style.border} ${
                      errors.newPassword ? "border border-danger" : ""
                    }`}
                  >
                    <span className={`${style["inpt_icon"]} input-group-text`}>
                      <FaUnlock />
                    </span>
                    <input
                      type={shownewPassword ? "text" : "password"}
                      className={`${style["auth_input"]} form-control`}
                      placeholder="New Password"
                      {...register("newPassword")}
                    />
                    <span className={`${style["inpt_icon"]} input-group-text`}>
                      {shownewPassword ? (
                        <FaEye onClick={togglePasswordVisibilitynew} />
                      ) : (
                        <FaEyeSlash onClick={togglePasswordVisibilitynew} />
                      )}
                    </span>
                  </div>
                  <div>
                    {errors.newPassword && (
                      <p className={`${style.textColor} text-danger`}>
                        {errors.newPassword.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <button type="submit" className="btn btn-primary">
                    {loading ? (
                      <>
                        <Spinner
                          animation="border"
                          size="sm"
                          qualification="status"
                        >
                          <span className="visually-hidden"> Loading... </span>
                        </Spinner>
                        Loading...
                      </>
                    ) : (
                      "Update"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
};

export default UpdatePassword;
