import { createSlice } from '@reduxjs/toolkit';

export const bulletinSlice = createSlice({
    name: 'bulletin',
    initialState: {
        open: true,
    },
    reducers: {
        updateBulletinState(state, action) {
            state.open = action.payload;
        },
    },
});

export const { updateBulletinState } = bulletinSlice.actions;

export default bulletinSlice.reducer;
