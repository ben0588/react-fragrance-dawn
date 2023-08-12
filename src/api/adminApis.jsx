import axios from 'axios';
// axios.defaults.baseURL = import.meta.env.VITE_BACKEND_BASE_API_URL; // main.jsx already set

// const config = {
//     headers: {
//         Authorization: ``,
//     },
// };

// ----- Admin 管理者 Login API -----
export const AdminSignIns = async (user) => {
    try {
        const adminSignInsApiUrl = `/v2/admin/signin`;
        const response = await axios.post(adminSignInsApiUrl, user);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const AdminCheckAuth = async () => {
    try {
        const checkLoginStateApiUrl = `${import.meta.env.VITE_BACKEND_BASE_API_URL}/v2/api/user/check`;
        const response = await axios.post(checkLoginStateApiUrl);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const AdminLogout = async () => {
    try {
        const adminLogoutApiUrl = `${import.meta.env.VITE_BACKEND_BASE_API_URL}/v2/logout`;
        const response = await axios.post(adminLogoutApiUrl);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ----- Admin 管理者 Product API -----
export const AdminFetchAllProducts = async () => {
    try {
        const adminFetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/products/all`;
        const response = await axios.get(adminFetchApiUrl);
        return response.data;
        // const result = await AdminFetchAllProducts();
        // const objectToArray = Object.entries(result.products); // 資料是物件先轉陣列
        // const newList = objectToArray.map((item) => item[1]);
    } catch (error) {
        throw error;
    }
};

export const adminFetchLimitedProducts = async (page) => {
    try {
        const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/products?page=${page}`;
        const response = await axios.get(fetchApiUrl);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const adminAddProduct = async (data) => {
    try {
        const addProductApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/product`;
        const response = await axios.post(addProductApiUrl, {
            data,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const adminPutProduct = async (data, id) => {
    try {
        const addProductApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/product/${id}`;
        const response = await axios.put(addProductApiUrl, {
            data,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const adminDeleteProduct = async (id) => {
    try {
        const addProductApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/product/${id}`;
        const response = await axios.delete(addProductApiUrl);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ----- Admin 管理者 Coupons API -----
export const adminFetchLimitedCoupons = async (page) => {
    try {
        const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/coupons?page=${page}`;
        const response = await axios.get(fetchApiUrl);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const adminAddCoupon = async (data) => {
    try {
        const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/coupon`;
        const response = await axios.post(fetchApiUrl, {
            data,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const adminPutCoupon = async (data, id) => {
    try {
        const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/coupon/${id}`;
        const response = await axios.put(fetchApiUrl, {
            data,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const adminDeleteCoupon = async (id) => {
    try {
        const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/coupon/${id}`;
        const response = await axios.delete(fetchApiUrl);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ----- Admin 管理者 Orders API -----
export const adminFetchLimitedOrders = async (page) => {
    try {
        const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/orders?page=${page}`;
        const response = await axios.get(fetchApiUrl);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const adminPutOrder = async (id, data) => {
    try {
        const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/order/${id}`;
        const response = await axios.put(fetchApiUrl, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const adminDeleteAllOrders = async () => {
    try {
        const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/orders/all`;
        const response = await axios.delete(fetchApiUrl);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const adminDeleteOrder = async (id) => {
    try {
        const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/order/${id}`;
        const response = await axios.delete(fetchApiUrl);
        return response.data;
    } catch (error) {
        throw error;
    }
};