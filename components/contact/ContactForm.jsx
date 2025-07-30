"use client";
import React, { useState } from "react";
import style from "./contact.module.css";
import { FaArrowRightLong } from "react-icons/fa6";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddNewInquiryMutation } from "@/store/common api/commonService";
import { Spinner } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import Select from "react-select";
import { isEmpty } from "lodash";
import {
  contactSchema,
  subjectOption,
  inquiryForm,
} from "./contact-form-validation";
import Input from "react-phone-number-input/input";

function ContactForm() {
  const [addNewInquiry] = useAddNewInquiryMutation();
  const [showOthersInput, setShowOthersInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues: inquiryForm,
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { data: resData } = await addNewInquiry(data);
      if (!isEmpty(resData) && resData.ok) {
        reset({});
        toast.success("form submitted !");
      }
    } catch (error) {
      console.error(" error:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSubjectChange = (selectedOption) => {
    const selectedValue = selectedOption ? selectedOption.value : null;
    setShowOthersInput(selectedValue === "Others");
  };
  return (
    <>
      <div className={style.contact_form_wrap}>
        <form className={style.auth_form} onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="col-form-label custom_label">
                  First Name <span className="required-star">*</span>
                </label>

                <input
                  type="text"
                  autoComplete="off"
                  name="first_name"
                  className={`form-control ${
                    errors.first_name ? style.error : ""
                  } `}
                  placeholder="Enter First Name"
                  {...register("first_name")}
                />
                <div>
                  {errors.first_name && (
                    <p className={style.textColor}>
                      {errors.first_name.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="col-form-label custom_label">
                  Last Name<span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  name="last_name"
                  className={`form-control ${
                    errors.last_name ? style.error : ""
                  } `}
                  placeholder="Enter Last Name"
                  {...register("last_name")}
                />
                <div>
                  {errors.last_name && (
                    <p className={style.textColor}>
                      {errors.last_name.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="col-form-label custom_label">
                  Phone Number<span className="required-star">*</span>
                </label>
                <Input
                  country="US"
                  autoComplete="off"
                  maxLength="14"
                  className={`form-control ${errors.phone ? style.error : ""} `}
                  placeholder="Enter Phone Number"
                  {...register("phone")}
                />

                <div>
                  {errors.phone && (
                    <p className={style.textColor}>{errors.phone.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label className="col-form-label custom_label">
                  Email<span className="required-star">*</span>
                </label>
                <input
                  type="email"
                  autoComplete="off"
                  name="email"
                  className={`form-control ${errors.email ? style.error : ""} `}
                  placeholder="Enter Email "
                  {...register("email")}
                />
                <div>
                  {errors.email && (
                    <p className={style.textColor}>{errors.email.message}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="col-form-label custom_label">
                  Business Name (Optional)
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  name="business_name"
                  className={`form-control `}
                  placeholder="Enter Business Name"
                  {...register("business_name")}
                />
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <div className="mb-3">
                <label className="form-label pb-2 custom_label">
                  Subject<span className="required-star">*</span>
                </label>
                <div className={` ${errors.subject ? "error" : ""}`}>
            
                  <Controller
                    name="subject"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={subjectOption.find(
                          (option) => option.value === field.value
                        )}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption.value);
                          handleSubjectChange(selectedOption);
                        }}
                        options={subjectOption}
                      />
                    )}
                  />
                </div>
                <div>
                  {errors.subject && (
                    <p className={`pt-2 ${style.textColor}`}>
                      {errors.subject.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {showOthersInput && (
              <div className="col-md-12">
                <div className="form-group">
                  <label className="col-form-label custom_label">Others</label>
                  <input
                    type="text"
                    autoComplete="off"
                    name="others"
                    className="form-control"
                    placeholder="Others"
                    {...register("others")}
                  />
                </div>
              </div>
            )}
            <div className="col-md-12">
              <div className="form-group">
                <label className="col-form-label custom_label">
                  Message<span className="required-star">*</span>
                </label>
                <textarea
                  className={`form-control ${
                    errors.message ? style.error : ""
                  } `}
                  rows="4"
                  {...register("message")}
                  placeholder="Type Message"
                ></textarea>
                <div>
                  {errors.message && (
                    <p className={style.textColor}>{errors.message.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className={style.auth_btn}>
                <button
                  type="submit"
                  className="btn btn-primary"
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
                    <div>
                      Send Message <FaArrowRightLong />
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
}

export default ContactForm;
