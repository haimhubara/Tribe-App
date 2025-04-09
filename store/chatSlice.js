import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chats',
  initialState: {
    chatsData: {}
  },
  reducers: {
    setChatsData: (state, action) => {
      state.chatsData = { ...action.payload.chatsData };
    },
    removeChat: (state, action) => {
      const chatIdToRemove = action.payload.chatId;
      delete state.chatsData[chatIdToRemove];
    },
    updateChat: (state, action) => {
        const chat = action.payload.chat;
        state.chatsData[chat.key] = chat;
      }
      
  }
});

export const { setChatsData, removeChat,updateChat } = chatSlice.actions;

export default chatSlice.reducer;
