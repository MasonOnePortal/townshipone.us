"use client";
import React, { useState } from "react";
import style from "@/components/user-profile/profile.module.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useFormData } from "@/context/FormContext";
import { FaArrowRight, FaArrowRightLong } from "react-icons/fa6";
import { useEffect } from "react";
import Input from "react-phone-number-input/input";

const validationSchema = Yup.object().shape({
  email: Yup.string().test({
    name: "email",
    test: function (value) {
      if (!!value) {
        return (
          Yup.string()
            .email("Invalid email")
            // .required("Email is required")
            .matches(
              /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
              "Invalid email format"
            )
            .max(255, "Email must be at most 255 characters")
        );
      }
      return true;
    },
  }),

  phone: Yup.string(),

  businessMode: Yup.string(),

  website: Yup.string(),

  instagram: Yup.string().test({
    name: "instagram",
    test: function (value) {
      if (!!value) {
        return Yup.string()
          .matches(
            /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
            "Invalid URL. Make sure it starts with http:// or https://"
          )
          .isValidSync(value);
      }
      return true;
    },
  }),

  facebook: Yup.string().test({
    name: "facebook",
    test: function (value) {
      if (!!value) {
        return Yup.string()
          .matches(
            /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
            "Invalid URL. Make sure it starts with http:// or https://"
          )
          .isValidSync(value);
      }
      return true;
    },
  }),

  youtube: Yup.string().test({
    name: "youtube",
    test: function (value) {
      if (!!value) {
        return Yup.string()
          .matches(
            /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
            "Invalid URL. Make sure it starts with http:// or https://"
          )
          .isValidSync(value);
      }
      return true;
    },
  }),
});

