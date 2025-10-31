"use client";

import { useRouter } from "next/navigation";
import { CustomButton } from "@/components/atoms/custom-button/CustomButton";
import { IconWrapper } from "@/components/atoms/icon-wrapper/IconWrapper";
import { useAppSelector } from "@/redux/type";

export default function NotFound() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleGoHome = () => {
    if (isAuthenticated) {
      router.push("/dashboard");
      return;
    }
    router.push("/login");
  };

  return (
    <div
      className="relative w-screen h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url(/images/404-bg.png)",
      }}
    >
      <div className="flex flex-col items-center justify-center text-center px-4">
        <h1
          className="font-black text-[100px] leading-none mb-6"
          style={{
            background:
              "linear-gradient(180deg, rgba(30, 30, 30, 0.3) 0%, rgba(30, 30, 30, 0) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </h1>

        <p className="text-[14px] text-text-secondary font-medium mb-8 max-w-md">
          We couldn't locate the page you requested. Please check the URL or
          return to the homepage.
        </p>

        <CustomButton
          label="Go Back to Home"
          onClick={handleGoHome}
          className="bg-[linear-gradient(90deg,#2663EB_0%,#5187FF_100%)] flex flex-row items-center justify-center px-4 text-[14px] py-[11px] text-white font-semibold rounded-lg gap-2 cursor-pointer mx-auto"
          disabled={false}
          icon={
            <IconWrapper
              iconName="arrow-right"
              className="text-white"
              size={20}
            />
          }
        />
      </div>
    </div>
  );
}
