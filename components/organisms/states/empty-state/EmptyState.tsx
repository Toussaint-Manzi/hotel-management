import React from "react";
import { EmptyStateProps } from "./EmptyState.types";
import { IconWrapper } from "@/components/atoms/icon-wrapper/IconWrapper";
import { CustomButton } from "@/components/atoms/custom-button/CustomButton";

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Aucune donnée trouvée",
  subtitle = "Il n'y a actuellement aucune donnée à afficher.",
  buttonLabel = "Nouveau",
  onButtonClick,
  height = "70vh",
  showButton = true,
}) => {
  return (
    <div
      className="w-full flex flex-col justify-center items-center gap-6"
      style={{ height }}
    >
      <div className="text-center max-w-md">
        <h2 className="text-[24px] font-medium text-text mb-2">{title}</h2>
        <p className="text-[16px] text-[#828282] mb-6">{subtitle}</p>
        {showButton && onButtonClick && (
          <CustomButton
            label={buttonLabel}
            onClick={onButtonClick}
            className="bg-primary flex flex-row-reverse items-center justify-center px-[24px] text-[16px] py-[12px] text-white font-semibold rounded-[8px] gap-2 cursor-pointer mx-auto"
            disabled={false}
            icon={
              <IconWrapper iconName="plus" className="text-[#fff]" size={20} />
            }
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
