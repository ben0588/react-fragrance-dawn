import axios from 'axios';

// ----- Admin 管理者 Login API -----
export const adminSignIns = async (user) => {
    const adminSignInsApiUrl = `/v2/admin/signin`;
    const response = await axios.post(adminSignInsApiUrl, user);
    return response.data;
};

export const adminCheckAuth = async () => {
    const checkLoginStateApiUrl = `${import.meta.env.VITE_BACKEND_BASE_API_URL}/v2/api/user/check`;
    const response = await axios.post(checkLoginStateApiUrl);
    return response.data;
};

export const adminLogout = async () => {
    const adminLogoutApiUrl = `${import.meta.env.VITE_BACKEND_BASE_API_URL}/v2/logout`;
    const response = await axios.post(adminLogoutApiUrl);
    return response.data;
};

// ----- Admin 管理者 Product API -----
export const adminFetchAllProducts = async () => {
    const adminFetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/products/all`;
    const response = await axios.get(adminFetchApiUrl);
    return response.data;
};

export const adminFetchLimitedProducts = async (page, category) => {
    const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/products?page=${page}${
        category ? '&category=' + category : ''
    }`;
    const response = await axios.get(fetchApiUrl);
    return response.data;
};

export const adminAddProduct = async (data) => {
    const addProductApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/product`;
    const response = await axios.post(addProductApiUrl, {
        data,
    });
    return response.data;
};

export const adminPutProduct = async (data, id) => {
    const addProductApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/product/${id}`;
    const response = await axios.put(addProductApiUrl, {
        data,
    });
    return response.data;
};

export const adminDeleteProduct = async (id) => {
    const addProductApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/product/${id}`;
    const response = await axios.delete(addProductApiUrl);
    return response.data;
};

// ----- Admin 管理者 Coupons API -----
export const adminFetchLimitedCoupons = async (page) => {
    const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/coupons?page=${page}`;
    const response = await axios.get(fetchApiUrl);
    return response.data;
};

export const adminAddCoupon = async (data) => {
    const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/coupon`;
    const response = await axios.post(fetchApiUrl, {
        data,
    });
    return response.data;
};

export const adminPutCoupon = async (data, id) => {
    const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/coupon/${id}`;
    const response = await axios.put(fetchApiUrl, {
        data,
    });
    return response.data;
};

export const adminDeleteCoupon = async (id) => {
    const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/coupon/${id}`;
    const response = await axios.delete(fetchApiUrl);
    return response.data;
};

// ----- Admin 管理者 Orders API -----
export const adminFetchLimitedOrders = async (page) => {
    const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/orders?page=${page}`;
    const response = await axios.get(fetchApiUrl);
    return response.data;
};

export const adminPutOrder = async (id, data) => {
    const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/order/${id}`;
    const response = await axios.put(fetchApiUrl, data);
    return response.data;
};

export const adminDeleteAllOrders = async () => {
    const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/orders/all`;
    const response = await axios.delete(fetchApiUrl);
    return response.data;
};

export const adminDeleteOrder = async (id) => {
    const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/order/${id}`;
    const response = await axios.delete(fetchApiUrl);
    return response.data;
};
