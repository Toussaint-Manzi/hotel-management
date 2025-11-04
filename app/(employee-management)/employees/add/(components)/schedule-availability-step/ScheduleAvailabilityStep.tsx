import React, { useState } from "react";
import { IconWrapper } from "@/components/atoms/icon-wrapper/IconWrapper";
import StepHeader from "../step-header/StepHeader";
import type {
  ScheduleAvailabilityStepProps,
  DaySchedule,
} from "./ScheduleAvailabilityStep.types";

export const ScheduleAvailabilityStep: React.FC<
  ScheduleAvailabilityStepProps
> = ({ formData, onFormDataChange, onBack }) => {
  const [showTimePicker, setShowTimePicker] = useState<{
    day: string;
    type: "start" | "end";
  } | null>(null);

  const days = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ];

  const handleToggleDay = (dayKey: string) => {
    const currentDayData = formData[dayKey as keyof typeof formData];
    onFormDataChange({
      [dayKey]: {
        ...currentDayData,
        isWorking: !currentDayData.isWorking,
      },
    });
  };

  const handleTimeChange = (
    dayKey: string,
    timeType: "start" | "end",
    value: string
  ) => {
    const currentDayData = formData[dayKey as keyof typeof formData];
    onFormDataChange({
      [dayKey]: {
        ...currentDayData,
        [timeType === "start" ? "startTime" : "endTime"]: value,
      },
    });
    setShowTimePicker(null);
  };

  const TimePickerPopup = ({
    dayKey,
    timeType,
    currentValue,
  }: {
    dayKey: string;
    timeType: "start" | "end";
    currentValue: string;
  }) => {
    const hours = Array.from({ length: 12 }, (_, i) => i + 1); // 1-12 for 12-hour format
    const minutes = [0, 15, 30, 45];

    // Convert 24-hour format to 12-hour format for display
    const getCurrentHour12 = () => {
      if (!currentValue) return 9;
      const hour24 = parseInt(currentValue.split(":")[0]);
      if (hour24 === 0) return 12; // Midnight
      if (hour24 > 12) return hour24 - 12; // PM hours
      return hour24; // AM hours
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
      handleTimeChange(dayKey, timeType, timeString);
    };

    return (
      <div className="absolute top-full left-0 mt-2 bg-white border border-border rounded-[8px] shadow-lg p-4 z-50 w-[280px]">
        <div className="flex gap-4 mb-4">
          {/* Hours */}
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

          {/* Minutes */}
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

          {/* AM/PM */}
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
            className="flex-1 px-4 py-2 text-[14px] font-semibold text-text-secondary border border-border rounded-[8px] hover:bg-input-bg"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 px-4 py-2 text-[14px] font-semibold text-white bg-primary rounded-[8px] hover:bg-primary/90"
          >
            Apply
          </button>
        </div>
      </div>
    );
  };

  const formatTime = (time: string) => {
    if (!time) return "09:00 AM";
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const displayHour = hours % 12 || 12;
    return `${displayHour.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;
  };

  return (
    <div className="flex flex-col gap-8 px-10 py-5">
      {/* Step Header - 20% width */}
      <StepHeader
        title="Schedule & Availability"
        description="Set the working schedule for the employee"
        onBack={onBack}
      />

      {/* Form - 50% width on md screens */}
      <div className="w-full md:w-[50%] flex flex-col">
        {days.map((day, index) => {
          const dayData = formData[day.key as keyof typeof formData];

          return (
            <React.Fragment key={day.key}>
              {/* Day Row */}
              <div className="py-4 flex items-center justify-between">
                {/* Left Section: Toggle + Day Name */}
                <div className="flex items-center gap-3">
                  {/* Toggle */}
                  <button
                    type="button"
                    onClick={() => handleToggleDay(day.key)}
                    className={`
                      relative w-8 h-5 rounded-full transition-all duration-300
                      ${dayData.isWorking ? "bg-primary" : "bg-gray-300"}
                    `}
                  >
                    <div
                      className={`
                        absolute top-[3.5px] left-0.5 w-3 h-3 rounded-full bg-white
                        transition-all duration-300 shadow-sm
                        ${dayData.isWorking ? "left-[15px]" : "left-1"}
                      `}
                    />
                  </button>

                  {/* Day Name */}
                  <span className="text-[16px] font-semibold text-text-primary">
                    {day.label}
                  </span>
                </div>

                {/* Right Section: Time Buffers or Not Working Text */}
                {dayData.isWorking ? (
                  <div className="flex items-center gap-3">
                    {/* Start Time Buffer */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setShowTimePicker({ day: day.key, type: "start" })
                        }
                        className="px-4 py-[11px] border border-border bg-input-bg rounded-lg flex items-center justify-between gap-4 hover:border-border-active transition-colors"
                      >
                        <span className="text-[16px] text-text-secondary">
                          {formatTime(dayData.startTime)}
                        </span>
                        <IconWrapper
                          iconName="clock-circle"
                          size={20}
                          className="text-text-primary"
                        />
                      </button>
                      {showTimePicker?.day === day.key &&
                        showTimePicker?.type === "start" && (
                          <TimePickerPopup
                            dayKey={day.key}
                            timeType="start"
                            currentValue={dayData.startTime}
                          />
                        )}
                    </div>

                    {/* "to" Text */}
                    <span className="text-[14px] text-text-secondary">to</span>

                    {/* End Time Buffer */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setShowTimePicker({ day: day.key, type: "end" })
                        }
                        className="px-4 py-[11px] border border-border bg-input-bg rounded-lg flex items-center justify-between gap-4 hover:border-border-active transition-colors"
                      >
                        <span className="text-[16px] text-text-secondary">
                          {formatTime(dayData.endTime)}
                        </span>
                        <IconWrapper
                          iconName="clock-circle"
                          size={20}
                          className="text-text-primary"
                        />
                      </button>
                      {showTimePicker?.day === day.key &&
                        showTimePicker?.type === "end" && (
                          <TimePickerPopup
                            dayKey={day.key}
                            timeType="end"
                            currentValue={dayData.endTime}
                          />
                        )}
                    </div>
                  </div>
                ) : (
                  <span className="text-[14px] text-text-secondary">
                    Not working on this day
                  </span>
                )}
              </div>

              {/* Divider Line (except after last day) */}
              {index < days.length - 1 && <div className="h-[1px] bg-border" />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleAvailabilityStep;
