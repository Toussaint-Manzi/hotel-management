export type StepStatus = "CURRENT" | "NOT YET DONE" | "COMPLETED";

export interface Step {
  id: number;
  title: string;
  status: StepStatus;
}

export interface AddEmployeeHeaderProps {
  currentStep: number;
  onClose: () => void;
  onNextStep: () => void;
}
