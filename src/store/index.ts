import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "./services/crypto.api";
import appReducer from "./appSlice"

export const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    app: appReducer
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat(cryptoApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch