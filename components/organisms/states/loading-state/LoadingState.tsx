import { IconWrapper } from "@/components/atoms/icon-wrapper/IconWrapper";
import { LoadingStateProps } from "./LoadingState.types";

const LoadingState: React.FC<LoadingStateProps> = ({
  title = "Chargement...",
  subtitle = "Veuillez patienter pendant que nous récupérons vos données.",
  height = "70vh",
  iconSize = 35,
}) => {
  return (
    <div
      className="w-full flex flex-col justify-center items-center gap-6"
      style={{ height }}
    >
      <div className="animate-spin">
        <IconWrapper
          iconName="animated-loader"
          className="text-primary"
          size={iconSize}
        />
      </div>
      <div className="text-center">
        <h2 className="text-[20px] font-medium text-text mb-2">{title}</h2>
        <p className="text-[16px] text-[#828282]">{subtitle}</p>
      </div>
    </div>
  );
};

export default LoadingState;
