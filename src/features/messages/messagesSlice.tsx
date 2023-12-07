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

const initialState = {
    messages: [],
    parameters: {
        frequency: 1,
        machine_id: '',
        device_id: '',
        average: null,
        standardVariation: null,
    },
};

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages: (state, action) => {
            const { topic, message } = action.payload;
            const parsedMessage = cleanAndParse(message);

            if (parsedMessage !== null) {
                state.messages = [...state.messages, { topic: topic, message: parsedMessage }];
            }
        },
        setParameters: (state, action) => {
            const { machine_id, device_id, frequency, average, standardVariation } = action.payload;
            state.parameters = {
                ...state.parameters,
                machine_id,
                device_id,
                frequency: parseInt(frequency),
                average: parseInt(average),
                standardVariation: parseInt(standardVariation),
            };
        },
    },
});

export const { setMessages, setParameters } = messagesSlice.actions;
export default messagesSlice.reducer;
