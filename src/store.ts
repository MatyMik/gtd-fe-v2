import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./Authentication/Authentication.store";
import gtdReducer from "./GTD/GTD.store";
import { api } from "./api/api";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = () => configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    authentication: authenticationReducer,
    gtd: gtdReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
});

const storeInstance = store();

setupListeners(storeInstance.dispatch);

export type RootState = ReturnType<typeof storeInstance.getState>;

export type AppDispatch = typeof storeInstance.dispatch;
