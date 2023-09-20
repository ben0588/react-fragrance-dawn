import { createSlice } from '@reduxjs/toolkit';

const expSlice = createSlice({
    name: 'exp',
    initialState: {
        exp: '',
        uid: '',
    },
    reducers: {
        createExpLog(state, action) {
            state.exp = action.payload.exp;
            state.uid = action.payload.uid;
        },
        removerExpLog() {
            return {
                exp: '',
                uid: '',
            };
        },
    },
});

export const { createExpLog, removerExpLog } = expSlice.actions;

export default expSlice.reducer;
