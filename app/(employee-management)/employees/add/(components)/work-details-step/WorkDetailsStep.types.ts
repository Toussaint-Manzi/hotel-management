export interface WorkDetailsFormData {
  joiningDate: string;
  contractEndDate: string;
  facilityAccess: string[];
}

export interface WorkDetailsStepProps {
  formData: WorkDetailsFormData;
  onFormDataChange: (data: Partial<WorkDetailsFormData>) => void;
  onBack: () => void;
}
