import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import orderReducer from "../features/orders/orderSlice";
import jobReducer from "../features/jobs/jobSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		orders: orderReducer,
		jobs: jobReducer,
	},
});