export const StepTwo = ({ formStep, nextFormStep }) => {
  const { setFormValues, data: infoData } = useFormData();
  const [selectedOption, setSelectedOption] = useState("Offline");
  const [showWebsiteInput, setShowWebsiteInput] = useState(false);
  const [eCommerceEnabled, setECommerceEnabled] = useState(false);
  const contactInfo = {
    website: "",
    email: "",
    businessMode: "Offline",
    phone: "",
    facebook: "",
    instagram: "",
    youtube: "",
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setShowWebsiteInput(
      event.target.value === "Online" || event.target.value === "Hybrid"
    );
  };
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: { eCommerceEnabled: false, ...contactInfo },
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    reset(infoData);
    setSelectedOption((preVal) => (preVal = infoData.businessMode));
    setShowWebsiteInput(
      infoData.businessMode === "Online" || infoData.businessMode === "Hybrid"
    );
  }, [infoData, reset]);

  const onSubmit = (data) => {
    const eCommerceEnabledValue = data.eCommerceEnabled ? "Yes" : "No";

    const mappedData = {
      ...data,
      eCommerceEnabled: eCommerceEnabledValue,
    };

    // Send the mapped data
    setFormValues(mappedData);
    nextFormStep();
  };
  const handleECommerceEnabledChange = (event) => {
    setECommerceEnabled(event.target.checked);
  };

  if (formStep !== 2) {
    return null;
  }
  return (
    <>
      <div className={style.wrpa_add_form_data}>
        <h2 className={style.item_heading_cl}>Contact Information</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form_wrap_products">
            <div className="row">
              <div className="col-lg-12">
                <div className="mb-3 business__mode ">
                  <label className="form-label custom_label">
                    Business Mode
                    {/* <span className="required-star">*</span> */}
                  </label>
                  <div className="row">
                    <div className="col-lg-4 col-4">
                      <div className="d-flex align-items-center radio_btn_wrap">
                        <label>
                          <input
                            type="radio"
                            value="Offline"
                            name="businessMode"
                            {...register("businessMode")}
                            onChange={handleOptionChange}
                          />
                          Offline
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-4 col-4">
                      <div className="d-flex align-items-center radio_btn_wrap">
                        <label>
                          <input
                            type="radio"
                            value="Online"
                            name="businessMode"
                            {...register("businessMode")}
                            onChange={handleOptionChange}
                          />
                          Online
                        </label>
                      </div>
                    </div>

                    <div className="col-lg-4 col-4">
                      <div className="d-flex align-items-center radio_btn_wrap">
                        <label>
                          <input
                            type="radio"
                            value="Hybrid"
                            name="businessMode"
                            {...register("businessMode")}
                            onChange={handleOptionChange}
                          />
                          Hybrid
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    {errors?.businessMode && (
                      <p className={style.textColor}>
                        {errors?.businessMode.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-12 mb-4">
                <div className="mb-3 business__mode ">
                  <label className="form-label custom_label">
                    Ecommerce Enable
                    {/* <span className="required-star">*</span> */}
                  </label>
                  <div className="d-flex align-items-center radio_btn_wrap">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        name="eCommerceEnabled"
                        {...register("eCommerceEnabled")}
                        onChange={handleECommerceEnabledChange}
                      />
                      <label
                        className="htmlForm-check-label"
                        htmlFor="flexSwitchCheckDefault"
                      >
                        {eCommerceEnabled ? "Yes" : "No"}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mb-3">
                  <label className="form-label custom_label">
                    Email Id
                    {/* <span className="required-star">*</span> */}
                  </label>
                  <div className={`  ${errors?.email ? style.error : ""} `}>
                    <input
                      type="email"
                      placeholder="Email"
                      className="form-control"
                      name="email"
                      {...register("email")}
                    />
                  </div>
                </div>
                <div>
                  {errors?.email && (
                    <p className={style.textColor}>{errors?.email.message}</p>
                  )}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mb-3">
                  <label className="form-label custom_label">
                    Contact No
                    {/* <span className="required-star">*</span> */}
                  </label>
                  <div className={`  ${errors?.phone ? style.error : ""} `}>
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
                  {errors?.phone && (
                    <p className={style.textColor}>{errors?.phone.message}</p>
                  )}
                </div>
              </div>
              <div className="col-lg-4">
                {showWebsiteInput && (
                  <>
                    <div className="mb-3">
                      <label className="form-label custom_label">
                        Website Url
                      </label>
                      <div
                        className={` ${errors?.website ? style.error : ""} `}
                      >
                        <input
                          type="text"
                          autoComplete="off"
                          placeholder="Website Name"
                          className="form-control"
                          name="website"
                          {...register("website")}
                        />
                      </div>
                      <small className="text-muted">
                        https://www.example.com
                      </small>
                    </div>
                    <div>
                      {errors?.website && (
                        <p className={style.textColor}>
                          {errors?.website.message}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
              <div className="col-lg-4">
                <div className="mb-3">
                  <label className="form-label custom_label">Facebook</label>
                  <div className={`  ${errors?.facebook ? style.error : ""} `}>
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="Facebook"
                      className="form-control"
                      name="facebook"
                      {...register("facebook")}
                    />
                  </div>
                  <small className="text-muted">
                    https://www.facebook.com/example
                  </small>
                </div>
                <div>
                  {errors?.facebook && (
                    <p className={style.textColor}>
                      {errors?.facebook.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mb-3">
                  <label className="form-label custom_label">Instagram</label>
                  <div className={`  ${errors?.instagram ? style.error : ""} `}>
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="Instagram"
                      className="form-control"
                      name="instagram"
                      {...register("instagram")}
                    />
                  </div>
                  <small className="text-muted">
                    https://www.instagram.com/example
                  </small>
                </div>
                <div>
                  {errors?.instagram && (
                    <p className={style.textColor}>
                      {errors?.instagram.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="mb-3">
                  <label className="form-label custom_label">Youtube</label>
                  <div className={`  ${errors?.youtube ? style.error : ""} `}>
                    <input
                      type="text"
                      autoComplete="off"
                      placeholder="Youtube"
                      className="form-control"
                      name="youtube"
                      {...register("youtube")}
                    />
                  </div>
                  <small className="text-muted">
                    https://www.youtube.com/example
                  </small>
                </div>
                <div>
                  {errors?.youtube && (
                    <p className={style.textColor}>{errors?.youtube.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={style.next_btn}>
            <button type="submit">
              Next <FaArrowRight />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
