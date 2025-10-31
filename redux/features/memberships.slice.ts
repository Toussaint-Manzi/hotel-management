import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MembershipsState {
  memberships: any[];
  loading: boolean;
  error: string | null;
}

const initialState: MembershipsState = {
  memberships: [],
  loading: false,
  error: null,
};

const membershipsSlice = createSlice({
  name: "memberships",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setMemberships: (state, action: PayloadAction<any[]>) => {
      state.memberships = action.payload;
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

export const { setLoading, setMemberships, setError, clearError } =
  membershipsSlice.actions;
export default membershipsSlice.reducer;
