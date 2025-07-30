"use client";
import React from "react";
import style from "@/components/user-profile/profile.module.css";
import { FaArrowLeft, FaArrowLeftLong } from "react-icons/fa6";
import Stepper from "@/components/forms/Stepper";
export const FormWrapper = ({ children, currentStep, prevFormStep }) => {
  const steps = [
    {
      step: 1,
      label: "Service Information",
    },
    {
      step: 2,
      label: "Contact Information",
    },
    {
      step: 3,
      label: "Additional Information",
    },
    {
      step: 4,
      label: "Image and Video",
    },
  ];

  return (
    <div className={style.frm_wrapper_cl}>
      <div className={style.profile_heading}>
        <div
          className={`d-flex align-items-center justify-content-between ${style.heading_wr_c} `}
        >
          <h1> Add Business</h1>
        </div>
      </div>

      <Stepper steps={steps} currentStep={currentStep} />
      {children}
      {currentStep <= 4 && (
        <>
          {currentStep > 1 && (
            <div className={style.back_btn_cl}>
              <button
                className="btn btn-secondary me-2"
                onClick={prevFormStep}
                type="button"
              >
                <FaArrowLeft /> back
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
