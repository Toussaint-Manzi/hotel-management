"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/organisms/sidebar/Sidebar";
import Navbar from "@/components/organisms/navbar/Navbar";
import { links } from "@/lib/constants/links";
import { useRouter, usePathname } from "next/navigation";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IconWrapper } from "@/components/atoms/icon-wrapper/IconWrapper";
import { useAppSelector } from "@/redux/type";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openParent, setOpenParent] = useState<string | null>(null);

  const router = useRouter();

  const handleParentClick = (label: string, path?: string) => {
    if (path) {
      router.push(path);
      setIsMenuOpen(false);
    }
    setOpenParent(openParent === label ? null : label);
  };

  useEffect(() => {
    !isAuthenticated && router.push("/auth/login");
  }, [router, isAuthenticated]);

  return (
    <div className="flex h-screen w-screen overflow-hidden relative">
      <Sidebar />
      <div className="flex flex-col lg:ml-[16%] w-full lg:w-[84%] bg-white">
        <div className="sticky top-0 z-10 bg-white">
          <Navbar
            pageTitle="Dashboard"
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4 pt-0 lg:p-6 scroll-hidden relative">
          {children}
        </div>

        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bottom-0 z-40 p-4 bg-white lg:hidden overflow-y-auto shadow-lg">
            <div className="flex flex-col gap-2 mt-6">
              <h1 className="uppercase text-text-secondary text-[14px] font-medium tracking-widest mb-2">
                general
              </h1>
              {links.general.map((link, index) => {
                const isOpen = openParent === link.label;
                return (
                  <div key={index} className="flex flex-col">
                    <div
                      onClick={() => handleParentClick(link.label, link.path)}
                      className="flex items-center justify-between cursor-pointer px-2 py-1 hover:bg-gray-100 rounded"
                    >
                      <div className="flex items-center gap-2 text-primary">
                        <IconWrapper
                          iconName={link.icon}
                          className="text-[#1E1E1E] hover:text-[#4D45B4] transition-colors"
                          size={20}
                        />
                        <span className="text-base">{link.label}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-2 mt-6">
              <h1 className="uppercase text-text-secondary text-[14px] font-medium tracking-widest mb-2">
                support
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
