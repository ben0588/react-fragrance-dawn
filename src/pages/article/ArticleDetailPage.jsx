import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { clientFetchArticle } from '../../api/clientApis';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoadingState } from '../../store/slice/loadingSlice';
import useMessage from '../../hooks/useMessage';

const ArticleDetailPage = () => {
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState({});
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading);
    const { inputToastMessage } = useMessage();

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
    }, []);

    useEffect(() => {
        handleFetchArticle();
    }, [handleFetchArticle]);

    return (
        <div className='container py-3 mb-3'>
            {loading.isLoading ? (
                <div>努力加載中</div>
            ) : (
                <article className='mt-4'>
                    <h2>{article.title}</h2>
                    <h4>作者：{article.author}</h4>
                    <time>
                        {new Date(article.create_at).toLocaleString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </time>
                    <div className='d-flex flex-wrap'>
                        {article?.tag?.map((item) => (
                            <mark className='fs-7 text-muted bg-white me-1 my-0 ' key={item}>
                                #{item}
                            </mark>
                        ))}
                    </div>
                    <div className='row row-cols-2'>
                        <div className='col'>
                            <img
                                src={article.image}
                                alt={article.title}
                                className='w-100 object-fit-cover'
                                style={{ height: `300px` }}
                            />
                        </div>
                        <div className='col'>
                            <img
                                src='https://images.unsplash.com/photo-1621240662590-d3eecd0ba64e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHBlcmZ1bWUlMjBtYWdhemluZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60'
                                alt={article.title}
                                className='w-100 object-fit-cover'
                                style={{ height: `300px` }}
                            />
                        </div>
                    </div>

                    <p className='py-3'>{article.content}</p>
                    <button onClick={() => navigate(-1)} type='button' className='btn btn-primary btn-lg'>
                        回到上一頁
                    </button>
                </article>
            )}
        </div>
    );
};
export default ArticleDetailPage;
