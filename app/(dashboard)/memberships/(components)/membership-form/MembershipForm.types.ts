export interface MembershipFormData {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  assignedPackage: string;
  membershipStartDate: string;
  uniqueId: string;
}

export interface MembershipFormProps {
  formData: MembershipFormData;
  onFormDataChange: (data: Partial<MembershipFormData>) => void;
}
