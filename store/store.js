import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; 
import usersReducer from "./userSlice"; 
import chatsReducer from "./chatSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        chats:chatsReducer
    }
});
