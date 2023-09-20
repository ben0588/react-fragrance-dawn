import { useNavigate, useParams } from 'react-router-dom';
import { clientFetchArticle, clientFetchCategoryProduct } from '../../api/clientApis';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoadingState } from '../../store/slice/loadingSlice';
import useMessage from '../../hooks/useMessage';
import RecommendCarousel from '../../components/home/RecommendCarousel';

const ArticleDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState({});
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading);
    const { inputToastMessage } = useMessage();
    const [products, setProducts] = useState([]);

    const handleFetchArticle = useCallback(async () => {
        try {
            dispatch(updateLoadingState(true));
            const result = await clientFetchArticle(id);
            setArticle(result?.data?.article);
            dispatch(updateLoadingState(false));
        } catch (error) {
            inputToastMessage(error?.response?.data);
            dispatch(updateLoadingState(false));
        }
    }, [dispatch, inputToastMessage, id]);

    useEffect(() => {
        handleFetchArticle();
    }, [handleFetchArticle]);

    const handleFetchProducts = useCallback(async () => {
        try {
            const result = await clientFetchCategoryProduct(1, '香水');
            setProducts(result?.data?.products);
        } catch (error) {
            inputToastMessage({ success: false, message: '發生錯誤，請重新整理或尋求客服處理' });
        }
    }, [inputToastMessage]);

    useEffect(() => {
        handleFetchProducts();
    }, [handleFetchProducts]);

    return (
        <div className="container py-3 mb-3">
            {loading.isLoading ? (
                <div>努力加載中</div>
            ) : (
                <article className="mt-4">
                    <h2>{article.title}</h2>
                    <h4>作者：{article.author}</h4>
                    <time>
                        {new Date(article.create_at).toLocaleString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </time>
                    <div className="d-flex flex-wrap">
                        {article?.tag?.map((item) => (
                            <mark className="fs-7 text-muted bg-white me-1 my-0 " key={item}>
                                #{item}
                            </mark>
                        ))}
                    </div>
                    <div className="row row-cols-2">
                        <div className="col">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-100 object-fit-cover"
                                style={{ height: `300px` }}
                            />
                        </div>
                        <div className="col">
                            <img
                                src="https://images.unsplash.com/photo-1621240662590-d3eecd0ba64e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHBlcmZ1bWUlMjBtYWdhemluZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60"
                                alt={article.title}
                                className="w-100 object-fit-cover"
                                style={{ height: `300px` }}
                            />
                        </div>
                    </div>

                    <p className="py-3">{article.content}</p>
                    <button onClick={() => navigate(-1)} type="button" className="btn btn-primary ">
                        回到上一頁
                    </button>

                    <div className="mt-5">
                        <h3 className="fs-2 mb-0">熱門選擇</h3>
                        <RecommendCarousel imagesList={products} />
                    </div>
                </article>
            )}
        </div>
    );
};
export default ArticleDetailPage;
