import { useEffect, useState } from 'react';
import { clientFetchArticles } from '../../api/clientApis';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoadingState } from '../../store/slice/loadingSlice';
import useMessage from '../../hooks/useMessage';
import ArticleCard from '../../components/article/ArticleCard';
import Pagination from '../../components/Pagination';
import { useCallback } from 'react';

const ArticlePage = () => {
    const [articles, setArticles] = useState([]);
    const [pagination, setPagination] = useState({});
    const loading = useSelector((state) => state.loading);
    const dispatch = useDispatch();
    const { inputToastMessage } = useMessage();

    const handleFetchArticles = useCallback(async (page) => {
        try {
            dispatch(updateLoadingState(true));
            const result = await clientFetchArticles(page);
            setArticles(result?.data?.articles);
            setPagination(result?.data?.pagination);
            dispatch(updateLoadingState(false));
        } catch (error) {
            inputToastMessage(error?.response?.data);
            dispatch(updateLoadingState(false));
        }
    }, []);

    useEffect(() => {
        handleFetchArticles();
    }, [handleFetchArticles]);

    return (
        <div className='container mt-5 py-3 mb-3'>
            {loading.isLoading ? (
                <div>資料加載中</div>
            ) : articles.length ? (
                <>
                    <div className='row flex-column-reverse flex-md-row'>
                        <div className='col-12 col-md-12'>
                            <div className='row g-3 '>
                                {articles?.map((items, index) => (
                                    <div className='col-12 col-md-6 col-lg-4 col-xl-3' key={index}>
                                        <ArticleCard article={items} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* <div className='col-12 col-md-3'>分類欄位</div> */}
                    </div>
                    <div className='mt-5'>
                        <Pagination
                            changePage={handleFetchArticles}
                            totalPage={pagination.total_pages}
                            currentPage={pagination.current_page}
                            isPre={pagination.has_pre}
                            isNext={pagination.has_next}
                        />
                    </div>
                </>
            ) : (
                <div>目前尚無文章</div>
            )}
        </div>
    );
};
export default ArticlePage;
