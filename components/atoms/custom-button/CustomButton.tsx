import { CustomButtonProps } from "./CustomButton.types";

export const CustomButton = ({
  label,
  onClick,
  className = "bg-white text-primary border border-primary px-6 py-1 rounded-full hover:bg-primary hover:text-white transition-all cursor-pointer",
  disabled = false,
  icon = null,
  isSubmitting = false,
}: CustomButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={className}
      disabled={disabled || isSubmitting}
    >
      {label}
      {icon && <span className="">{icon}</span>}
    </button>
  );
};
