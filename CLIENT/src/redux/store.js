import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["Auth"], 
};

const persistedAuthReducer = persistReducer(persistConfig, AuthReducer);

export const store = configureStore({
  reducer: {
    Auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
