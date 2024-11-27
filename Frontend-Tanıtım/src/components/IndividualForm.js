import React, { useState } from "react";
import "../styles/HighSchoolForm.css";
import bilkentLogo from "../assets/bilkent-logo.png";

function IndividualForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    "Collect the student’s contact details",
    "Provide the date and time",
    "Specify the department and number of attendees",
    "Review and submit",
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="highschool-form-container">
      <img src={bilkentLogo} alt="Bilkent Logo" className="bilkent-logo" />
      <h1 className="highschool-form-header">
        Individual Multi-Step Form for Campus Visits
      </h1>
      <div className="stepper-container">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`step ${index + 1 <= currentStep ? "completed" : ""}`}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className="step-description">{steps[currentStep - 1]}</div>
      <div className="step-content">
        <p>Step {currentStep} Content: {steps[currentStep - 1]}</p>
      </div>
      <div className="navigation-buttons">
        <button onClick={handleBack} disabled={currentStep === 1}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentStep === steps.length}>
          Next
        </button>
      </div>
    </div>
  );
}

export default IndividualForm;
