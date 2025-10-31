import { IconWrapper } from "@/components/atoms/icon-wrapper/IconWrapper";
import { logout } from "@/redux/features/auth.slice";
import { useAppDispatch, useAppSelector } from "@/redux/type";
import { useEffect, useRef, useState } from "react";
import { NavbarProps } from "./Navbar.types";

const Navbar = ({ pageTitle, isMenuOpen, setIsMenuOpen }: NavbarProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
  };

  return (
    <div className="flex justify-between border-b-[1px] border-[#E4E4E4] py-2.5 px-6">
      <div className="flex items-center gap-2">
        <div
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden cursor-pointer"
        >
          {isMenuOpen ? (
            <IconWrapper
              iconName="close"
              size={30}
              className="text-secondary"
            />
          ) : (
            <IconWrapper iconName="menu" size={30} className="text-secondary" />
          )}
        </div>
        <h3 className="text-text-secondary text-[14px] font-normal capitalize">
          {`Justin Trudeau`}
        </h3>
        <div className="rotate-270">
          <IconWrapper
            iconName="arrow"
            size={20}
            className="text-text-secondary hover:text-[#4D45B4] transition-colors"
          />
        </div>
        <div className="p-2 bg-input-bg rounded-[8px]">
          <h3 className="text-text-primary text-[14px] font-bold capitalize">
            {pageTitle.split("/").pop()?.replace("-", " ")}
          </h3>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative" ref={dropdownRef}>
          <div className="flex gap-3 border border-border rounded-[8px] p-2">
            <div
              className="bg-nav-item-active w-[36px] h-[36px] rounded-full object-cover cursor-pointer flex items-center justify-center"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user?.photo_url ? (
                <img
                  src={user?.photo_url}
                  alt="User Avatar"
                  width={36}
                  height={36}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <IconWrapper
                  iconName="user"
                  className="text-[#1E1E1E] hover:text-[#4D45B4] transition-colors"
                />
              )}
            </div>
            <div className="flex flex-col justify-between">
              <h4 className="text-[14px] text-text-primary font-bold">
                Justin Trudeau
              </h4>
              <h4 className="text-[12px] text-text-secondary font-semibold">
                justintrue@gmail.com
              </h4>
            </div>
            <div
              className="flex flex-col justify-center cursor-pointer -space-y-2 ml-4"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="rotate-180">
                <IconWrapper
                  iconName="arrow"
                  size={20}
                  className="text-text-secondary hover:text-[#4D45B4] transition-colors"
                />
              </div>
              <div className="rotate-0">
                <IconWrapper
                  iconName="arrow"
                  size={20}
                  className="text-text-secondary hover:text-[#4D45B4] transition-colors"
                />
              </div>
            </div>
            <div>
              {dropdownOpen && (
                <div className="absolute right-0 mt-13 mr-0 w-48 bg-white rounded-md shadow-lg z-50 p-4 text-sm space-y-3">
                  <button
                    onClick={handleLogout}
                    className="flex justify-between items-center text-gray-600 hover:text-primary cursor-pointer w-full"
                  >
                    <span>Logout</span>
                    <div className="rotate-180">
                      <IconWrapper
                        iconName="sign-out"
                        size={22}
                        className="text-[#e90006] hover:text-[#4D45B4] transition-colors"
                      />
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
