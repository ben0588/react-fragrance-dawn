import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        category: '',
    },
    reducers: {
        changeCategory(state, action) {
            state.category = action.payload;
        },
        removeCategory(state, action) {
            return {
                category: '',
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase('persist/PURGE', (state, action) => {
            return {
                category: '',
            };
        });
    },
});

export const { changeCategory, removeCategory } = categorySlice.actions;

export default categorySlice.reducer;
