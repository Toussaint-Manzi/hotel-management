export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  wrapperClassName?: string;
  inputClassName?: string;
  error?: string | null;
  labelClassName?: string;
}
