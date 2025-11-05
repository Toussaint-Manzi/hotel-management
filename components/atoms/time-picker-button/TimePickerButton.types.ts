export interface TimePickerButtonProps {
  value: string;
  onClick: () => void;
  formatTime: (time: string) => string;
}
