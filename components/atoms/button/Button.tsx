import React from "react";
import { ButtonProps } from "./Button.types";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      className = "",
      disabled,
      type = "button",
      ...rest
    },
    ref
  ) => {
    const base = `w-full text-16px py-[13px] rounded-[8px] ${className}`.trim();

    // simple variant handling following project's tokens
    const stateClass = disabled
      ? "bg-border text-text-secondary"
      : variant === "primary"
      ? "bg-[linear-gradient(90deg,#2663EB_0%,#5187FF_100%)] text-white"
      : "";

    const classes = `${base} ${stateClass}`.trim();

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={classes}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
