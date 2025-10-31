import { useEffect, useState } from "react";
import { PopupMessageProps } from "./PopUpMessage.types";
import { IconWrapper } from "@/components/atoms/icon-wrapper/IconWrapper";

const PopupMessage = ({
  message,
  messageType,
  showPopup,
  position = "top-right",
  duration = 3000,
  onClose,
}: PopupMessageProps) => {
  const [isVisible, setIsVisible] = useState(showPopup);
  const [isHovering, setIsHovering] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  useEffect(() => {
    setIsVisible(showPopup);
  }, [showPopup]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    // Only start timer if showPopup is true, duration is positive, and user is not hovering
    if (showPopup && duration > 0 && !isHovering) {
      timer = setTimeout(() => {
        handleClose();
      }, duration);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showPopup, duration, isHovering]);

  const getPositionClasses = () => {
    switch (position) {
      case "top-right":
        return "top-6 right-6";
      case "top-left":
        return "top-6 left-6";
      case "bottom-right":
        return "bottom-6 right-6";
      case "bottom-left":
        return "bottom-6 left-6";
      case "center":
        return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
      default:
        return "top-6 right-6";
    }
  };

  const getMessageTypeTitle = () => {
    switch (messageType) {
      case "success":
        return "Success";
      case "error":
        return "Error";
      case "info":
        return "Information";
      default:
        return "";
    }
  };

  const getBorderColor = () => {
    switch (messageType) {
      case "success":
        return "border-[#009951]";
      case "error":
        return "border-[#EB0804]";
      case "info":
        return "border-[#0088FF]";
      default:
        return "border-gray-300";
    }
  };

  const getIcon = () => {
    switch (messageType) {
      case "success":
        return (
          <IconWrapper
            iconName="check-circle"
            className="text-[#009951]"
            size={24}
          />
        );
      case "error":
        return (
          <IconWrapper
            iconName="cancel1"
            className="text-[#EB0804]"
            size={24}
          />
        );
      case "info":
        return (
          <IconWrapper
            iconName="attention-circle"
            className="text-[#0088FF]"
            size={24}
          />
        );
      default:
        return null;
    }
  };

  // Calculate sliding transform based on position and visibility
  const getSlideTransform = () => {
    // For positions on the right side, slide in from right
    const isRightSide =
      position?.includes("right") ||
      (!position?.includes("left") && !position?.includes("center"));

    if (isRightSide) {
      return isVisible ? "translateX(0)" : "translateX(120%)";
    } else if (position?.includes("left")) {
      // For positions on the left side, slide in from left
      return isVisible ? "translateX(0)" : "translateX(-120%)";
    }
    // For center, fade in/out without sliding
    return "translateX(0)";
  };

  return (
    <>
      {Boolean(message) && (
        <div
          className={`fixed ${getPositionClasses()} z-50`}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: getSlideTransform(),
            transition: "opacity 300ms ease, transform 300ms ease",
            pointerEvents: isVisible ? "auto" : "none",
          }}
        >
          <div
            className={`
              w-[380px] min-h-[74px] bg-white shadow-[0_4px_30px_rgba(0,0,0,0.15)]
              rounded-lg p-4 border ${getBorderColor()} flex items-start gap-3 relative
            `}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="flex-shrink-0 pt-1">{getIcon()}</div>
            <div className="flex flex-col flex-1">
              <span className="text-text text-[16px] font-semibold">
                {getMessageTypeTitle()}
              </span>
              <p className="text-text-secondary text-[14px]">{message}</p>
            </div>
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-text-secondary hover:text-text transition-colors"
              aria-label="Close notification"
            >
              <IconWrapper iconName="cancel-close" size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupMessage;
