"use client";

import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/type";
import { setLoading } from "@/redux/features/facilities.slice";
import EmptyState from "@/components/organisms/states/empty-state/EmptyState";
import LoadingState from "@/components/organisms/states/loading-state/LoadingState";

export default function FacilitiesPage() {
  const dispatch = useAppDispatch();
  const { facilities, loading, error } = useAppSelector(
    (state) => state.facilities
  );

  useEffect(() => {
    // Simulate fetching data
    dispatch(setLoading(true));
    // When you have an API, replace this with actual fetch
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
  }, [dispatch]);

  const handleAddFacility = () => {
    console.log("Add new facility");
    // TODO: Navigate to add facility form or open modal
  };

  if (loading) {
    return (
      <LoadingState
        title="Loading facilities..."
        subtitle="Please wait while we fetch your facilities data."
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

  if (facilities.length === 0) {
    return (
      <EmptyState
        title="No facilities available"
        subtitle="You haven't added any facilities yet. Start by creating your first facility."
        buttonLabel="Add Facility"
        onButtonClick={handleAddFacility}
        icon="building"
        showButton={true}
      />
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Facilities</h1>
      {/* TODO: Add facilities list/table here */}
      <div className="grid gap-4">
        {facilities.map((facility: any, index: number) => (
          <div key={index} className="border p-4 rounded-lg">
            {/* Facility card content */}
            <p>{JSON.stringify(facility)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
