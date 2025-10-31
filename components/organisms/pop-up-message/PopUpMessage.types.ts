export type PopupMessageProps = {
  message: string;
  messageType: "success" | "error" | "info" | null;
  showPopup: boolean;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "center";
  duration?: number;
  onClose?: () => void;
};
