import { combineReducers, configureStore } from '@reduxjs/toolkit';

import cartReducer from './slice/cartSlice';
import messageReducer from './slice/messageSlice';
import adminReducer from './slice/adminSlice';
import navbarReducer from './slice/navbarSlice';
import categoryReducer from './slice/categorySlice';
import wishlistReducer from './slice/wishListSlice';
import searchReducer from './slice/searchSlice';
import sortingReducer from './slice/sortingSlice';
import pageReducer from './slice/pageSlice';
import couponReducer from './slice/couponSlice';
import loadingReducer from './slice/loadingSlice';
import popularReducer from './slice/popularSlice';
import bulletinReducer from './slice/bulletinSlice';
import expReducer from './slice/expSlice';

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { adminApi } from './apis/adminApi';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { cartApi } from './apis/cartApi';

// 將已設定好的 reducer 做整合
const reducers = combineReducers({
    // key：value
    cart: cartReducer,
    message: messageReducer,
    admin: adminReducer,
    navbar: navbarReducer,
    category: categoryReducer,
    wishlist: wishlistReducer,
    search: searchReducer,
    sorting: sortingReducer, // 有銷售排行就取消黑名單
    page: pageReducer,
    coupon: couponReducer,
    loading: loadingReducer,
    popular: popularReducer,
    bulletin: bulletinReducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    exp: expReducer,
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    // stateReconciler: hardSet, // 查看啟動狀態
    blacklist: [
        'category',
        'navbar',
        'message',
        'search',
        'sorting',
        'page',
        'cartPath',
        'loading',
        'popular',
        'admin',
        'cart',
        adminApi.reducerPath,
        cartApi.reducerPath,
        'coupon',
    ], // 設置黑名單
    whitList: ['wishlist', 'bulletin', 'exp'], // 設置白名單
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        // 使用中間件檢查
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
            .concat(adminApi.middleware)
            .concat(cartApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch); // 設置監聽器

export { useAdminLoginMutation, useAdminLogoutMutation, useAdminCheckMutation } from './apis/adminApi';

export {
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
} from './apis/cartApi';
