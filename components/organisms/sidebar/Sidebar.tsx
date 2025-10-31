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
    <div className="hidden lg:block w-[16%] h-screen bg-[#F8F8F8] fixed border-r border-[#E4E4E4]">
      <div className="border-b border-[#E4E4E4] p-6 flex items-center">
        <h3 className="text-[20px] text-primary font-bold">Olympic</h3>
      </div>
      <div className="border-b border-[#E4E4E4] p-6 flex flex-col justify-center">
        <h1 className="uppercase text-text-secondary text-[10px] font-medium tracking-widest mb-2">
          main
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
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
