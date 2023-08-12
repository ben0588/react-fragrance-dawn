import { createSlice } from '@reduxjs/toolkit';

export const popularSlice = createSlice({
    name: 'popular',
    initialState: {
        id: '',
        title: '',
        content: '',
        description: '',
    },
    reducers: {
        updatePopular(state, action) {
            return {
                id: action.payload.id,
                title: action.payload.title,
                content: action.payload.content,
                description: action.payload.description,
            };
        },
    },
});

export const { updatePopular } = popularSlice.actions;

export default popularSlice.reducer;
