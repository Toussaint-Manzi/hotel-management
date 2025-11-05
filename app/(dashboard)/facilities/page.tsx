"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/type";
import { setLoading } from "@/redux/features/facilities.slice";
import EmptyState from "@/components/organisms/states/empty-state/EmptyState";
import LoadingState from "@/components/organisms/states/loading-state/LoadingState";
import EntityModal from "@/components/organisms/entity-modal/EntityModal";
import FacilityForm from "@/app/(dashboard)/facilities/(components)/facility-form/FacilityForm";
import type { FacilityFormData } from "@/app/(dashboard)/facilities/(components)/facility-form/FacilityForm.types";

export default function FacilitiesPage() {
  const dispatch = useAppDispatch();
  const { facilities, loading, error } = useAppSelector(
    (state) => state.facilities
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FacilityFormData>({
    facilityName: "",
    description: "",
    maximumCapacity: "",
    openingTime: "09:00",
    closingTime: "17:00",
  });

  useEffect(() => {
    // Simulate fetching data
    dispatch(setLoading(true));
    // When you have an API, replace this with actual fetch
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
  }, [dispatch]);

  const handleAddFacility = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Reset form data
    setFormData({
      facilityName: "",
      description: "",
      maximumCapacity: "",
      openingTime: "09:00",
      closingTime: "17:00",
    });
  };

  const handleSubmit = () => {
    console.log("Submitting facility data:", formData);
    // TODO: Add API call to save facility
    // dispatch(addFacility(formData));
    handleCloseModal();
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
      <>
        <EmptyState
          title="No facilities available"
          subtitle="No facilities added yet. Create your first to start tracking capacity."
          buttonLabel="Add Facility"
          onButtonClick={handleAddFacility}
          icon="facility"
          showButton={true}
        />

        <EntityModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Add New Facility"
          description="Create a new facility in the system"
          iconName="facility"
          entityName="Facility"
          isEditMode={false}
          onSubmit={handleSubmit}
        >
          <FacilityForm
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

      <EntityModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Add New Facility"
        description="Create a new facility in the system"
        iconName="facility"
        entityName="Facility"
        isEditMode={false}
        onSubmit={handleSubmit}
      >
        <FacilityForm
          formData={formData}
          onFormDataChange={(data) => setFormData({ ...formData, ...data })}
        />
      </EntityModal>
    </>
  );
}
