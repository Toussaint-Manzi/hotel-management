import SidebarItem from "./components/sidebar-item/SidebarItem";
import { links } from "@/lib/constants/links";
import { PERMISSIONS } from "@/lib/constants/permissions";
import { hasPermission } from "@/lib/utils/permission";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const groups = [
    "SYSTEM_ADMIN_INITIATEUR",
    "SYSTEM_ADMIN_VALIDATEUR",
    "SYSTEM_ADMIN_VISITEUR",
  ]; // Example groups
  const filteredLinks = links.general.filter((link) => {
    // Handle Dashboard which doesn't need permissions
    if (link.label === "Dashboard") {
      return true;
    }

    // For direct links
    if (link.label in PERMISSIONS) {
      return hasPermission(
        link.label as keyof typeof PERMISSIONS,
        "LIST",
        groups
      );
    }

    return false;
  });

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
          const isActive =
            pathname.split("/").pop()?.toLowerCase() ===
            link.path?.split("/").pop()?.toLowerCase();

          return (
            <div key={index} onClick={() => router.push(link.path || "/")}>
              <SidebarItem
                label={link.label}
                icon={link.icon}
                active={isActive}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
