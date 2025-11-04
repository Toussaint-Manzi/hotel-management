import React from "react";
import { IconWrapper } from "@/components/atoms/icon-wrapper/IconWrapper";
import type {
  AddEmployeeHeaderProps,
  Step,
  StepStatus,
} from "./AddEmployeeHeader.types";

export const AddEmployeeHeader: React.FC<AddEmployeeHeaderProps> = ({
  currentStep,
  onClose,
  onNextStep,
}) => {
  const steps: Step[] = [
    {
      id: 1,
      title: "Basic Info",
      status:
        currentStep === 1
          ? "CURRENT"
          : currentStep > 1
          ? "COMPLETED"
          : "NOT YET DONE",
    },
    {
      id: 2,
      title: "Contact & Address",
      status:
        currentStep === 2
          ? "CURRENT"
          : currentStep > 2
          ? "COMPLETED"
          : "NOT YET DONE",
    },
    {
      id: 3,
      title: "Work Details",
      status:
        currentStep === 3
          ? "CURRENT"
          : currentStep > 3
          ? "COMPLETED"
          : "NOT YET DONE",
    },
    {
      id: 4,
      title: "Schedule & Availability",
      status:
        currentStep === 4
          ? "CURRENT"
          : currentStep > 4
          ? "COMPLETED"
          : "NOT YET DONE",
    },
  ];

  const getNextStepTitle = () => {
    if (currentStep < 4) {
      return steps[currentStep].title;
    }
    return "Complete";
  };

  const getStatusColor = (status: StepStatus) => {
    if (status === "COMPLETED") return "text-[#159947]";
    return "text-text-secondary";
  };

  return (
    <header className="h-[70px] w-full border-b border-border flex items-center">
      {/* Close Icon */}
      <div
        className="w-[68px] h-full flex items-center justify-center cursor-pointer hover:bg-gray-50 border-r border-border"
        onClick={onClose}
      >
        <IconWrapper
          iconName="cancel"
          size={24}
          className="text-text-primary"
        />
      </div>

      {/* Steps Container */}
      <div className="flex-1 flex h-full">
        {/* Step Divs */}
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex-1 h-full flex items-center justify-between px-4 border-r border-border relative ${
              step.status === "CURRENT" ? "border-b-2 border-b-primary" : ""
            }`}
          >
            <div className="flex flex-col justify-center">
              <p
                className={`text-[10px] font-bold ${getStatusColor(
                  step.status
                )}`}
              >
                {step.status}
              </p>
              <p className="text-[14px] font-bold text-text-primary mt-1">
                {step.id}. {step.title}
              </p>
            </div>

            {/* Checkmark Icon - only shown when completed */}
            {step.status === "COMPLETED" && (
              <div className="absolute right-4">
                <IconWrapper
                  iconName="check"
                  size={20}
                  className="text-[#159947]"
                />
              </div>
            )}
          </div>
        ))}

        {/* Next Step Div */}
        <button
          onClick={onNextStep}
          className="flex-1 h-full flex items-center justify-between px-4 bg-primary relative cursor-pointer hover:bg-primary/90 transition-colors"
        >
          <div className="flex flex-col items-start justify-start">
            <p className="text-[10px] font-bold text-[#dbdada]">
              NEXT STEP {currentStep}/4
            </p>
            <p className="text-[14px] font-bold text-white mt-1">
              {getNextStepTitle()}
            </p>
          </div>

          {/* Forward Arrow Icon */}
          <div className="absolute right-4">
            <IconWrapper
              iconName="arrow-right"
              size={20}
              className="text-white"
            />
          </div>
        </button>
      </div>
    </header>
  );
};

export default AddEmployeeHeader;
