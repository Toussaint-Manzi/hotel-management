export interface DaySchedule {
  isWorking: boolean;
  startTime: string;
  endTime: string;
}

export interface ScheduleAvailabilityFormData {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface ScheduleAvailabilityStepProps {
  formData: ScheduleAvailabilityFormData;
  onFormDataChange: (data: Partial<ScheduleAvailabilityFormData>) => void;
  onBack: () => void;
}
