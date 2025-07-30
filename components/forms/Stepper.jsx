"use client";
import React from "react";
import style from "./stepper.module.css";

function Stepper({ steps, currentStep }) {
  return (
    <div className={style.horizontal_stepper}>
      <div className={style.stepper_header}>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`${style.step} ${
              step.step === currentStep ? style.active : ""
            }`}
          >
            <span>{step.step}</span>
            <small className={style.step_web}>{step.label}</small>
            <small className={style.step_mob}>Step</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stepper;
