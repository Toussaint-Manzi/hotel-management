"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/type";
import { setLoading } from "@/redux/features/employee.slice";
import LoadingState from "@/components/organisms/states/loading-state/LoadingState";
import EmptyState from "@/components/organisms/states/empty-state/EmptyState";
import { useRouter } from "next/navigation";

export default function EmployeesPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { employees, loading, error } = useAppSelector(
    (state) => state.employee
  );

  useEffect(() => {
    // Simulate loading state (remove when API is ready)
    dispatch(setLoading(true));

    // Simulate API call delay
    const timer = setTimeout(() => {
      dispatch(setLoading(false));
    }, 1500);

    return () => clearTimeout(timer);
  }, [dispatch]);

  if (loading) {
    return (
      <LoadingState
        title="Loading employees..."
        subtitle="Please wait while we fetch employee data."
      />
    );
  }

  if (error) {
    return <EmptyState title="Error" subtitle={error} showButton={false} />;
  }

  if (employees.length === 0) {
    return (
      <EmptyState
        title="No employees  records yet!"
        subtitle="No employees registered yet. Start by adding your first team member."
        buttonLabel="Add Employee"
        onButtonClick={() => {
          router.push("/employees/add");
        }}
        icon={"user-plus"}
      />
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Employees</h1>
      {/* Employee list will go here when API is ready */}
    </div>
  );
}
