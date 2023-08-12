import { createSlice } from '@reduxjs/toolkit';

export const sortingSlice = createSlice({
    name: 'sorting',
    initialState: {
        sorting: '建議', // 未來改成銷售最高為預設值
    },
    reducers: {
        updateSorting(state, action) {
            state.sorting = action.payload;
        },
        removeSorting(state, action) {
            return {
                sorting: '建議',
            };
        },
    },
});

export const { updateSorting, removeSorting } = sortingSlice.actions;

export default sortingSlice.reducer;
