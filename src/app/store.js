import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import { apiSlice } from "./api/apiSlice";
import ThemeSlice from "../features/theme/themeSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: ThemeSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
