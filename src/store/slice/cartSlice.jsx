import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addToCart(state, action) {
            const index = state.findIndex((product) => product.product_id === action.payload.product_id);
            if (index === -1) {
                state.push(action.payload); // 主要用來記數，因購物是用 api 呼叫
            }
        },
        deleteCart(state, action) {
            const index = state.findIndex((product) => product.product_id === action.payload);
            state.splice(index, 1);
        },
        removeCarts(state, action) {
            return [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase('persist/PURGE', (state, action) => {
            return [];
        });
    },
});

export const { addToCart, deleteCart, removeCarts } = cartSlice.actions;

export default cartSlice.reducer;
