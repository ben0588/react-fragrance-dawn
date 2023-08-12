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
    // extraReducers: (builder) => {
    //     builder.addCase('persist/PURGE', (state, action) => {
    //         // 在 persistor.purge() 完成後觸發的 action
    //         // 在這裡可以重置需要重新渲染的 state
    //         return [];
    //     });
    // },
});

export const { addToWishlist, removeWishlist, removeAllWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
