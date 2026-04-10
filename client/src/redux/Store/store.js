import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../Api/authApi";
import { orderApi } from "../Api/orderApi";
import authReducer from "../Slice/authSlice";
import { productApi } from "../Api/productAPi";

const reduxStore = configureStore({
  reducer: {
    auth: authReducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      authApi.middleware,
      orderApi.middleware
    ),
});

export default reduxStore;
