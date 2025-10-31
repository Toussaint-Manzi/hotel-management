"use client";

import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/type";
import { setLoading } from "@/redux/features/positions.slice";
import EmptyState from "@/components/organisms/states/empty-state/EmptyState";
import LoadingState from "@/components/organisms/states/loading-state/LoadingState";

export default function PositionsPage() {
  const dispatch = useAppDispatch();
  const { positions, loading, error } = useAppSelector(
    (state) => state.positions
  );

  useEffect(() => {
    // Simulate fetching data
    dispatch(setLoading(true));
    // When you have an API, replace this with actual fetch
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
  }, [dispatch]);

  const handleAddPosition = () => {
    console.log("Add new position");
    // TODO: Navigate to add position form or open modal
  };

  if (loading) {
    return (
      <LoadingState
        title="Loading positions..."
        subtitle="Please wait while we fetch your positions data."
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

  if (positions.length === 0) {
    return (
      <EmptyState
        title="Nothing here… yet!"
        subtitle="Positions help you assign roles and responsibilities to your team. Start by adding your first position."
        buttonLabel="Add Position"
        onButtonClick={handleAddPosition}
        icon="case"
        showButton={true}
      />
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Positions</h1>
      {/* TODO: Add positions list/table here */}
      <div className="grid gap-4">
        {positions.map((position: any, index: number) => (
          <div key={index} className="border p-4 rounded-lg">
            {/* Position card content */}
            <p>{JSON.stringify(position)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
