import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

function StepperBox({ step }) {
  const steps = ["سبد خرید", "ثبت مشخصات ", "تایید نهایی"];
  return (
    <div className="my-8">
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

export default StepperBox;
