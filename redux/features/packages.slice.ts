import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PackagesState {
  packages: any[];
  loading: boolean;
  error: string | null;
}

const initialState: PackagesState = {
  packages: [],
  loading: false,
  error: null,
};

const packagesSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setPackages: (state, action: PayloadAction<any[]>) => {
      state.packages = action.payload;
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

export const { setLoading, setPackages, setError, clearError } =
  packagesSlice.actions;
export default packagesSlice.reducer;
