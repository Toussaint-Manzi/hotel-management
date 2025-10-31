import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FacilitiesState {
  facilities: any[];
  loading: boolean;
  error: string | null;
}

const initialState: FacilitiesState = {
  facilities: [],
  loading: false,
  error: null,
};

const facilitiesSlice = createSlice({
  name: "facilities",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setFacilities: (state, action: PayloadAction<any[]>) => {
      state.facilities = action.payload;
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

export const { setLoading, setFacilities, setError, clearError } =
  facilitiesSlice.actions;
export default facilitiesSlice.reducer;
