import { useState } from "react";
import SidebarItem from "./components/sidebar-item/SidebarItem";
import { links } from "@/lib/constants/links";
import { PERMISSIONS } from "@/lib/constants/permissions";
import { hasPermission } from "@/lib/utils/permission";
import { useRouter } from "next/navigation";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Sidebar = () => {
  const router = useRouter();
  const [openParent, setOpenParent] = useState<string | null>(null);
  const groups = [
    "SYSTEM_ADMIN_INITIATEUR",
    "SYSTEM_ADMIN_VALIDATEUR",
    "SYSTEM_ADMIN_VISITEUR",
  ]; // Example groups
  //   const { user } = useAppSelector((state) => state.auth);
  const filteredLinks = links.general.filter((link) => {
    // Handle Dashboard which doesn't need permissions
    if (link.label === "Dashboard") {
      return true;
    }

    // Map link labels to permissions keys
    const permissionKey =
      link.label === "Employés"
        ? "Agents"
        : link.label === "Localisation"
        ? "Localisations"
        : link.label;

    // For links with children (submenus)
    if (link.children) {
      if (link.label === "Plaintes") {
        return hasPermission("Plaintes", "LIST", groups);
      }
      // For Localisation submenu
      if (link.label === "Localisation") {
        return hasPermission("Localisations", "LIST", groups);
      }
      return false;
    }

    // For direct links
    if (permissionKey in PERMISSIONS) {
      return hasPermission(
        permissionKey as keyof typeof PERMISSIONS,
        "LIST",
        groups
      );
    }

    return false;
  });
  const handleParentClick = (label: string, path?: string) => {
    if (path) {
      router.push(path);
    } else {
      setOpenParent(openParent === label ? null : label);
    }
  };

  return (
    <div className="hidden lg:block w-[16%] h-screen bg-secondary fixed border-r border-[#E4E4E4]">
      <div className="border-b border-[#E4E4E4] p-6 flex items-center">
        <h3 className="text-2xl text-[#4D45B4] font-bold">GovConnect</h3>
      </div>
      <div className="border-b border-[#E4E4E4] p-6 flex flex-col justify-center">
        <h1 className="uppercase text-text-secondary text-[14px] font-medium tracking-widest mb-2">
          general
        </h1>{" "}
        {filteredLinks.map((link, index) => {
          const isOpen = openParent === link.label;
          const isActive = window.location.pathname === link.path;

          return (
            <div key={index}>
              <div
                onClick={() => handleParentClick(link.label, link.path)}
                className="cursor-pointer"
              >
                <SidebarItem
                  label={link.label}
                  icon={link.icon}
                  active={isActive}
                  rightIcon={
                    link.children ? (
                      isOpen ? (
                        <IoIosArrowUp />
                      ) : (
                        <IoIosArrowDown />
                      )
                    ) : undefined
                  }
                />
              </div>

              {link.children && isOpen && (
                <div className="ml-4 mt-1 flex flex-col gap-1">
                  {link.children.map((child, childIndex) => (
                    <div
                      key={childIndex}
                      onClick={() => child.path && router.push(child.path)}
                      className="cursor-pointer"
                    >
                      <SidebarItem
                        label={child.label}
                        icon={child.icon}
                        active={window.location.pathname === child.path}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="border-b border-[#E4E4E4] p-6 flex flex-col justify-center">
        <h1 className="uppercase text-text-secondary text-[14px] font-medium tracking-widest mb-2">
          support
        </h1>
        {links.support.map((link, index: number) => (
          <div key={index} onClick={() => router.push(link.path)}>
            <SidebarItem
              label={link.label}
              icon={link.icon}
              active={
                link.path.toLowerCase() ===
                window.location.pathname.toLowerCase()
              }
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 w-full text-center text-text-secondary text-[16px]">
        @{new Date().getFullYear()} GovConnect.ca, Inc.
      </div>
    </div>
  );
};

export default Sidebar;
