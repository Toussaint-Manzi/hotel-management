import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/auth.slice";
import employeeReducer from "./features/employee.slice";
import facilitiesReducer from "./features/facilities.slice";
import packagesReducer from "./features/packages.slice";
import membershipsReducer from "./features/memberships.slice";
import positionsReducer from "./features/positions.slice";
import attendanceReducer from "./features/attendance.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  employee: employeeReducer,
  facilities: facilitiesReducer,
  packages: packagesReducer,
  memberships: membershipsReducer,
  positions: positionsReducer,
  attendance: attendanceReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
