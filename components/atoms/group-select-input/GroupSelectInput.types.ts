type OptionProps = {
  value: string;
  label: string;
};

export type GroupSelectInputProps = {
  label: string;
  name: string;
  choices?: OptionProps[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  fieldClassName?: string;
  labelClassName?: string;
  helperText?: string;
};
