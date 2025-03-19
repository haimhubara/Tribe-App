import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; 
import usersReducer from "./userSlice"; 

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer
    }
});
