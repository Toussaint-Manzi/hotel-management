import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PositionsState {
  positions: any[];
  loading: boolean;
  error: string | null;
}

const initialState: PositionsState = {
  positions: [],
  loading: false,
  error: null,
};

const positionsSlice = createSlice({
  name: "positions",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setPositions: (state, action: PayloadAction<any[]>) => {
      state.positions = action.payload;
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

export const { setLoading, setPositions, setError, clearError } =
  positionsSlice.actions;
export default positionsSlice.reducer;
