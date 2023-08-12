import { useCallback, useEffect, useRef, useState } from 'react';
import { Modal } from 'bootstrap';
import DeleteModal from '../../components/DeleteModal';
import Pagination from '../../components/Pagination';
import useMessage from '../../hooks/useMessage';
import ArticleModal from '../../components/admin/ArticleModal';
import { adminDeleteArticle, adminFetchArticle, adminFetchLimitedArticles } from '../../api/adminArticleApis';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoadingState } from '../../store/slice/loadingSlice';

const AdminArticleSection = () => {
    const [articles, setArticles] = useState([]);
    const [pagination, setPagination] = useState({});
    const articleModalRef = useRef(null);
    const deleteModalRef = useRef(null);
    const [modalOpenType, setModalOpenType] = useState('create'); // 判斷新增與編輯模組展開方式
    const [editTarget, setEditTarget] = useState({}); // 暫存編輯商品的目標
    const [deleteTarget, setDeleteTarget] = useState({});
    const { inputToastMessage } = useMessage();
    const dispatch = useDispatch();
    const loadingRedux = useSelector((state) => state.loading);

    useEffect(() => {
        articleModalRef.current = new Modal('#articleModal', {
            backdrop: 'static', // 禁止觸碰元件外背景關閉模組
        });

        deleteModalRef.current = new Modal('#deleteModal', {
            backdrop: 'static', // 禁止觸碰元件外背景關閉模組
        });
    }, []);

    const handleOpenCouponModal = async (type, id) => {
        try {
            setModalOpenType(type);
            if (type === 'create') {
                articleModalRef.current.show();
            } else {
                dispatch(updateLoadingState(true));
                const result = await adminFetchArticle(id);
                setEditTarget(result.article);
                if (Object.keys(editTarget)) {
                    dispatch(updateLoadingState(false));
                    articleModalRef.current.show();
                }
            }
        } catch (error) {
            dispatch(updateLoadingState(false));
        }
    };

    const handleCancelCouponModal = () => articleModalRef.current.hide();

    const handleOpenDeleteModal = (value) => {
        setDeleteTarget(value);
        deleteModalRef.current.show();
    };

    const handleCancelDeleteModal = () => deleteModalRef.current.hide();

    const fetchArticle = useCallback(async (page = 1) => {
        try {
            dispatch(updateLoadingState(true));
            const result = await adminFetchLimitedArticles(page);
            const { articles, pagination } = result;
            setArticles(articles);
            setPagination(pagination);
            dispatch(updateLoadingState(false));
        } catch (error) {
            inputToastMessage(error?.response?.data);
            dispatch(updateLoadingState(false));
        }
    }, []);

    useEffect(() => {
        fetchArticle();
    }, [fetchArticle]);

    const handleDeleteArticle = async (id) => {
        try {
            dispatch(updateLoadingState(true));
            const result = await adminDeleteArticle(deleteTarget.id);
            inputToastMessage(result);
            fetchArticle();
            setDeleteTarget({});
            dispatch(updateLoadingState(false));
            handleCancelDeleteModal();
        } catch (error) {
            inputToastMessage(error.response.data);
            dispatch(updateLoadingState(false));
            handleCancelDeleteModal();
        }
    };

    return (
        <div className='p-3'>
            <ArticleModal
                handleCancelModal={handleCancelCouponModal}
                fetchData={fetchArticle}
                modalOpenType={modalOpenType}
                editTarget={editTarget}
            />

            <DeleteModal
                handleCancelDeleteModal={handleCancelDeleteModal}
                handleDelete={handleDeleteArticle}
                title={deleteTarget.title}
                type='article'
                id={deleteTarget.id}
            />

            {loadingRedux.isLoading ? (
                <div>Loading 資料加載中</div>
            ) : (
                <div>
                    <h3>文章列表</h3>
                    <hr />
                    <div className='text-end'>
                        <button
                            type='button'
                            className='btn btn-primary'
                            // data-bs-toggle='modal'
                            // data-bs-target='#productModal'
                            onClick={() => handleOpenCouponModal('create')}
                        >
                            建立新文章
                        </button>
                    </div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope='col'>文章編號</th>
                                <th scope='col'>建立時間</th>
                                <th scope='col'>作者</th>
                                <th scope='col'>標題</th>
                                <th scope='col'>公開狀態</th>
                                <th scope='col'>編輯</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles?.map((article) => (
                                <tr key={article.id}>
                                    <td>{article.id}</td>
                                    <td>{new Date(article.create_at).toISOString().split('T')[0]}</td>
                                    <td>{article.author}</td>
                                    <td className='text-ellipsis-200'>{article.title}</td>
                                    <td className={`${article.isPublic ? 'text-success ' : ''}`}>
                                        {article.isPublic ? '啟用' : '未啟用'}
                                    </td>
                                    <td>
                                        <button
                                            type='button'
                                            className='btn btn-primary btn-sm'
                                            onClick={() => handleOpenCouponModal('edit', article.id)}
                                        >
                                            編輯
                                        </button>
                                        <button
                                            type='button'
                                            className='btn btn-outline-danger btn-sm ms-2'
                                            onClick={() => handleOpenDeleteModal(article)}
                                        >
                                            刪除
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Pagination
                        changePage={fetchArticle}
                        totalPage={pagination.total_pages}
                        currentPage={pagination.current_page}
                        isPre={pagination.has_pre}
                        isNext={pagination.has_next}
                    />
                </div>
            )}
        </div>
    );
};
export default AdminArticleSection;
