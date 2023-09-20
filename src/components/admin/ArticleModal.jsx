import { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import InputGroup from '../InputGroup';
import useMessage from '../../hooks/useMessage';
import TextareaGroup from '../TextareaGroup';
import { adminCreateArticle, adminPutArticle } from '../../api/adminArticleApis';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoadingState } from '../../store/slice/loadingSlice';
import { memo } from 'react';
import PropTypes from 'prop-types';

const ArticleModal = memo(function ArticleModal({ handleCancelModal, fetchData, modalOpenType, editTarget }) {
    const initialValue = {
        id: '',
        title: '',
        author: '',
        description: '',
        isPublic: false,
        content: '',
        image: '',
        tag: [],
        create_at: new Date().getTime(),
    };
    const [article, setArticle] = useState(initialValue);
    const { inputToastMessage } = useMessage();
    const selectRef = useRef();
    const options = [
        { value: '香水', label: '香水' },
        { value: '時尚', label: '時尚' },
        { value: '香調', label: '香調' },
        { value: '品牌', label: '品牌' },
        { value: '香水成分', label: '香水成分' },
        { value: '香水選購', label: '香水選購' },
        { value: '香水應用', label: '香水應用' },
        { value: '香水的歷史', label: '香水的歷史' },
    ];
    const [selectDefault, setSelectDefault] = useState(null);
    const loadingRedux = useSelector((state) => state.loading);
    const dispatch = useDispatch();
    const [checkAuth, setCheckAuth] = useState(false);

    const allFieldsFilled = Object.keys(article).every((key) => {
        if (key === 'id') {
            // 如果是 'id' 屬性，不檢查，直接返回 true
            return true;
        }
        return article[key] !== ''; // 檢查其他屬性的值是否不為空
    });

    useEffect(() => {
        if (modalOpenType === 'create') {
            setSelectDefault(null);
            setArticle(initialValue);
        } else if (modalOpenType === 'edit') {
            dispatch(updateLoadingState(true));
            setArticle(editTarget);
            if (editTarget.tag) {
                const check = options
                    .map((option, index) => (editTarget.tag.includes(option.value) ? index : null))
                    .filter((i) => i !== null)
                    .map((i) => options[i]);
                setSelectDefault(check);
                dispatch(updateLoadingState(false));
            } else {
                dispatch(updateLoadingState(false));
            }
        }
    }, [modalOpenType, editTarget, dispatch]);

    const handleChangeValue = (e) => {
        const { name, value } = e.target;
        if (name === 'isPublic') {
            setArticle({
                ...article,
                [name]: e.target.checked,
            });
        } else {
            setArticle({
                ...article,
                [name]: value,
            });
        }
    };

    const handleSubmitAddArticle = async () => {
        try {
            setCheckAuth(true);
            const newTag = selectDefault?.map((item) => item.value);
            const form = {
                data: {
                    title: article.title,
                    description: article.description,
                    image: article.image,
                    tag: newTag,
                    create_at: article.create_at,
                    author: article.author,
                    isPublic: article.isPublic,
                    content: article.content,
                },
            };
            let typeToggle = modalOpenType === 'create' ? true : false;
            let result;
            if (typeToggle) {
                result = await adminCreateArticle(form);
            } else {
                result = await adminPutArticle(form, article.id);
            }
            inputToastMessage(result);
            setArticle(initialValue);
            setSelectDefault(null);
            fetchData();
            handleCancelModal();
        } catch (error) {
            inputToastMessage(error?.response?.data);
        } finally {
            setCheckAuth(false);
            handleCancelModal();
        }
    };

    const handleChangeSelectTag = (item) => setSelectDefault(item);

    return (
        <div
            className="modal fade"
            id="articleModal" // 與 Bootstrap Modal 綁定
        >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bolder">
                            {modalOpenType === 'create' ? '新增文章' : `編輯文章：${editTarget?.title}`}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => {
                                setSelectDefault(null);
                                setArticle(initialValue);
                                handleCancelModal();
                            }}
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="">
                            <div className="row">
                                <div className="col-6">
                                    <InputGroup
                                        name="title"
                                        id="articleTitle"
                                        type="text"
                                        title="標題"
                                        groupClass="mb-3"
                                        labelClass="form-label fw-bolder"
                                        inputClass="form-control"
                                        onChange={handleChangeValue}
                                        value={article.title || ''}
                                        placeholder="請輸入文章標題"
                                    />
                                    <InputGroup
                                        name="author"
                                        id="articleAuthor"
                                        type="text"
                                        title="作者"
                                        groupClass="mb-3"
                                        labelClass="form-label fw-bolder"
                                        inputClass="form-control"
                                        onChange={handleChangeValue}
                                        value={article.author || ''}
                                        placeholder="請輸入文章作者"
                                    />
                                    <InputGroup
                                        name="description"
                                        id="articleDescription"
                                        type="text"
                                        title="描述"
                                        groupClass="mb-3"
                                        labelClass="form-label fw-bolder"
                                        inputClass="form-control"
                                        onChange={handleChangeValue}
                                        value={article.description || ''}
                                        placeholder="請輸入文章描述"
                                    />
                                    <TextareaGroup
                                        name="content"
                                        id="articleContent"
                                        title="內容"
                                        groupClass="mb-3"
                                        labelClass="form-label fw-bolder"
                                        textareaClass="form-control"
                                        placeholder="輸入文章的內容"
                                        cols={30}
                                        rows={5}
                                        onChange={handleChangeValue}
                                        value={article.content || ''}
                                    />
                                </div>
                                <div className="col-6">
                                    <InputGroup
                                        name="image"
                                        id="articleImage"
                                        type="text"
                                        title="文章封面圖片網址"
                                        groupClass="mb-3"
                                        labelClass="form-label fw-bolder"
                                        inputClass="form-control"
                                        placeholder="請輸入圖片連結"
                                        onChange={handleChangeValue}
                                        value={article.image || ''}
                                    />

                                    {loadingRedux.isLoading ? (
                                        <div>資料加載中</div>
                                    ) : (
                                        <>
                                            <label htmlFor="articleTag" className="form-label fw-bolder">
                                                文章標籤
                                            </label>
                                            <Select
                                                ref={selectRef}
                                                name="tag"
                                                id="articleTag"
                                                value={selectDefault}
                                                options={options}
                                                onChange={(item) => handleChangeSelectTag(item)}
                                                isMulti={true}
                                                closeMenuOnSelect={false}
                                                placeholder="選擇標籤"
                                                isClearable={true}
                                                defaultValue={null}
                                            />
                                        </>
                                    )}
                                    <InputGroup
                                        name="isPublic"
                                        id="articlePublic"
                                        type="checkbox"
                                        title="文章是否啟用"
                                        groupClass="form-check my-3"
                                        labelClass="form-check-label"
                                        inputClass="form-check-input"
                                        onChange={handleChangeValue}
                                        checked={Boolean(article.isPublic)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {
                                setSelectDefault(null);
                                setArticle(initialValue);
                                handleCancelModal();
                            }}
                        >
                            關閉
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleSubmitAddArticle()}
                            disabled={!allFieldsFilled || checkAuth}
                        >
                            {checkAuth && (
                                <div className="spinner-border spinner-border-sm me-2" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            )}
                            {modalOpenType === 'create'
                                ? checkAuth
                                    ? '檢查中'
                                    : '新增'
                                : checkAuth
                                ? '檢查中'
                                : '儲存'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

ArticleModal.propTypes = {
    handleCancelModal: PropTypes.func,
    fetchData: PropTypes.func,
    modalOpenType: PropTypes.oneOf(['create', 'edit']),
    editTarget: PropTypes.object,
};

export default ArticleModal;
