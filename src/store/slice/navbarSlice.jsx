import { createSlice } from '@reduxjs/toolkit';

export const navbarSlice = createSlice({
    name: 'navbar',
    initialState: {
        height: 'auto',
    },
    reducers: {
        createNavbarHeight(state, action) {
            state.height = action.payload;
        },
    },
});

export const { createNavbarHeight } = navbarSlice.actions;

export default navbarSlice.reducer;
