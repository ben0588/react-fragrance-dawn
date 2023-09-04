import { createSlice } from '@reduxjs/toolkit';

export const couponSlice = createSlice({
    name: 'coupon',
    initialState: {
        isLoading: false,
        isSelected: false,
        code: '',
        total: '',
        finalTotal: '',
    },

    reducers: {
        updateLoading(state, action) {
            state.isLoading = action.payload;
        },
        updateCoupon(state, action) {
            state.isLoading = action.payload.isLoading;
            state.code = action.payload.code;
            state.isSelected = action.payload.isSelected;
            state.finalTotal = action.payload.finalTotal;
        },
        updateTotal(state, action) {
            state.total = action.payload.total;
            state.finalTotal = action.payload.finalTotal;
        },
        updateCode(state, action) {
            // state.code = action.payload;
            state.isSelected = action.payload;
        },
        removeCoupon(state, action) {
            return {
                isLoading: false,
                isSelected: false,
                code: '',
                total: '',
                finalTotal: '',
            };
        },
    },
});

export const { updateLoading, updateCoupon, updateTotal, updateCode, removeCoupon } = couponSlice.actions;

export default couponSlice.reducer;
