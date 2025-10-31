import React from "react";
import type { TextInputProps } from "./TextInput.types";
import { Label } from "../label/Label";

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      id,
      label,
      labelClassName = "",
      wrapperClassName = "",
      inputClassName = "",
      error = null,
      className = "",
      ...rest
    },
    ref
  ) => {
    return (
      <div className={wrapperClassName}>
        {label && (
          <Label htmlFor={id} className={labelClassName}>
            {label}
          </Label>
        )}
        <input id={id} ref={ref} className={inputClassName} {...rest} />
        {error ? (
          <p className="text-[#e90006] font-bold text-12px mt-1">{error}</p>
        ) : null}{" "}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
