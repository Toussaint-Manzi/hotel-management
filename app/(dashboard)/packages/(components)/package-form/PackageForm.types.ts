export interface PackageFormData {
  packageName: string;
  packageCategory: string;
  includedFacility: string;
  packageDuration: string;
  pricing: string;
}

export interface PackageFormProps {
  formData: PackageFormData;
  onFormDataChange: (data: Partial<PackageFormData>) => void;
}
