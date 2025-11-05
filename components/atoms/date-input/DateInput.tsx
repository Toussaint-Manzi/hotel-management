import Label from "../label/Label";
import { DateInputProps } from "./DateInput.types";

const DateInput = ({
  label,
  labelClassName,
  fieldClassName,
  id,
  name,
  value,
  onChange,
  error,
}: DateInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <Label htmlFor={id} className={labelClassName}>
          {label}
        </Label>
      )}
      <div className="relative w-full">
        <input
          type="date"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={
            fieldClassName ||
            `w-full border rounded-md px-4 p-1.5 text-sm focus:outline-none focus:ring-1 bg-white appearance-none cursor-pointer h-[45px]
            ${
              error
                ? "border-red-500 focus:ring-red-500"
                : " border-[#e4e4e4] focus:ring-primary"
            }`
          }
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    </div>
  );
};

export default DateInput;
