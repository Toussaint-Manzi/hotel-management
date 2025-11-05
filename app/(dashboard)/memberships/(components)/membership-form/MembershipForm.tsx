import React from "react";
import TextInput from "@/components/atoms/text-input/TextInput";
import SelectInput from "@/components/atoms/select-input/SelectInput";
import DateInput from "@/components/atoms/date-input/DateInput";
import Label from "@/components/atoms/label/Label";
import { IconWrapper } from "@/components/atoms/icon-wrapper/IconWrapper";
import type { MembershipFormProps } from "./MembershipForm.types";

export const MembershipForm: React.FC<MembershipFormProps> = ({
  formData,
  onFormDataChange,
}) => {
  const packageOptions = [
    { label: "Basic Package", value: "basic" },
    { label: "Standard Package", value: "standard" },
    { label: "Premium Package", value: "premium" },
    { label: "VIP Package", value: "vip" },
    { label: "Corporate Package", value: "corporate" },
    { label: "Family Package", value: "family" },
  ];

  const generateUniqueId = () => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const uniqueId = `MB-${randomNumber}`;
    onFormDataChange({ uniqueId });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Full Name */}
      <TextInput
        id="fullName"
        label="Full Name"
        labelClassName="text-[13px] font-semibold text-text-primary"
        wrapperClassName="flex flex-col gap-2"
        inputClassName="w-full rounded-[8px] px-[16px] py-[11px] border-[1px] border-border bg-input-bg text-[14px] font-semibold outline-none focus:border-border-active"
        value={formData.fullName}
        onChange={(e) => onFormDataChange({ fullName: e.target.value })}
        placeholder="Enter full name"
      />

      {/* Phone Number */}
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

      {/* Email Address */}
      <TextInput
        id="emailAddress"
        label="Email Address"
        type="email"
        labelClassName="text-[13px] font-semibold text-text-primary"
        wrapperClassName="flex flex-col gap-2"
        inputClassName="w-full rounded-[8px] px-[16px] py-[11px] border-[1px] border-border bg-input-bg text-[14px] font-semibold outline-none focus:border-border-active"
        value={formData.emailAddress}
        onChange={(e) => onFormDataChange({ emailAddress: e.target.value })}
        placeholder="Enter email address"
      />

      {/* Assigned Package */}
      <SelectInput
        label="Assigned Package"
        name="assignedPackage"
        labelClassName="text-[13px] font-semibold text-text-primary"
        fieldClassName="w-full rounded-[8px] px-[16px] py-[11px] border-[1px] border-border bg-input-bg text-[14px] font-semibold outline-none focus:border-border-active"
        choices={packageOptions}
        value={formData.assignedPackage}
        onChange={(e) => onFormDataChange({ assignedPackage: e.target.value })}
        placeholder="Select package"
      />

      {/* Membership Start Date */}
      <DateInput
        id="membershipStartDate"
        label="Membership Start Date"
        fieldClassName="w-full rounded-[8px] px-[16px] py-[11px] border-[1px] border-border bg-input-bg text-[14px] font-semibold outline-none focus:border-border-active"
        labelClassName="text-[13px] font-semibold text-text-primary"
        name="membershipStartDate"
        value={formData.membershipStartDate}
        onChange={(e) =>
          onFormDataChange({ membershipStartDate: e.target.value })
        }
      />

      {/* Unique ID with Generate Button */}
      <div className="flex flex-col gap-2">
        <Label className="text-[13px] font-semibold text-text-primary">
          Unique ID
        </Label>
        <div className="relative">
          <input
            id="uniqueId"
            type="text"
            value={formData.uniqueId}
            onChange={(e) => onFormDataChange({ uniqueId: e.target.value })}
            className="w-full rounded-[8px] px-[16px] py-[11px] pr-[140px] border-[1px] border-border bg-input-bg text-[14px] font-semibold outline-none focus:border-border-active"
            placeholder="MB-000000"
            readOnly
          />
          <button
            type="button"
            onClick={generateUniqueId}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-[14px] font-semibold text-primary hover:opacity-80 transition-opacity"
          >
            <IconWrapper
              iconName="refresh"
              size={18}
              className="text-primary"
            />
            <span>Generate</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembershipForm;
