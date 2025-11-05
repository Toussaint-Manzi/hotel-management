import React from "react";
import { IconWrapper } from "@/components/atoms/icon-wrapper/IconWrapper";
import type { EntityModalProps } from "./EntityModal.types";

export const EntityModal: React.FC<EntityModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  iconName,
  entityName,
  isEditMode = false,
  onSubmit,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-text-primary/20">
      <div className="w-[512px] bg-white rounded-[12px] flex flex-col">
        {/* Header Section */}
        <div className="relative p-[16px] flex items-center gap-3">
          {/* Icon Container */}
          <div className="border border-border rounded-[8px] p-[10px]">
            <IconWrapper
              iconName={iconName}
              size={24}
              className="text-text-primary"
            />
          </div>

          {/* Text Section */}
          <div className="flex flex-col">
            <h2 className="text-[18px] font-bold text-text-primary">{title}</h2>
            <p className="text-[14px] font-medium text-text-secondary">
              {description}
            </p>
          </div>

          {/* Cancel Icon - Top Right Corner */}
          <button
            onClick={onClose}
            className="absolute top-[16px] right-[16px] hover:opacity-70 transition-opacity"
            aria-label="Close modal"
          >
            <IconWrapper
              iconName="cancel"
              size={24}
              className="text-text-primary"
            />
          </button>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-border" />

        {/* Form Section - Entity Specific */}
        <div className="p-[16px]">{children}</div>

        {/* Divider */}
        <div className="h-[1px] bg-border" />

        {/* Footer Section */}
        <div className="p-[16px] flex justify-end gap-3">
          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="px-[16px] py-[11px] text-[16px] font-bold text-text-primary border border-border rounded-[8px] hover:bg-input-bg transition-colors"
          >
            Cancel
          </button>

          {/* Submit Button */}
          <button
            onClick={onSubmit}
            className="px-[16px] py-[11px] text-[16px] font-bold text-white bg-primary rounded-[8px] hover:bg-primary/90 transition-colors"
          >
            {isEditMode ? `Update ${entityName}` : `Add New ${entityName}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntityModal;
