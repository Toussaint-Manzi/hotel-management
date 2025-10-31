"use client";

import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/type";
import { setLoading } from "@/redux/features/memberships.slice";
import EmptyState from "@/components/organisms/states/empty-state/EmptyState";
import LoadingState from "@/components/organisms/states/loading-state/LoadingState";

export default function MembershipsPage() {
  const dispatch = useAppDispatch();
  const { memberships, loading, error } = useAppSelector(
    (state) => state.memberships
  );

  useEffect(() => {
    // Simulate fetching data
    dispatch(setLoading(true));
    // When you have an API, replace this with actual fetch
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
  }, [dispatch]);

  const handleAddMembership = () => {
    console.log("Add new membership");
    // TODO: Navigate to add membership form or open modal
  };

  if (loading) {
    return (
      <LoadingState
        title="Loading memberships..."
        subtitle="Please wait while we fetch your memberships data."
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

  if (memberships.length === 0) {
    return (
      <EmptyState
        title="No member available"
        subtitle="No active members. Register a new member to begin tracking attendance."
        buttonLabel="Add Membership"
        onButtonClick={handleAddMembership}
        icon="user-rounded"
        showButton={true}
      />
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Memberships</h1>
      {/* TODO: Add memberships list/table here */}
      <div className="grid gap-4">
        {memberships.map((membership: any, index: number) => (
          <div key={index} className="border p-4 rounded-lg">
            {/* Membership card content */}
            <p>{JSON.stringify(membership)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
