import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectAuthToken } from '../slice/adminSlice';

const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_BASE_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const authToken = selectAuthToken(getState());
            headers.set('Content-Type', 'application/json');
            headers.set('Authorization', authToken);
            return headers;
        },
    }),
    endpoints(builder) {
        return {
            adminLogin: builder.mutation({
                invalidatesTags: (result, error, admin) => {
                    return [{ type: 'adminApi', id: result.uid }];
                },
                query: (admin) => {
                    return {
                        url: '/v2/admin/signin',
                        method: 'POST',
                        body: {
                            ...admin,
                        },
                    };
                },
            }),
            adminLogout: builder.mutation({
                invalidatesTags: (result, error, admin) => {
                    return [{ type: 'adminApi', id: admin }];
                },
                query: () => {
                    return {
                        url: '/v2/logout',
                        method: 'POST',
                    };
                },
            }),
            adminCheck: builder.mutation({
                invalidatesTags: (result, error, admin) => {
                    return [{ type: 'adminApi', id: admin }];
                },
                query: () => {
                    return {
                        url: '/v2/api/user/check',
                        method: 'POST',
                    };
                },
            }),
        };
    },
});

export const { useAdminLoginMutation, useAdminLogoutMutation, useAdminCheckMutation } = adminApi;

export { adminApi };
