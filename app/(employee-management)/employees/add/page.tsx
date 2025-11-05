"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AddEmployeeHeader from "./(components)/add-employee-header/AddEmployeeHeader";
import BasicInfoStep from "./(components)/basic-info-step/BasicInfoStep";
import ContactAddressStep from "./(components)/contact-address-step/ContactAddressStep";
import WorkDetailsStep from "./(components)/work-details-step/WorkDetailsStep";
import ScheduleAvailabilityStep from "./(components)/schedule-availability-step/ScheduleAvailabilityStep";
import type { BasicInfoFormData } from "./(components)/basic-info-step/BasicInfoStep.types";
import type { ContactAddressFormData } from "./(components)/contact-address-step/ContactAddressStep.types";
import type { WorkDetailsFormData } from "./(components)/work-details-step/WorkDetailsStep.types";
import type { ScheduleAvailabilityFormData } from "./(components)/schedule-availability-step/ScheduleAvailabilityStep.types";

export default function AddEmployeePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [basicInfoData, setBasicInfoData] = useState<BasicInfoFormData>({
    profilePhoto: null,
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    password: "",
    position: "",
  });
  const [contactAddressData, setContactAddressData] =
    useState<ContactAddressFormData>({
      phoneNumber: "",
      nationality: "",
      residenceAddress: "",
    });
  const [workDetailsData, setWorkDetailsData] = useState<WorkDetailsFormData>({
    joiningDate: "",
    contractEndDate: "",
    facilityAccess: [],
  });
  const [scheduleData, setScheduleData] =
    useState<ScheduleAvailabilityFormData>({
      monday: { isWorking: true, startTime: "09:00", endTime: "17:00" },
      tuesday: { isWorking: true, startTime: "09:00", endTime: "17:00" },
      wednesday: { isWorking: true, startTime: "09:00", endTime: "17:00" },
      thursday: { isWorking: true, startTime: "09:00", endTime: "17:00" },
      friday: { isWorking: true, startTime: "09:00", endTime: "17:00" },
      saturday: { isWorking: false, startTime: "09:00", endTime: "17:00" },
      sunday: { isWorking: false, startTime: "09:00", endTime: "17:00" },
    });

  const handleClose = () => {
    router.push("/employees");
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <AddEmployeeHeader
        currentStep={currentStep}
        onClose={handleClose}
        onNextStep={handleNextStep}
      />

      {/* Main Container - will hold step content */}
      <main className="flex-1 overflow-y-auto p-6">
        {currentStep === 1 && (
          <BasicInfoStep
            formData={basicInfoData}
            onFormDataChange={(data) =>
              setBasicInfoData({ ...basicInfoData, ...data })
            }
            onBack={handleBack}
          />
        )}

        {currentStep === 2 && (
          <ContactAddressStep
            formData={contactAddressData}
            onFormDataChange={(data) =>
              setContactAddressData({ ...contactAddressData, ...data })
            }
            onBack={handleBack}
          />
        )}

        {currentStep === 3 && (
          <WorkDetailsStep
            formData={workDetailsData}
            onFormDataChange={(data) =>
              setWorkDetailsData({ ...workDetailsData, ...data })
            }
            onBack={handleBack}
          />
        )}

        {currentStep === 4 && (
          <ScheduleAvailabilityStep
            formData={scheduleData}
            onFormDataChange={(data) =>
              setScheduleData({ ...scheduleData, ...data })
            }
            onBack={handleBack}
          />
        )}
      </main>
    </div>
  );
}
