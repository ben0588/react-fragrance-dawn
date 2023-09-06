import { createSlice } from '@reduxjs/toolkit';

export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        isLogin: false,
        uid: '',
        token: '',
        expired: '',
    },
    reducers: {
        createAdminLogin(state, action) {
            if (action.payload.success) {
                state.isLogin = action.payload.success;
                state.token = action.payload.token;
                state.uid = action.payload.uid;
                state.expired = action.payload.expired;
            }
        },
        checkAdminState(state, action) {
            if (action.payload.success) {
                state.isLogin = action.payload.success;
                state.uid = action.payload.uid;
            }
        },
        removeAdminLogout() {
            return {
                isLogin: false,
                uid: '',
                token: '',
                expired: '',
            };
        },
    },
});

export const { createAdminLogin, checkAdminState, removeAdminLogout } = adminSlice.actions;

export const selectAuthToken = (state) => state.admin.token;

export default adminSlice.reducer;
