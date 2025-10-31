import React from "react";
import { EmptyStateProps } from "./EmptyState.types";
import { IconWrapper } from "@/components/atoms/icon-wrapper/IconWrapper";
import { CustomButton } from "@/components/atoms/custom-button/CustomButton";

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No data available",
  subtitle = "There is currently no data to display.",
  buttonLabel = "New Item",
  onButtonClick,
  height = "70vh",
  showButton = true,
  icon = "",
}) => {
  return (
    <div
      className="w-full flex flex-col justify-center items-center gap-6"
      style={{ height }}
    >
      <div className="text-center">
        {icon && (
          <div className="mb-4 flex justify-center">
            <IconWrapper iconName={icon} size={100} className="text-border" />
          </div>
        )}
        <h2 className="text-[24px] font-medium text-text-primary mb-2">
          {title}
        </h2>
        <p className="text-[16px] text-text-secondary mb-6">{subtitle}</p>
        {showButton && onButtonClick && (
          <CustomButton
            label={buttonLabel}
            onClick={onButtonClick}
            className="bg-[linear-gradient(90deg,#2663EB_0%,#5187FF_100%)] flex flex-row-reverse items-center justify-center px-4 text-[16px] py-[11px] text-white font-semibold rounded-lg gap-2 cursor-pointer mx-auto"
            disabled={false}
            icon={
              <IconWrapper iconName="plus" className="text-white" size={20} />
            }
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
