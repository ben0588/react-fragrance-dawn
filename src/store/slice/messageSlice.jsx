import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const messageSlice = createSlice({
    name: 'message',
    initialState: [
        {
            id: '',
            type: '',
            title: '',
            text: '',
            open: false,
        },
    ],
    reducers: {
        createMessage(state, action) {
            if (action.payload.success) {
                state.push({
                    id: action.payload.id,
                    type: 'success',
                    title: '成功',
                    text: action.payload.message,
                    open: true,
                });
            } else {
                state.push({
                    id: action.payload.id,
                    type: 'danger',
                    title: '失敗',
                    text: action.payload.message,
                    open: true,
                });
            }
        },
        removeMessage(state, action) {
            const index = state.findIndex((item) => item.id === action.payload.id);
            state.splice(index, 1);
        },
        closeMessage(state, action) {
            const index = state.findIndex((item) => item.id === action.payload.id);
            state[index].open = action.payload.open;
        },
    },
});

export const createAsyncMessage = createAsyncThunk(
    'message/createAsyncMessage',
    async function (payload, { dispatch, requestId }) {
        dispatch(
            messageSlice.actions.createMessage({
                ...payload,
                id: requestId,
            })
        );
        setTimeout(() => {
            dispatch(messageSlice.actions.removeMessage({ id: requestId }));
        }, 3300);
    }
);

export const { createMessage, closeMessage } = messageSlice.actions;

export default messageSlice.reducer;
