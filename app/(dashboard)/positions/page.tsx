"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/type";
import { setLoading } from "@/redux/features/positions.slice";
import EmptyState from "@/components/organisms/states/empty-state/EmptyState";
import LoadingState from "@/components/organisms/states/loading-state/LoadingState";
import EntityModal from "@/components/organisms/entity-modal/EntityModal";
import PositionForm from "@/app/(dashboard)/positions/(components)/position-form/PositionForm";
import type { PositionFormData } from "@/app/(dashboard)/positions/(components)/position-form/PositionForm.types";

export default function PositionsPage() {
  const dispatch = useAppDispatch();
  const { positions, loading, error } = useAppSelector(
    (state) => state.positions
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<PositionFormData>({
    positionName: "",
    groups: [],
    description: "",
  });

  useEffect(() => {
    // Simulate fetching data
    dispatch(setLoading(true));
    // When you have an API, replace this with actual fetch
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
  }, [dispatch]);

  const handleAddPosition = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Reset form data
    setFormData({
      positionName: "",
      groups: [],
      description: "",
    });
  };

  const handleSubmit = () => {
    console.log("Submitting position data:", formData);
    // TODO: Add API call to save position
    // dispatch(addPosition(formData));
    handleCloseModal();
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
      <>
        <EmptyState
          title="Nothing here… yet!"
          subtitle="Positions help you assign roles and responsibilities to your team. Start by adding your first position."
          buttonLabel="Add Position"
          onButtonClick={handleAddPosition}
          icon="case"
          showButton={true}
        />

        <EntityModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Add New Position"
          description="Create a new position in the system"
          iconName="case"
          entityName="Position"
          isEditMode={false}
          onSubmit={handleSubmit}
        >
          <PositionForm
            formData={formData}
            onFormDataChange={(data) => setFormData({ ...formData, ...data })}
          />
        </EntityModal>
      </>
    );
  }

  return (
    <>
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

      <EntityModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Add New Position"
        description="Create a new position in the system"
        iconName="work"
        entityName="Position"
        isEditMode={false}
        onSubmit={handleSubmit}
      >
        <PositionForm
          formData={formData}
          onFormDataChange={(data) => setFormData({ ...formData, ...data })}
        />
      </EntityModal>
    </>
  );
}
