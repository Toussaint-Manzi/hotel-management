"use client";

import React, { useState } from "react";
import TextInput from "@/components/atoms/text-input/TextInput";
import PasswordInput from "@/components/atoms/password-input/PasswordInput";
import Button from "@/components/atoms/button/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const disabled = !email || !password;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) return;
    // TODO: wire authentication
    console.log("submit", { email, password });
  };

  return (
    <div className="max-w-md mx-auto mt-20 px-4">
      <div className="mb-6">
        <h1 className="text-text-primary font-extrabold text-[32px]">
          Good to see you again.
        </h1>
        <p className="text-text-secondary text-[16px] font-medium mt-2">
          Access your account to manage everything in one place.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          id="email"
          label="Email Address"
          labelClassName="text-16px font-semibold"
          wrapperClassName="flex flex-col gap-2"
          inputClassName="rounded-[8px] px-[16px] py-[11px] border-[1px] border-border bg-input-bg text-[14px] font-semibold outline-none focus:border-border-active"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <PasswordInput
          id="password"
          label="Password"
          wrapperClassName="flex flex-col gap-2"
          inputClassName="rounded-[8px] px-[16px] py-[11px] border-[1px] border-border bg-input-bg text-[14px] font-semibold outline-none focus:border-border-active"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <div className="text-center mt-6">
          <Button
            type="submit"
            disabled={disabled}
            className="text-[14px] font-bold"
          >
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
}
