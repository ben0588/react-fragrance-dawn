import { createSlice } from '@reduxjs/toolkit';

export const pageSlice = createSlice({
    name: 'page',
    initialState: { page: '' },
    reducers: {
        createPage(state, action) {
            state.page = action.payload;
        },
    },
});

export const { createPage } = pageSlice.actions;

export default pageSlice.reducer;
