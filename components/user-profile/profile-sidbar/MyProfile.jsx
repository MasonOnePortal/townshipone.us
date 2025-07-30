"use client";
import React, { useState } from "react";
import style from "@/components/forms/auth.module.css";
import styles from "@/components/user-profile/profile.module.css";

import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { Spinner } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import {
  useCurrentUserQuery,
  useSignUpUserMutation,
} from "@/store/auth/authService";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import { useUpdateUserMutation } from "@/store/user/userService";
import { useDispatch } from "react-redux";
import { updateCurrentUser } from "@/store/auth/authSlice";
import Input from "react-phone-number-input/input";

const signUpForm = {
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
};

const MyProfile = () => {
  const { data: updateuser, isLoading } = useCurrentUserQuery();
  const dispatch = useDispatch();
  const router = useRouter();
  const [signUpUser] = useSignUpUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [loading, setLoading] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Invalid email"),

    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    phone: Yup.string().required("Phone No. is required"),
  });
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: signUpForm,
  });

  useEffect(() => {
    if (!isEmpty(updateuser)) {
      reset(updateuser);
    }
  }, [updateuser, reset]);
  const onSubmit = async (data, e) => {
    setLoading(true);
    const updatedData = {
      ...data,
    };
    try {
      if (!isEmpty(updatedData.id)) {
        const { data: resData } = await updateUser(updatedData);
        dispatch(updateCurrentUser(updatedData));
        router.push(`profile-settings `);
        setLoading(false);
        if (resData) {
          console.log("");
        } else {
          toast.error("unable to updated ! ");
        }
      } else {
        const { data: resData } = await signUpUser(updatedData);

        if (!isEmpty(resData)) {
          toast.success("Successfully Register");
          reset({});
          router.push("/auth/login");
        } else {
          toast.error("Something went wrong");
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const backToProfile = () => {
    router.push(`/user-profile/ `);
  };
  return (
    <>
      <div className="container">
        <div className={style.wrpa_add_form_data}>
          <div
            className={`d-flex align-items-center justify-content-between ${styles.heading_wr_c} `}
          >
            <div className={style.profile_heading}>
              <h2> Update Your Profile</h2>
            </div>
          </div>
          <div className="row"></div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-lg-6  ">
                <div className="mb-3">
                  <label className="form-label">
                    First Name<span className="required-star">*</span>
                  </label>
                  <div className={`${errors.first_name ? style.error : ""} `}>
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="First Name"
                      name="first_name"
                      className="form-control"
                      {...register("first_name")}
                    />
                  </div>
                </div>
                <div>
                  {errors.first_name && (
                    <p className={style.textColor}>
                      {errors.first_name.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-lg-6  ">
                <div className="mb-3">
                  <label className="form-label">
                    Last Name<span className="required-star">*</span>
                  </label>
                  <div className={`${errors.last_name ? style.error : ""} `}>
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="Last Name"
                      name="last_name"
                      className="form-control"
                      {...register("last_name")}
                    />
                  </div>
                </div>
                <div>
                  {errors.last_name && (
                    <p className={style.textColor}>
                      {errors.last_name.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-lg-6  ">
                <div className="mb-3">
                  <label className="form-label">
                    Email<span className="required-star">*</span>
                  </label>
                  <div className={`${errors.email ? style.error : ""} `}>
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="Email"
                      name="email"
                      className="form-control"
                      {...register("email")}
                    />
                  </div>
                </div>
                <div>
                  {errors.email && (
                    <p className={style.textColor}>{errors.email.message}</p>
                  )}
                </div>
              </div>
              <div className="col-lg-6  ">
                <div className="mb-3">
                  <label className="form-label">
                    Contact No. <span className="required-star">*</span>
                  </label>
                  <div className={`${errors.phone ? style.error : ""} `}>
                    <Input
                      country="US"
                      name="phone"
                      autoComplete="off"
                      maxLength="14"
                      className={`form-control`}
                      placeholder="Contact No"
                      {...register("phone")}
                    />
                  </div>
                </div>
                <div>
                  {errors.phone && (
                    <p className={style.textColor}>{errors.phone.message}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <button type="submit">
                  {loading ? (
                    <>
                      <Spinner
                        animation="border"
                        size="sm"
                        qualifications="status"
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
              <div className="col-6 col-lg-3">
                <button onClick={backToProfile} type="submit">
                  Back
                </button>
              </div>
              <div className="col-8"></div>
            </div>
          </form>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
};

export default MyProfile;
