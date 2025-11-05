export interface FacilityFormData {
  facilityName: string;
  description: string;
  maximumCapacity: string;
  openingTime: string;
  closingTime: string;
}

export interface FacilityFormProps {
  formData: FacilityFormData;
  onFormDataChange: (data: Partial<FacilityFormData>) => void;
}
