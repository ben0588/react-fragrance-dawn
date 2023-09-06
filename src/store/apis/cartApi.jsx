import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_BASE_API_URL,
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints(builder) {
        return {
            fetchCarts: builder.query({
                providesTags: () => {
                    return ['Carts'];
                },
                query: () => {
                    return {
                        url: `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/cart`,
                        method: 'GET',
                    };
                },
            }),
            addToCart: builder.mutation({
                invalidatesTags: () => {
                    return ['Carts'];
                },
                query: (data) => {
                    return {
                        url: `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/cart`,
                        method: 'POST',
                        body: {
                            data,
                        },
                    };
                },
            }),
            updateCart: builder.mutation({
                invalidatesTags: () => {
                    return ['Carts'];
                },
                query: ({ id, data }) => {
                    return {
                        url: `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/cart/${id}`,
                        method: 'PUT',
                        body: {
                            data,
                        },
                    };
                },
            }),
            deleteCart: builder.mutation({
                invalidatesTags: () => {
                    return ['Carts'];
                },
                query: (id) => {
                    return {
                        url: `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/cart/${id}`,
                        method: 'DELETE',
                    };
                },
            }),
            removeCarts: builder.mutation({
                invalidatesTags: () => {
                    return ['Carts'];
                },
                query: () => {
                    return {
                        url: `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/carts`,
                        method: 'DELETE',
                    };
                },
            }),
        };
    },
});

export const {
    useFetchCartsQuery,
    useAddToCartMutation,
    useUpdateCartMutation,
    useDeleteCartMutation,
    useRemoveCartsMutation,
} = cartApi;

export { cartApi };
