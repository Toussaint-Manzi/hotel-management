import { ReactNode } from "react";

export interface EntityModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  iconName: string;
  entityName: string;
  isEditMode?: boolean;
  onSubmit: () => void;
  children: ReactNode;
}
