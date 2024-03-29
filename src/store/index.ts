import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "./services/crypto.api";
import appReducer from "./slices/appSlice"
import sortReducer from "./slices/sortSlice"

export const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    app: appReducer,
    sort: sortReducer
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat(cryptoApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch