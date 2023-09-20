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
