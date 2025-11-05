import React from "react";
import TextInput from "@/components/atoms/text-input/TextInput";
import SelectInput from "@/components/atoms/select-input/SelectInput";
import type { PackageFormProps } from "./PackageForm.types";

export const PackageForm: React.FC<PackageFormProps> = ({
  formData,
  onFormDataChange,
}) => {
  const categoryOptions = [
    { label: "Accommodation", value: "accommodation" },
    { label: "Dining", value: "dining" },
    { label: "Wellness", value: "wellness" },
    { label: "Events", value: "events" },
    { label: "Recreation", value: "recreation" },
    { label: "Business", value: "business" },
  ];

  const facilityOptions = [
    { label: "Main Hotel", value: "main_hotel" },
    { label: "Restaurant", value: "restaurant" },
    { label: "Gym & Fitness Center", value: "gym" },
    { label: "Swimming Pool", value: "swimming_pool" },
    { label: "Spa & Wellness", value: "spa" },
    { label: "Conference Hall", value: "conference_hall" },
    { label: "Bar & Lounge", value: "bar" },
  ];

  const durationOptions = [
    { label: "1 Day", value: "1_day" },
    { label: "3 Days", value: "3_days" },
    { label: "1 Week", value: "1_week" },
    { label: "2 Weeks", value: "2_weeks" },
    { label: "1 Month", value: "1_month" },
    { label: "3 Months", value: "3_months" },
    { label: "6 Months", value: "6_months" },
    { label: "1 Year", value: "1_year" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Package Name */}
      <TextInput
        id="packageName"
        label="Package Name"
        labelClassName="text-[13px] font-semibold text-text-primary"
        wrapperClassName="flex flex-col gap-2"
        inputClassName="w-full rounded-[8px] px-[16px] py-[11px] border-[1px] border-border bg-input-bg text-[14px] font-semibold outline-none focus:border-border-active"
        value={formData.packageName}
        onChange={(e) => onFormDataChange({ packageName: e.target.value })}
        placeholder="Enter package name"
      />

      {/* Package Category */}
      <SelectInput
        label="Package Category"
        name="packageCategory"
        labelClassName="text-[13px] font-semibold text-text-primary"
        fieldClassName="w-full rounded-[8px] px-[16px] py-[11px] border-[1px] border-border bg-input-bg text-[14px] font-semibold outline-none focus:border-border-active"
        choices={categoryOptions}
        value={formData.packageCategory}
        onChange={(e) => onFormDataChange({ packageCategory: e.target.value })}
        placeholder="Select category"
      />

      {/* Included Facility */}
      <SelectInput
        label="Included Facility"
        name="includedFacility"
        labelClassName="text-[13px] font-semibold text-text-primary"
        fieldClassName="w-full rounded-[8px] px-[16px] py-[11px] border-[1px] border-border bg-input-bg text-[14px] font-semibold outline-none focus:border-border-active"
        choices={facilityOptions}
        value={formData.includedFacility}
        onChange={(e) => onFormDataChange({ includedFacility: e.target.value })}
        placeholder="Select facility"
      />

      {/* Package Duration */}
      <SelectInput
        label="Package Duration"
        name="packageDuration"
        labelClassName="text-[13px] font-semibold text-text-primary"
        fieldClassName="w-full rounded-[8px] px-[16px] py-[11px] border-[1px] border-border bg-input-bg text-[14px] font-semibold outline-none focus:border-border-active"
        choices={durationOptions}
        value={formData.packageDuration}
        onChange={(e) => onFormDataChange({ packageDuration: e.target.value })}
        placeholder="Select duration"
      />

      {/* Pricing */}
      <TextInput
        id="pricing"
        label="Pricing"
        type="number"
        labelClassName="text-[13px] font-semibold text-text-primary"
        wrapperClassName="flex flex-col gap-2"
        inputClassName="w-full rounded-[8px] px-[16px] py-[11px] border-[1px] border-border bg-input-bg text-[14px] font-semibold outline-none focus:border-border-active"
        value={formData.pricing}
        onChange={(e) => onFormDataChange({ pricing: e.target.value })}
        placeholder="Enter pricing"
      />
    </div>
  );
};

export default PackageForm;
