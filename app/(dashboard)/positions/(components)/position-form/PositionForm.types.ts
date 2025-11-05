export interface PositionFormData {
  positionName: string;
  groups: string[];
  description: string;
}

export interface PositionFormProps {
  formData: PositionFormData;
  onFormDataChange: (data: Partial<PositionFormData>) => void;
}
