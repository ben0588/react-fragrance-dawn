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
                state.expired = action.payload.expired;
            }
        },
        checkAdminState(state, action) {
            if (action.payload.success) {
                state.isLogin = action.payload.success;
                state.uid = action.payload.uid;
            }
        },
        removeAdminLogout(state, action) {
            return {
                isLogin: false,
                uid: '',
                token: '',
                expired: '',
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase('persist/PURGE', (state, action) => {
            // 在 persistor.purge() 完成後觸發的 action
            return {
                isLogin: false,
                uid: '',
                token: '',
                expired: '',
            };
        });
    },
});

export const { createAdminLogin, checkAdminState, removeAdminLogout } = adminSlice.actions;

export default adminSlice.reducer;
