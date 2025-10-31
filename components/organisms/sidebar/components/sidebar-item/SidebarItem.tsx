import { IconWrapper } from "@/components/atoms/icon-wrapper/IconWrapper";
import { SidebarItemProps } from "./SidebarItem.types";

const SidebarItem = ({
  label,
  icon,
  rightIcon,
  active = false,
}: SidebarItemProps) => {
  return (
    <div
      className={`group flex justify-between items-center gap-2 p-3 rounded-[8px] cursor-pointer transition-all duration-200 ease-in-out
        ${
          active
            ? "bg-white text-text-primary border-border border-px border"
            : "text-text-secondary hover:bg-white hover:text-text-primary"
        } `}
    >
      <div className="flex gap-2">
        <IconWrapper
          iconName={icon}
          className={` hover:text-[#4D45B4] transition-colors
            ${
              active
                ? "text-text-primary"
                : "text-text-secondary group-hover:text-primary"
            }`}
        />
        <span className="font-medium text-[14px]">{label}</span>
      </div>
      {rightIcon && (
        <span
          className={`${
            active ? "text-primary" : "text-nav-item group-hover:text-primary"
          }`}
        >
          {rightIcon}
        </span>
      )}
    </div>
  );
};

export default SidebarItem;
