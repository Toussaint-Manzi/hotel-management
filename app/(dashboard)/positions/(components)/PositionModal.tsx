import React, { useState } from "react";
import EntityModal from "@/components/organisms/entity-modal/EntityModal";
import PositionForm from "@/app/(dashboard)/positions/(components)/position-form/PositionForm";
import type { PositionFormData } from "@/app/(dashboard)/positions/(components)/position-form/PositionForm.types";

export const PositionModalExample = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<PositionFormData>({
    positionName: "",
    groups: [],
    description: "",
  });

  const handleSubmit = () => {
    console.log("Submitting position data:", formData);
    // Add your API call here
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    // Reset form data if needed
    setFormData({
      positionName: "",
      groups: [],
      description: "",
    });
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Add Position</button>

      <EntityModal
        isOpen={isModalOpen}
        onClose={handleClose}
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
    </div>
  );
};

export default PositionModalExample;
