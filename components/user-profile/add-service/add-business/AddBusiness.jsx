"use client";
import React, { useState } from "react";
import { StepOne } from "./business-steps/StepOne";
import { StepTwo } from "./business-steps/StepTwo";
import { StepThree } from "./business-steps/StepThree";
import { StepFour } from "./business-steps/StepFour";
import { FormWrapper } from "./business-steps/FormWrapper";
import FormProvider from "@/context/FormContext";
function AddBusiness() {
  const [formStep, setFormStep] = useState(1);

  const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);

  const prevFormStep = () => {
    if (formStep === 1) return;
    setFormStep((currentStep) => currentStep - 1);
  };
  return (
    <>
      <FormProvider>
        <FormWrapper currentStep={formStep} prevFormStep={prevFormStep}>
          {formStep >= 1 && (
            <StepOne
              formStep={formStep}
              nextFormStep={nextFormStep}
              prevFormStep={prevFormStep}
            />
          )}
          {formStep >= 2 && (
            <StepTwo
              formStep={formStep}
              nextFormStep={nextFormStep}
              prevFormStep={prevFormStep}
            />
          )}
          {formStep >= 3 && (
            <StepThree
              formStep={formStep}
              nextFormStep={nextFormStep}
              prevFormStep={prevFormStep}
            />
          )}
          {formStep >= 4 && (
            <StepFour
              formStep={formStep}
              nextFormStep={nextFormStep}
              prevFormStep={prevFormStep}
            />
          )}
        </FormWrapper>
      </FormProvider>
    </>
  );
}

export default AddBusiness;
