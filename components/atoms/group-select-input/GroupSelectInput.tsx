import React from "react";
import Label from "../label/Label";
import { IconWrapper } from "../icon-wrapper/IconWrapper";
import { GroupSelectInputProps } from "./GroupSelectInput.types";

const GroupSelectInput = ({
  label,
  name,
  choices,
  labelClassName,
  fieldClassName,
  selectedValues,
  onChange,
  error,
  disabled,
  placeholder = "-- Select --",
  helperText,
}: GroupSelectInputProps) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value && !selectedValues.includes(value)) {
      onChange([...selectedValues, value]);
    }
    // Reset the select to placeholder after selection
    e.target.value = "";
  };

  const handleRemoveItem = (valueToRemove: string) => {
    onChange(selectedValues.filter((value) => value !== valueToRemove));
  };

  const getAvailableChoices = () => {
    return choices?.filter((choice) => !selectedValues.includes(choice.value));
  };

  const getSelectedLabel = (value: string) => {
    return choices?.find((choice) => choice.value === value)?.label || value;
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <div className="flex items-center gap-1">
          <Label htmlFor={name} className={labelClassName}>
            {label}
          </Label>
          {helperText && (
            <span className="text-[12px] text-text-secondary font-normal">
              {helperText}
            </span>
          )}
        </div>
      )}

      <div className="relative">
        <select
          name={name}
          id={name}
          onChange={handleSelectChange}
          disabled={disabled}
          className={
            fieldClassName ||
            `w-full border rounded-md px-4 p-1.5 text-sm focus:outline-none focus:ring-1 bg-white appearance-none pr-10 h-[45px]
            ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-border focus:ring-primary"
            }`
          }
        >
          <option value="" hidden>
            {placeholder}
          </option>
          {getAvailableChoices()?.map((choice) => (
            <option key={choice.value} value={choice.value}>
              {choice.label}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

      {/* Selected Items Display */}
      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {selectedValues.map((value) => (
            <div
              key={value}
              className="flex items-center gap-2 px-3 py-2 rounded-[10px] border-2 border-primary/60 bg-primary/5"
            >
              <span className="text-[14px] font-bold text-text-primary">
                {getSelectedLabel(value)}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveItem(value)}
                className="hover:opacity-70 transition-opacity"
                aria-label={`Remove ${getSelectedLabel(value)}`}
              >
                <IconWrapper
                  iconName="cancel"
                  size={15}
                  className="text-text-primary"
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupSelectInput;
