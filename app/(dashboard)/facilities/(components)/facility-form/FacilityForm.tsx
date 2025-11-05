import React, { useState } from "react";
import TextInput from "@/components/atoms/text-input/TextInput";
import TextAreaInput from "@/components/atoms/text-area-input/TextAreaInput";
import TimePickerButton from "@/components/atoms/time-picker-button/TimePickerButton";
import Label from "@/components/atoms/label/Label";
import type { FacilityFormProps } from "./FacilityForm.types";

export const FacilityForm: React.FC<FacilityFormProps> = ({
  formData,
  onFormDataChange,
}) => {
  const [showTimePicker, setShowTimePicker] = useState<
    "opening" | "closing" | null
  >(null);

  const formatTime = (time: string) => {
    if (!time) return "09:00 AM";
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const displayHour = hours % 12 || 12;
    return `${displayHour.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;
  };

  const TimePickerPopup = ({
    timeType,
    currentValue,
  }: {
    timeType: "opening" | "closing";
    currentValue: string;
  }) => {
    const hours = Array.from({ length: 12 }, (_, i) => i + 1);
    const minutes = [0, 15, 30, 45];

    const getCurrentHour12 = () => {
      if (!currentValue) return 9;
      const hour24 = parseInt(currentValue.split(":")[0]);
      if (hour24 === 0) return 12;
      if (hour24 > 12) return hour24 - 12;
      return hour24;
    };

    const [selectedHour, setSelectedHour] = useState(getCurrentHour12());
    const [selectedMinute, setSelectedMinute] = useState(
      currentValue ? parseInt(currentValue.split(":")[1]) : 0
    );
    const [period, setPeriod] = useState<"AM" | "PM">(
      currentValue && parseInt(currentValue.split(":")[0]) >= 12 ? "PM" : "AM"
    );

    const handleApply = () => {
      let hour = selectedHour;
      if (period === "PM" && hour !== 12) hour += 12;
      if (period === "AM" && hour === 12) hour = 0;

      const timeString = `${hour.toString().padStart(2, "0")}:${selectedMinute
        .toString()
        .padStart(2, "0")}`;

      if (timeType === "opening") {
        onFormDataChange({ openingTime: timeString });
      } else {
        onFormDataChange({ closingTime: timeString });
      }
      setShowTimePicker(null);
    };

    return (
      <div className="absolute top-full left-0 mt-2 bg-white border border-border rounded-lg shadow-lg p-4 z-50 w-[280px]">
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <p className="text-[12px] font-semibold text-text-primary mb-2">
              Hour
            </p>
            <div className="h-[150px] overflow-y-auto border border-border rounded-sm">
              {hours.map((hour) => (
                <button
                  key={hour}
                  type="button"
                  onClick={() => setSelectedHour(hour)}
                  className={`w-full px-3 py-2 text-left text-[14px] hover:bg-input-bg ${
                    selectedHour === hour
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-text-primary"
                  }`}
                >
                  {hour.toString().padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <p className="text-[12px] font-semibold text-text-primary mb-2">
              Minute
            </p>
            <div className="h-[150px] overflow-y-auto border border-border rounded-sm">
              {minutes.map((minute) => (
                <button
                  key={minute}
                  type="button"
                  onClick={() => setSelectedMinute(minute)}
                  className={`w-full px-3 py-2 text-left text-[14px] hover:bg-input-bg ${
                    selectedMinute === minute
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-text-primary"
                  }`}
                >
                  {minute.toString().padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>

          <div className="w-[60px]">
            <p className="text-[12px] font-semibold text-text-primary mb-2">
              Period
            </p>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setPeriod("AM")}
                className={`px-3 py-2 text-[14px] border border-border rounded-sm ${
                  period === "AM"
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-text-primary"
                }`}
              >
                AM
              </button>
              <button
                type="button"
                onClick={() => setPeriod("PM")}
                className={`px-3 py-2 text-[14px] border border-border rounded-sm ${
                  period === "PM"
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-text-primary"
                }`}
              >
                PM
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowTimePicker(null)}
            className="flex-1 px-4 py-2 text-[14px] font-semibold text-text-secondary border border-border rounded-lg hover:bg-input-bg"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 px-4 py-2 text-[14px] font-semibold text-white bg-primary rounded-lg hover:bg-primary/90"
          >
            Apply
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Facility Name */}
      <TextInput
        id="facilityName"
        label="Facility Name"
        labelClassName="text-[13px] font-semibold text-text-primary"
        wrapperClassName="flex flex-col gap-2"
        inputClassName="w-full rounded-[8px] px-[16px] py-[11px] border-[1px] border-border bg-input-bg text-[14px] font-semibold outline-none focus:border-border-active"
        value={formData.facilityName}
        onChange={(e) => onFormDataChange({ facilityName: e.target.value })}
        placeholder="Enter facility name"
      />

      {/* Description */}
      <TextAreaInput
        label="Description"
        name="description"
        placeholder="Enter facility description"
        value={formData.description}
        onChange={(e) => onFormDataChange({ description: e.target.value })}
        className="w-full rounded-[8px] px-[16px] py-[11px] border-[1px] border-border bg-input-bg text-[14px] font-semibold outline-none focus:border-border-active min-h-[120px] resize-none"
      />

      {/* Maximum Capacity */}
      <TextInput
        id="maximumCapacity"
        label="Maximum Capacity"
        type="number"
        labelClassName="text-[13px] font-semibold text-text-primary"
        wrapperClassName="flex flex-col gap-2"
        inputClassName="w-full rounded-[8px] px-[16px] py-[11px] border-[1px] border-border bg-input-bg text-[14px] font-semibold outline-none focus:border-border-active"
        value={formData.maximumCapacity}
        onChange={(e) => onFormDataChange({ maximumCapacity: e.target.value })}
        placeholder="Enter maximum capacity"
      />

      {/* Opening and Closing Time */}
      <div className="grid grid-cols-2 gap-4">
        {/* Opening Time */}
        <div className="flex flex-col gap-2">
          <Label className="text-[13px] font-semibold text-text-primary">
            Opening Time
          </Label>
          <div className="relative">
            <TimePickerButton
              value={formData.openingTime}
              onClick={() => setShowTimePicker("opening")}
              formatTime={formatTime}
            />
            {showTimePicker === "opening" && (
              <TimePickerPopup
                timeType="opening"
                currentValue={formData.openingTime}
              />
            )}
          </div>
        </div>

        {/* Closing Time */}
        <div className="flex flex-col gap-2">
          <Label className="text-[13px] font-semibold text-text-primary">
            Closing Time
          </Label>
          <div className="relative">
            <TimePickerButton
              value={formData.closingTime}
              onClick={() => setShowTimePicker("closing")}
              formatTime={formatTime}
            />
            {showTimePicker === "closing" && (
              <TimePickerPopup
                timeType="closing"
                currentValue={formData.closingTime}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityForm;
