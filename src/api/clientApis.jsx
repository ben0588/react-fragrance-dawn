import axios from 'axios';

// ----- Client 客戶端 Product API -----
export const clientFetchAllProducts = async () => {
    const fetchApiUrl = `v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/products/all`;
    const response = await axios.get(fetchApiUrl);
    return response;
};

export const clientFetchLimitedProducts = async (page = 0) => {
    const fetchApiUrl = `v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/products?page=${page}`;
    const response = await axios.get(fetchApiUrl);
    return response;
};

export const clientFetchCategoryProduct = async (page = 0, category) => {
    const fetchApiUrl = `v2/api/${
        import.meta.env.VITE_BACKEND_BASE_API_PATH
    }/products?page=${page}&category=${category}`;
    const response = await axios.get(fetchApiUrl);
    return response;
};

export const clientFetchProduct = async (id) => {
    const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/product/${id}`;
    const response = await axios.get(fetchApiUrl);
    return response;
};

// ----- Client 客戶端 Cart API -----
export const clientAddToCart = async (data) => {
    const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/cart`;
    const response = await axios.post(fetchApiUrl, { data });
    return response;
};

export const clientFetchCart = async () => {
    const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/cart`;
    const response = await axios.get(fetchApiUrl);
    return response;
};

export const clientPutCart = async (id, data) => {
    const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/cart/${id}`;
    const response = await axios.put(fetchApiUrl, { data });
    return response;
};

export const clientDeleteCart = async (id) => {
    const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/cart/${id}`;
    const response = await axios.delete(fetchApiUrl);
    return response;
};

export const clientDeleteAllCarts = async () => {
    const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/carts`;
    const response = await axios.delete(fetchApiUrl);
    return response;
};

// ----- Client 客戶端 Coupon API -----
export const clientUseCoupon = async (data) => {
    const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/coupon`;
    const response = await axios.post(fetchApiUrl, { data });
    return response;
};

// ----- Client 客戶端 Order API -----
export const clientCreateOrder = async (data) => {
    const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/order`;
    const response = await axios.post(fetchApiUrl, data);
    return response;
};

export const clientFetchLimitedOrders = async (page = 0) => {
    const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/orders?page=${page}`;
    const response = await axios.get(fetchApiUrl);
    return response;
};

export const clientFetchOrder = async (id) => {
    const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/order/${id}`;
    const response = await axios.get(fetchApiUrl);
    return response;
};

// ----- Client 客戶端 Payment API -----
export const clientPaymentOrder = async (id) => {
    const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/pay/${id}`;
    const response = await axios.post(fetchApiUrl);
    return response;
};

// ----- Client 客戶端 Article API -----
export const clientFetchArticles = async (page = 0) => {
    const fetchApiUrl = `v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/articles?page=${page}`;
    const response = await axios.get(fetchApiUrl);
    return response;
};

export const clientFetchArticle = async (id) => {
    const fetchApiUrl = `v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/article/${id}`;
    const response = await axios.get(fetchApiUrl);
    return response;
};
