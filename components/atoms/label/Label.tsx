import React from "react";
import type { LabelProps } from "./Label.types";

export const Label: React.FC<LabelProps> = ({
  children,
  htmlFor,
  className = "",
  ...rest
}) => {
  return (
    <label htmlFor={htmlFor} className={className} {...rest}>
      {children}
    </label>
  );
};

export default Label;
