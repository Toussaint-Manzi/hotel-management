import {
  loginApi,
  forgotPasswordApi,
  resetPasswordApi,
} from "@/api/auth/auth.api";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ACCESS_TOKEN_KEY } from "@/lib/constants/common";

interface AuthState {
  user: any;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res: any = await loginApi(payload);
      try {
        if (res?.access) {
          localStorage.setItem(ACCESS_TOKEN_KEY, res.access);
        }
        if (res?.refresh) {
          localStorage.setItem("HOTEL_REFRESH_TOKEN", res.refresh);
        }
      } catch (err) {
        // ignore localStorage errors in environments where it's not available
      }

      return res;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const res = await forgotPasswordApi(email);
      return res;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (payload: { password: string; token: string }, { rejectWithValue }) => {
    try {
      const res = await resetPasswordApi(payload);
      return res;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      try {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem("HOTEL_REFRESH_TOKEN");
      } catch (e) {
        // ignore in non-browser environments
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload?.profile || null;
        state.token = action.payload?.access || null;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        const payload: any = action.payload;
        console.log("Login rejected action:", typeof payload.message);
        state.error = payload.message || "Login failed";
        state.isAuthenticated = false;
      });
    // .addCase(forgotPassword.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(
    //   forgotPassword.fulfilled,
    //   (state, action: PayloadAction<{ message?: string }>) => {
    //     state.loading = false;
    // )
    // .addCase(
    //   forgotPassword.rejected,
    //   (state, action: PayloadAction<unknown>) => {
    //     state.loading = false;
    // )
    // .addCase(resetPassword.pending, (state) => {
    //   state.loading = true;
    // })
    // .addCase(
    //   resetPassword.fulfilled,
    //   (state, action: PayloadAction<{ message?: string }>) => {
    //     state.loading = false;
    //   }
    // )
    // .addCase(
    //   resetPassword.rejected,
    //   (state, action: PayloadAction<unknown>) => {
    //     state.loading = false;
    //   }
    // );
  },
});

export const {
  logout,
  // updateOnboardingStatus,
  // resetForgotPasswordState,
  // resetResetPasswordState,
} = authSlice.actions;
export default authSlice.reducer;
