import React from "react";
import TextInput from "@/components/atoms/text-input/TextInput";
import SelectInput from "@/components/atoms/select-input/SelectInput";
import StepHeader from "../step-header/StepHeader";
import type { ContactAddressStepProps } from "./ContactAddressStep.types";

export const ContactAddressStep: React.FC<ContactAddressStepProps> = ({
  formData,
  onFormDataChange,
  onBack,
}) => {
  const nationalityOptions = [
    { label: "Rwandan", value: "rwandan" },
    { label: "Kenyan", value: "kenyan" },
    { label: "Ugandan", value: "ugandan" },
    { label: "Tanzanian", value: "tanzanian" },
    { label: "Burundian", value: "burundian" },
    { label: "Other", value: "other" },
  ];

  return (
    <div className="flex flex-col gap-8 px-10 py-5">
      {/* Step Header - 20% width */}
      <StepHeader
        title="Contact & Address"
        description="Enter their contact and address information for easy communication and record keeping."
        onBack={onBack}
      />

      {/* Form - 50% width on md screens */}
      <div className="w-full md:w-[50%] flex flex-col gap-6">
        {/* Row 1: Phone Number and Nationality */}
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            id="phoneNumber"
            label="Phone Number"
            type="tel"
            labelClassName="text-[13px] font-semibold text-text-primary"
            wrapperClassName="flex flex-col gap-2"
            inputClassName="w-full rounded-[8px] px-[16px] py-[11px] border-[1px] border-border bg-input-bg text-[14px] font-semibold outline-none focus:border-border-active"
            value={formData.phoneNumber}
            onChange={(e) => onFormDataChange({ phoneNumber: e.target.value })}
            placeholder="Enter phone number"
          />

          <SelectInput
            label="Nationality"
            name="nationality"
            labelClassName="text-[13px] font-semibold text-text-primary"
            fieldClassName="w-full rounded-[8px] px-[16px] py-[11px] border-[1px] border-border bg-input-bg text-[14px] font-semibold outline-none focus:border-border-active"
            choices={nationalityOptions}
            value={formData.nationality}
            onChange={(e) => onFormDataChange({ nationality: e.target.value })}
            placeholder="Select nationality"
          />
        </div>

        {/* Row 2: Residence Address */}
        <div className="w-full">
          <TextInput
            id="residenceAddress"
            label="Residence Address"
            labelClassName="text-[13px] font-semibold text-text-primary"
            wrapperClassName="flex flex-col gap-2"
            inputClassName="w-full rounded-[8px] px-[16px] py-[11px] border-[1px] border-border bg-input-bg text-[14px] font-semibold outline-none focus:border-border-active"
            value={formData.residenceAddress}
            onChange={(e) =>
              onFormDataChange({ residenceAddress: e.target.value })
            }
            placeholder="Enter residence address"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactAddressStep;
