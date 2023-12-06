import { createSlice } from '@reduxjs/toolkit';

function cleanAndParse(message: string) {
    const cleanedMessage = message
        .replace(/\s+/g, '')
        .replace(/\\/g, '')
        .replace(/,(?=\s*})/, '');
    const parsedObject = JSON.parse(cleanedMessage);
    try {
        return parsedObject;
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return null;
    }
}

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: [],
    },
    reducers: {
        setMessages: (state, action) => {
            const { topic, message } = action.payload;
            const parsedMessage = cleanAndParse(message);

            if (parsedMessage !== null) {
                state.messages = [...state.messages, { topic: topic, message: parsedMessage }];
            }
        },
    },
});

export const { setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
