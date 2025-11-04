export interface BasicInfoFormData {
  profilePhoto: File | null;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  password: string;
  position: string;
}

export interface BasicInfoStepProps {
  formData: BasicInfoFormData;
  onFormDataChange: (data: Partial<BasicInfoFormData>) => void;
  onBack: () => void;
}
