import { createSlice } from '@reduxjs/toolkit';

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: [],
    reducers: {
        addToWishlist(state, action) {
            state.push(action.payload);
        },
        removeWishlist(state, action) {
            const index = state.findIndex((wish) => wish.id === action.payload);
            state.splice(index, 1);
        },
        removeAllWishlist(state, action) {
            return [];
        },
    },
});

export const { addToWishlist, removeWishlist, removeAllWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
