import React from "react";
import { IconWrapper } from "@/components/atoms/icon-wrapper/IconWrapper";
import type { StepHeaderProps } from "./StepHeader.types";

export const StepHeader: React.FC<StepHeaderProps> = ({
  title,
  description,
  onBack,
}) => {
  return (
    <div className="w-[40%] flex flex-col gap-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[16px] text-text-primary font-bold hover:opacity-70 transition-opacity w-fit"
      >
        <div className="rotate-180">
          <IconWrapper
            iconName="arrow-right"
            size={20}
            className="text-text-primary"
          />
        </div>
        <span>Back</span>
      </button>

      {/* Title and Description */}
      <div className="flex flex-col gap-2">
        <h2 className="text-[24px] text-text-primary font-bold">{title}</h2>
        <p className="text-[16px] text-text-secondary font-medium">
          {description}
        </p>
      </div>
    </div>
  );
};

export default StepHeader;
