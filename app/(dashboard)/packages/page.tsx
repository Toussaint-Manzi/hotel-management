"use client";

import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/type";
import { setLoading } from "@/redux/features/packages.slice";
import EmptyState from "@/components/organisms/states/empty-state/EmptyState";
import LoadingState from "@/components/organisms/states/loading-state/LoadingState";

export default function PackagesPage() {
  const dispatch = useAppDispatch();
  const { packages, loading, error } = useAppSelector(
    (state) => state.packages
  );

  useEffect(() => {
    // Simulate fetching data
    dispatch(setLoading(true));
    // When you have an API, replace this with actual fetch
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
  }, [dispatch]);

  const handleAddPackage = () => {
    console.log("Add new package");
    // TODO: Navigate to add package form or open modal
  };

  if (loading) {
    return (
      <LoadingState
        title="Loading packages..."
        subtitle="Please wait while we fetch your packages data."
      />
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (packages.length === 0) {
    return (
      <EmptyState
        title="Ready to build your first package?"
        subtitle="Packages help your members subscribe easily to facilities or combined services. Start by creating your first one."
        buttonLabel="Add Package"
        onButtonClick={handleAddPackage}
        icon="package"
        showButton={true}
      />
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Packages</h1>
      {/* TODO: Add packages list/table here */}
      <div className="grid gap-4">
        {packages.map((pkg: any, index: number) => (
          <div key={index} className="border p-4 rounded-lg">
            {/* Package card content */}
            <p>{JSON.stringify(pkg)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
