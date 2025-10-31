export type CustomButtonProps = {
  label: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  isSubmitting?: boolean;
  loadingWidth?: number;
};
