import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import LabReducer from "./LabSlice";
import CartReducer from "./CartSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

// Persist Configs
const authPersistConfig = {
  key: "auth",
  storage,
};

const cartPersistConfig = {
  key: "cart",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, AuthReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, CartReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    lab: LabReducer,
    cart: persistedCartReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
