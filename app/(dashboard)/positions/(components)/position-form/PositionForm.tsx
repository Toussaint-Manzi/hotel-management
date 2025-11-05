import React from "react";
import TextInput from "@/components/atoms/text-input/TextInput";
import GroupSelectInput from "@/components/atoms/group-select-input/GroupSelectInput";
import type { PositionFormProps } from "./PositionForm.types";
import TextAreaInput from "@/components/atoms/text-area-input/TextAreaInput";

export const PositionForm: React.FC<PositionFormProps> = ({
  formData,
  onFormDataChange,
}) => {
  const groupOptions = [
    { label: "Management", value: "management" },
    { label: "Reception", value: "reception" },
    { label: "Housekeeping", value: "housekeeping" },
    { label: "Kitchen Staff", value: "kitchen_staff" },
    { label: "Maintenance", value: "maintenance" },
    { label: "Security", value: "security" },
    { label: "Finance", value: "finance" },
    { label: "Human Resources", value: "human_resources" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Position Name */}
      <TextInput
        id="positionName"
        label="Position Name"
        labelClassName="text-[13px] font-semibold text-text-primary"
        wrapperClassName="flex flex-col gap-2"
        inputClassName="w-full rounded-[8px] px-[16px] py-[11px] border-[1px] border-border bg-input-bg text-[14px] font-semibold outline-none focus:border-border-active"
        value={formData.positionName}
        onChange={(e) => onFormDataChange({ positionName: e.target.value })}
        placeholder="Enter position name"
      />

      {/* Groups */}
      <GroupSelectInput
        label="Groups"
        name="groups"
        labelClassName="text-[13px] font-semibold text-text-primary"
        fieldClassName="w-full rounded-[8px] px-[16px] py-[11px] border-[1px] border-border bg-input-bg text-[14px] font-semibold outline-none focus:border-border-active"
        choices={groupOptions}
        selectedValues={formData.groups}
        onChange={(values) => onFormDataChange({ groups: values })}
        placeholder="Select groups"
        helperText="(You can select more than one if applicable)"
      />

      {/* Description */}
      <TextAreaInput
        label="Description"
        name="description"
        placeholder="Enter position description"
        value={formData.description}
        onChange={(e) => onFormDataChange({ description: e.target.value })}
        className="w-full rounded-[8px] px-[16px] py-[11px] border-[1px] border-border bg-input-bg text-[14px] font-semibold outline-none focus:border-border-active min-h-[120px] resize-none"
      />
    </div>
  );
};

export default PositionForm;
