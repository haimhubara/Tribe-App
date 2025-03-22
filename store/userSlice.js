import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
    name: 'users',
    initialState: {
        storedUsers: {}  // עדיין נשאר כאובייקט
    },
    reducers: {
        setStoredUsers: (state, action) => {
            const newUsers = action.payload.newUsers;
            
            newUsers.forEach(user => {
                state.storedUsers[user.userId] = user; // שומר לפי userId
            });
        }
    }
});



export const { setStoredUsers } = userSlice.actions;
export default userSlice.reducer;
