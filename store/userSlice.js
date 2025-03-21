import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
    name: 'users',
    initialState: {
        storedUsers: {}
    },
    reducers: {
        setStoredUsers: (state, action) => {
            const newUsers = action.payload.newUsers;
            
            for (const userId in newUsers) {
                state.storedUsers[userId] = newUsers[userId];
            }
        }
    }
});


export const { setStoredUsers } = userSlice.actions;
export default userSlice.reducer;
