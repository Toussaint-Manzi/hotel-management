"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/type";
import { setLoading } from "@/redux/features/packages.slice";
import EmptyState from "@/components/organisms/states/empty-state/EmptyState";
import LoadingState from "@/components/organisms/states/loading-state/LoadingState";
import EntityModal from "@/components/organisms/entity-modal/EntityModal";
import PackageForm from "@/app/(dashboard)/packages/(components)/package-form/PackageForm";
import type { PackageFormData } from "@/app/(dashboard)/packages/(components)/package-form/PackageForm.types";

export default function PackagesPage() {
  const dispatch = useAppDispatch();
  const { packages, loading, error } = useAppSelector(
    (state) => state.packages
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<PackageFormData>({
    packageName: "",
    packageCategory: "",
    includedFacility: "",
    packageDuration: "",
    pricing: "",
  });

  useEffect(() => {
    // Simulate fetching data
    dispatch(setLoading(true));
    // When you have an API, replace this with actual fetch
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
  }, [dispatch]);

  const handleAddPackage = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Reset form data
    setFormData({
      packageName: "",
      packageCategory: "",
      includedFacility: "",
      packageDuration: "",
      pricing: "",
    });
  };

  const handleSubmit = () => {
    console.log("Submitting package data:", formData);
    // TODO: Add API call to save package
    // dispatch(addPackage(formData));
    handleCloseModal();
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
      <>
        <EmptyState
          title="Ready to build your first package?"
          subtitle="Packages help your members subscribe easily to facilities or combined services. Start by creating your first one."
          buttonLabel="Add Package"
          onButtonClick={handleAddPackage}
          icon="package"
          showButton={true}
        />

        <EntityModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Add New Package"
          description="Create a new package in the system"
          iconName="package"
          entityName="Package"
          isEditMode={false}
          onSubmit={handleSubmit}
        >
          <PackageForm
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

      <EntityModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Add New Package"
        description="Create a new package in the system"
        iconName="package"
        entityName="Package"
        isEditMode={false}
        onSubmit={handleSubmit}
      >
        <PackageForm
          formData={formData}
          onFormDataChange={(data) => setFormData({ ...formData, ...data })}
        />
      </EntityModal>
    </>
  );
}
