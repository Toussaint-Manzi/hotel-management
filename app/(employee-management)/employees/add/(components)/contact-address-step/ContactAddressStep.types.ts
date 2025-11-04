export interface ContactAddressFormData {
  phoneNumber: string;
  nationality: string;
  residenceAddress: string;
}

export interface ContactAddressStepProps {
  formData: ContactAddressFormData;
  onFormDataChange: (data: Partial<ContactAddressFormData>) => void;
  onBack: () => void;
}
