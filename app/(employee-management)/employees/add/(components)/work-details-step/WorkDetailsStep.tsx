import React from "react";
import DateInput from "@/components/atoms/date-input/DateInput";
import StepHeader from "../step-header/StepHeader";
import type { WorkDetailsStepProps } from "./WorkDetailsStep.types";

export const WorkDetailsStep: React.FC<WorkDetailsStepProps> = ({
  formData,
  onFormDataChange,
  onBack,
}) => {
  const facilityOptions = [
    { label: "Main Hotel", value: "main_hotel" },
    { label: "Restaurant", value: "restaurant" },
    { label: "Gym & Fitness Center", value: "gym" },
    { label: "Swimming Pool", value: "swimming_pool" },
    { label: "Spa & Wellness", value: "spa" },
    { label: "Conference Hall", value: "conference_hall" },
    { label: "Bar & Lounge", value: "bar" },
    { label: "Kitchen", value: "kitchen" },
  ];

  const handleFacilityToggle = (value: string) => {
    const currentAccess = formData.facilityAccess || [];
    const newAccess = currentAccess.includes(value)
      ? currentAccess.filter((item) => item !== value)
      : [...currentAccess, value];

    onFormDataChange({ facilityAccess: newAccess });
  };

  return (
    <div className="flex flex-col gap-8 px-10 py-5">
      {/* Step Header - 20% width */}
      <StepHeader
        title="Work Details"
        description="Enter the work-related information for the employee"
        onBack={onBack}
      />

      {/* Form - 50% width on md screens */}
      <div className="w-full md:w-[50%] flex flex-col gap-6">
        {/* Row 1: Joining Date and Contract End Date */}
        <div className="grid grid-cols-2 gap-4">
          <DateInput
            id="joiningDate"
            label="Joining Date"
            fieldClassName="w-full rounded-[8px] px-[16px] py-[11px] border-[1px] border-border bg-input-bg text-[14px] font-semibold outline-none focus:border-border-active"
            labelClassName="text-[13px] font-semibold text-text-primary"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={(e) => onFormDataChange({ joiningDate: e.target.value })}
          />

          <DateInput
            id="contractEndDate"
            label="Contract End Date"
            fieldClassName="w-full rounded-[8px] px-[16px] py-[11px] border-[1px] border-border bg-input-bg text-[14px] font-semibold outline-none focus:border-border-active"
            labelClassName="text-[13px] font-semibold text-text-primary"
            name="contractEndDate"
            value={formData.contractEndDate}
            onChange={(e) =>
              onFormDataChange({ contractEndDate: e.target.value })
            }
          />
        </div>

        {/* Row 2: Facility Access - Full Width */}
        <div className="w-full flex flex-col gap-2">
          <label className="text-[13px] font-semibold text-text-primary">
            Facility Access
            <span className="text-text-secondary font-normal ml-1">
              (You can select more than one if applicable)
            </span>
          </label>

          {/* Facility Options Grid */}
          <div className="grid grid-cols-2 gap-3">
            {facilityOptions.map((facility) => (
              <button
                key={facility.value}
                type="button"
                onClick={() => handleFacilityToggle(facility.value)}
                className={`
                  w-full rounded-[8px] px-[16px] py-[11px] border-[1px] 
                  text-[14px] font-semibold text-left
                  transition-all duration-200
                  ${
                    formData.facilityAccess?.includes(facility.value)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-input-bg text-text-primary hover:border-border-active"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  {/* Checkbox */}
                  <div
                    className={`
                      w-5 h-5 rounded border-[1.5px] flex items-center justify-center
                      ${
                        formData.facilityAccess?.includes(facility.value)
                          ? "border-primary bg-primary"
                          : "border-border bg-white"
                      }
                    `}
                  >
                    {formData.facilityAccess?.includes(facility.value) && (
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 5L4.5 8.5L11 1"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span>{facility.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkDetailsStep;
