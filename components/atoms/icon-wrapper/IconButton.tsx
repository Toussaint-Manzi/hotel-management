import React from "react";
import { IconWrapper } from "./IconWrapper";

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  iconName: string;
  size?: number;
  ariaLabel?: string;
  iconClassName?: string;
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      iconName,
      size = 20,
      ariaLabel,
      iconClassName = "",
      className = "",
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        aria-label={ariaLabel}
        type={rest.type ?? "button"}
        className={className}
        {...rest}
      >
        <IconWrapper
          iconName={iconName}
          size={size}
          className={iconClassName}
        />
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
