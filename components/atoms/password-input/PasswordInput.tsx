import React, { useState } from "react";
import { IconWrapper } from "../icon-wrapper/IconWrapper";
import { PasswordInputProps } from "./PasswordInput.types";
import Label from "../label/Label";

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    {
      id,
      label,
      labelClassName,
      wrapperClassName = "",
      inputClassName = "",
      className = "",
      error = null,
      ...rest
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);

    return (
      <div className={wrapperClassName}>
        {label && (
          <Label
            htmlFor={id}
            className={
              labelClassName || "text-text-primary text-16px font-semibold"
            }
          >
            {label}
          </Label>
        )}

        <div className="relative">
          <input
            id={id}
            ref={ref}
            type={visible ? "text" : "password"}
            className={`w-full border-px border-border bg-input rounded-8px px-3 py-2 ${inputClassName} ${className}`.trim()}
            {...rest}
          />

          <button
            type="button"
            aria-label={visible ? "Hide password" : "Show password"}
            onClick={() => setVisible((v) => !v)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-14px text-text-secondary"
          >
            {visible ? (
              <IconWrapper iconName="eye-slash" size={20} className="" />
            ) : (
              // simple eye icon
              <IconWrapper iconName="eye" size={20} className="" />
            )}
          </button>
        </div>
        {error ? (
          <p className="text-[#e90006] font-bold text-12px mt-1">{error}</p>
        ) : null}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
