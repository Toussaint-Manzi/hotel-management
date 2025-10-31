import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AttendanceState {
  attendance: any[];
  loading: boolean;
  error: string | null;
}

const initialState: AttendanceState = {
  attendance: [],
  loading: false,
  error: null,
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAttendance: (state, action: PayloadAction<any[]>) => {
      state.attendance = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoading, setAttendance, setError, clearError } =
  attendanceSlice.actions;
export default attendanceSlice.reducer;
