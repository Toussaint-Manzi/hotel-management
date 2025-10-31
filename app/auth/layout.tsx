"use client";
import { useAppSelector } from "@/redux/type";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    isAuthenticated && router.push("/dashboard");
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
