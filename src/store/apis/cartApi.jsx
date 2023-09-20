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
                providesTags: (result) => {
                    const tags = result.data.carts.map((cart) => {
                        return { type: 'Cart', id: cart.id };
                    });
                    tags.push({ type: 'Carts' });
                    return tags;
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
                    return [{ type: 'Carts' }];
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
                    return [{ type: 'Carts' }];
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
                    return [{ type: 'Carts' }];
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
                    return [{ type: 'Carts' }];
                },
                query: () => {
                    return {
                        url: `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/carts`,
                        method: 'DELETE',
                    };
                },
            }),
            AddCouponCart: builder.mutation({
                invalidatesTags: () => {
                    return [{ type: 'Carts' }];
                },
                query: (data) => {
                    return {
                        url: `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/coupon`,
                        method: 'POST',
                        body: {
                            data,
                        },
                    };
                },
            }),
            createOrder: builder.mutation({
                invalidatesTags: () => {
                    return [{ type: 'Carts' }, { type: 'Order' }]; // 與 Carts 同組時當建立訂單後會重新呼叫取得購物車
                },
                query: (data) => {
                    return {
                        url: `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/order`,
                        method: 'POST',
                        body: {
                            ...data,
                        },
                    };
                },
            }),
            fetchOrders: builder.query({
                providesTags: () => {
                    return [{ type: 'Order' }];
                },
                query: (page = 0) => {
                    return {
                        url: `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/orders?page=${page}`,
                        method: 'GET',
                    };
                },
            }),
            fetchOrder: builder.query({
                invalidatesTags: () => {
                    return [{ type: 'Order' }];
                },
                query: (orderId) => {
                    return {
                        url: `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/order/${orderId}`,
                        method: 'GET',
                    };
                },
            }),
            paymentOrder: builder.mutation({
                invalidatesTags: () => {
                    return [{ type: 'Order' }];
                },
                query: (orderId) => {
                    return {
                        url: `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/pay/${orderId}`,
                        method: 'POST',
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
    useAddCouponCartMutation,
    useCreateOrderMutation,
    useFetchOrdersQuery,
    useFetchOrderQuery,
    usePaymentOrderMutation,
} = cartApi;

export { cartApi };
