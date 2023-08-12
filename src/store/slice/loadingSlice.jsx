import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        isLoading: false,
    },
    reducers: {
        updateLoadingState(state, action) {
            state.isLoading = action.payload;
        },
    },
});

export const { updateLoadingState } = loadingSlice.actions;

export default loadingSlice.reducer;
