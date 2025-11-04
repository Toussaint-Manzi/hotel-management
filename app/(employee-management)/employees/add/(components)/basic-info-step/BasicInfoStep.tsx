import React from "react";
import { IconWrapper } from "@/components/atoms/icon-wrapper/IconWrapper";
import TextInput from "@/components/atoms/text-input/TextInput";
import DateInput from "@/components/atoms/date-input/DateInput";
import SelectInput from "@/components/atoms/select-input/SelectInput";
import PasswordInput from "@/components/atoms/password-input/PasswordInput";
import StepHeader from "../step-header/StepHeader";
import type { BasicInfoStepProps } from "./BasicInfoStep.types";

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  formData,
  onFormDataChange,
  onBack,
}) => {
  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const positionOptions = [
    { label: "Manager", value: "manager" },
    { label: "Receptionist", value: "receptionist" },
    { label: "Housekeeper", value: "housekeeper" },
    { label: "Chef", value: "chef" },
    { label: "Waiter", value: "waiter" },
  ];

  return (
    <div className="flex flex-col gap-8 px-10 py-5">
      {/* Step Header - 20% width */}
      <StepHeader
        title="Basic Info"
        description="Enter the basic information for the employee"
        onBack={onBack}
      />

      {/* Form - 50% width on md screens */}
      <div className="w-full md:w-[50%] flex flex-col gap-6">
        {/* Row 1: Profile Photo */}
        <div className="flex items-center gap-4">
          {/* Profile Photo Circle */}
          <div className="h-[72px] w-[72px] rounded-full bg-[#f6f6f6] flex items-center justify-center">
            <IconWrapper
              iconName="photo"
              size={40}
              className="text-text-secondary"
            />
          </div>

          {/* Text Section */}
          <div className="flex flex-col gap-1">
            <p className="text-[16px] text-text-primary font-semibold">
              Profile photo
            </p>
            <p className="text-[14px] text-text-secondary font-medium">
              Upload a profile photo for the employee
            </p>
          </div>
        </div>

        {/* Row 2: First Name and Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            id="firstName"
            label="First Name"
            labelClassName="text-[13px] font-semibold text-text-primary"
            wrapperClassName="flex flex-col gap-2"
            inputClassName="w-full rounded-[8px] px-[16px] py-[11px] border-[1px] border-border bg-input-bg text-[14px] font-semibold outline-none focus:border-border-active"
            value={formData.firstName}
            onChange={(e) => onFormDataChange({ firstName: e.target.value })}
            placeholder="Enter first name"
          />

          <TextInput
            id="lastName"
            label="Last Name"
            labelClassName="text-[13px] font-semibold text-text-primary"
            wrapperClassName="flex flex-col gap-2"
            inputClassName="w-full rounded-[8px] px-[16px] py-[11px] border-[1px] border-border bg-input-bg text-[14px] font-semibold outline-none focus:border-border-active"
            value={formData.lastName}
            onChange={(e) => onFormDataChange({ lastName: e.target.value })}
            placeholder="Enter last name"
          />
        </div>

        {/* Row 3: Date of Birth and Gender */}
        <div className="grid grid-cols-2 gap-4">
          <DateInput
            id="dateOfBirth"
            label="Date of Birth"
            fieldClassName="w-full rounded-[8px] px-[16px] py-[11px] border-[1px] border-border bg-input-bg text-[14px] font-semibold outline-none focus:border-border-active"
            labelClassName="text-[13px] font-semibold text-text-primary"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={(e) => onFormDataChange({ dateOfBirth: e.target.value })}
          />

          <SelectInput
            label="Gender"
            labelClassName="text-[13px] font-semibold text-text-primary"
            fieldClassName="w-full rounded-[8px] px-[16px] py-[11px] border-[1px] border-border bg-input-bg text-[14px] font-semibold outline-none focus:border-border-active"
            name="gender"
            choices={genderOptions}
            value={formData.gender}
            onChange={(e) => onFormDataChange({ gender: e.target.value })}
            placeholder="Select gender"
          />
        </div>

        {/* Row 4: Email Address and Password */}
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            id="email"
            label="Email Address"
            type="email"
            labelClassName="text-[13px] font-semibold text-text-primary"
            wrapperClassName="flex flex-col gap-2"
            inputClassName="w-full rounded-[8px] px-[16px] py-[11px] border-[1px] border-border bg-input-bg text-[14px] font-semibold outline-none focus:border-border-active"
            value={formData.email}
            onChange={(e) => onFormDataChange({ email: e.target.value })}
            placeholder="Enter email address"
          />

          <PasswordInput
            id="password"
            label="Password"
            labelClassName="text-[13px] font-semibold text-text-primary"
            wrapperClassName="flex flex-col gap-2"
            inputClassName="w-full rounded-[8px] px-[16px] py-[11px] border-[1px] border-border bg-input-bg text-[14px] font-semibold outline-none focus:border-border-active"
            value={formData.password}
            onChange={(e) => onFormDataChange({ password: e.target.value })}
            placeholder="Enter password"
          />
        </div>

        {/* Row 5: Position */}
        <div className="w-full">
          <SelectInput
            label="Position"
            name="position"
            labelClassName="text-[13px] font-semibold text-text-primary"
            fieldClassName="w-full rounded-[8px] px-[16px] py-[11px] border-[1px] border-border bg-input-bg text-[14px] font-semibold outline-none focus:border-border-active"
            choices={positionOptions}
            value={formData.position}
            onChange={(e) => onFormDataChange({ position: e.target.value })}
            placeholder="Select position"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoStep;
