import React from "react";
import { TextAreaInputProps } from "./TextAreaInput.types";

const MAX_LENGTH = 500;

const TextAreaInput = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  className = "w-full border border-border rounded-md pl-2 p-1.5 focus:outline-0 focus:ring-1 bg-white appearance-none text-[16px]",
}: TextAreaInputProps) => {
  // Combine the provided className with error styles
  const inputClassName = `${className} ${
    error ? "border-red-500 focus:ring-red-500" : "focus:ring-primary"
  }`;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-[16px] font-medium text-text">
        {label} {error && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        maxLength={MAX_LENGTH}
        className={inputClassName}
        placeholder={placeholder}
        rows={4}
        cols={50}
      ></textarea>
      <div className="flex justify-between items-center">
        {error && <span className="text-xs text-red-500">{error}</span>}
        <p className="text-xs text-gray-500 ml-auto">
          {value.length} / {MAX_LENGTH}
        </p>
      </div>
    </div>
  );
};

export default TextAreaInput;
