import axios from 'axios';

// ----- Admin 管理者 Article API -----
// 因為 Admin 管理者原本的 API 管理太多，開啟後台一次呼叫太多隻 API，Vite 跳出警告，故將此 API 獨立出來
export const adminFetchLimitedArticles = async (page) => {
    const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/articles?page=${page}`;
    const response = await axios.get(fetchApiUrl);
    return response.data;
};

export const adminFetchArticle = async (id) => {
    const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/article/${id}`;
    const response = await axios.get(fetchApiUrl);
    return response.data;
};

export const adminCreateArticle = async (data) => {
    const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/article`;
    const response = await axios.post(fetchApiUrl, data);
    return response.data;
};

export const adminPutArticle = async (data, id) => {
    const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/article/${id}`;
    const response = await axios.put(fetchApiUrl, data);
    return response.data;
};

export const adminDeleteArticle = async (id) => {
    const fetchApiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/article/${id}`;
    const response = await axios.delete(fetchApiUrl);
    return response.data;
};
