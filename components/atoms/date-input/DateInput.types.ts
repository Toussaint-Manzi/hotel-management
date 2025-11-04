export type DateInputProps = {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  labelClassName?: string;
  fieldClassName?: string;
};
