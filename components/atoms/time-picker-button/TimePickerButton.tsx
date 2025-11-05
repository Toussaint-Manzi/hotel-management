import React from "react";
import { IconWrapper } from "@/components/atoms/icon-wrapper/IconWrapper";
import type { TimePickerButtonProps } from "./TimePickerButton.types";

export const TimePickerButton: React.FC<TimePickerButtonProps> = ({
  value,
  onClick,
  formatTime,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-[11px] border border-border bg-input-bg rounded-lg flex items-center justify-between gap-4 hover:border-border-active transition-colors"
    >
      <span className="text-[16px] text-text-secondary">
        {formatTime(value)}
      </span>
      <IconWrapper
        iconName="clock-circle"
        size={20}
        className="text-text-primary"
      />
    </button>
  );
};

export default TimePickerButton;
