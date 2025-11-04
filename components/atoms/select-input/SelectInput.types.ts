type OptionProps = {
  value: string;
  label: string;
};

export type SelectInputProps = {
  label: string;
  name: string;
  choices?: OptionProps[];
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  disabled?: boolean;
  isFetching?: boolean;
  placeholder?: string;
  fieldClassName?: string;
  labelClassName?: string;
};
