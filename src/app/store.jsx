import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import storage from "redux-persist/lib/storage/"; // defaults to localStorage for web
import { persistStore, persistReducer } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // By using this middleware we are preventing serializer problem.
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
export default store;
