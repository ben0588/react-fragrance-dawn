import { useEffect, useRef, useState } from 'react';
import InputGroup from '../InputGroup';
import TextareaGroup from '../TextareaGroup';
import { adminAddProduct, adminPutProduct } from '../../api/adminApis';
import useMessage from '../../hooks/useMessage';
import axios from 'axios';
import { memo } from 'react';
import PropTypes from 'prop-types';

const ProductModal = memo(function ProductModal({
    handleCancelProductModal,
    fetchProducts,
    modalOpenType,
    editProductTarget,
}) {
    const initialValue = {
        title: '',
        category: '',
        origin_price: '',
        price: '',
        unit: '',
        description: '',
        content: '',
        is_enabled: 1,
        imageUrl: '',
        imagesUrl: ['', '', '', '', ''],
    };
    const [products, setProducts] = useState(initialValue);
    const { inputToastMessage } = useMessage();
    const [isUpload, setIsUpload] = useState(false);
    const [isAddFile, setIsAddFile] = useState(false);

    const uploadFormRef = useRef(null);
    const [isCheck, setIsCheck] = useState(false);

    const allFieldsFilled = Object.values(products).every((value) => value !== ''); // 監控是否都填寫完畢

    useEffect(() => {
        // 判斷開啟模組方式，給於初始值或者商品原本值
        if (modalOpenType === 'create') {
            setProducts(initialValue);
        } else if (modalOpenType === 'edit') {
            setProducts(editProductTarget);
        }
    }, [modalOpenType, editProductTarget]);

    const handleCancel = () => {
        if (modalOpenType === 'create') {
            setProducts(initialValue);
        } else if (modalOpenType === 'edit') {
            setProducts(editProductTarget);
        }
    };

    const handleChangeValue = (e) => {
        const { name, value } = e.target;
        const matchImages = name.match('images')?.[0];
        if (['origin_price', 'price'].includes(name)) {
            const productMinPrice = 0;
            if (value <= productMinPrice) {
                setProducts({
                    ...products,
                    [name]: productMinPrice,
                });
            } else {
                setProducts({
                    ...products,
                    [name]: parseInt(value),
                });
            }
        } else if (name === 'is_enabled') {
            setProducts({
                ...products,
                [name]: +e.target.checked, // 因傳入 api 參數限制
            });
        } else if (matchImages) {
            const index = name.substring(10) - 1; // 擷取第幾個input
            setProducts((pre) => ({
                ...pre,
                imagesUrl: pre.imagesUrl.map((item, i) => {
                    if (i === index) {
                        return value;
                    }
                    return item;
                }),
            }));
        } else {
            setProducts({
                ...products,
                [name]: value,
            });
        }
    };

    const handleSubmitAddProduct = async () => {
        try {
            setIsCheck(true);
            let typeToggle = modalOpenType === 'create' ? true : false;
            let result;
            if (typeToggle) {
                result = await adminAddProduct(products);
            } else {
                result = await adminPutProduct(products, products.id);
            }
            inputToastMessage(result);
            handleCancelProductModal();
            await fetchProducts();
        } catch (error) {
            inputToastMessage(error?.response?.data);
        } finally {
            setIsCheck(false);
            handleCancelProductModal();
        }
    };

    const handleSubmitUploadImg = async (e) => {
        try {
            e.preventDefault();
            setIsUpload(true);
            const formData = new FormData();
            const file = e.target[0].files[0];
            if (!file) {
                inputToastMessage({
                    success: false,
                    message: '請選擇檔案後再進行上傳圖片功能',
                });
                setIsUpload(false);
            } else if (file.type.substring(0, 5) !== 'image') {
                inputToastMessage({
                    success: false,
                    message: '格式錯誤，請使用圖片檔案格式，如 .jpg .png',
                });
                setIsUpload(false);
                return;
            } else {
                formData.append('file-to-upload', file);
                const apiUrl = `/v2/api/${import.meta.env.VITE_BACKEND_BASE_API_PATH}/admin/upload`;
                const result = await axios.post(apiUrl, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                inputToastMessage({
                    success: result.data.success,
                    message: '圖片已上傳成功',
                });
                setProducts({
                    ...products,
                    imageUrl: result.data.imageUrl,
                });
                setIsUpload(false);
                e.target.reset();
            }
        } catch (error) {
            inputToastMessage(error.response.data);
            setIsUpload(false);
        }
    };

    const handleRemoveUploadForm = () => uploadFormRef.current.reset();

    return (
        <div
            className="modal fade"
            id="productModal" // 與 Bootstrap Modal 綁定
        >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {modalOpenType === 'create' ? '新增商品' : `編輯商品：${editProductTarget.title}`}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => {
                                setIsAddFile(false);
                                handleRemoveUploadForm();
                                handleCancel();
                                handleCancelProductModal();
                            }}
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="row g-3">
                            <div className="col-5">
                                <InputGroup
                                    name="imageUrl"
                                    id="productImageUrl"
                                    type="text"
                                    title=" 輸入主圖片網址"
                                    groupClass="mb-3"
                                    labelClass="form-label"
                                    inputClass="form-control"
                                    placeholder="請輸入圖片連結"
                                    onChange={handleChangeValue}
                                    value={products.imageUrl}
                                />

                                <form onSubmit={async (e) => handleSubmitUploadImg(e)} ref={uploadFormRef}>
                                    <InputGroup
                                        name="file-to-upload"
                                        id="productFileImage"
                                        type="file"
                                        title="或 上傳圖片"
                                        groupClass="mb-3"
                                        labelClass="form-label"
                                        inputClass="form-control"
                                        onChange={(e) => (e.target.value ? setIsAddFile(true) : setIsAddFile(false))}
                                    >
                                        <input
                                            type="submit"
                                            value={`${isUpload ? '圖片上傳中..' : '上傳圖片'}`}
                                            className="form-control btn btn-dark mt-1"
                                            disabled={isUpload || !isAddFile}
                                        />
                                    </InputGroup>
                                </form>
                                <label className="form-label mt-4">請依序輸入 1~5 圖片網址</label>
                                {/* 無須 label 故客製化 */}
                                {[...Array(5)].map((_, index) => (
                                    <input
                                        type="text"
                                        key={index + 1}
                                        name={`imagesUrl-${index + 1} `}
                                        className={`form-control mb-1`}
                                        id={`productImagesUrl${index + 1}`}
                                        placeholder={`請輸入圖片-${index + 1}連結`}
                                        onChange={handleChangeValue}
                                        value={products.imagesUrl[index]}
                                    />
                                ))}
                            </div>
                            <div className="col-7">
                                <InputGroup
                                    name="title"
                                    id="productTitle"
                                    type="text"
                                    title="商品名稱"
                                    groupClass="mb-3"
                                    labelClass="form-label"
                                    inputClass="form-control"
                                    onChange={handleChangeValue}
                                    value={products.title}
                                />
                                <TextareaGroup
                                    name="description"
                                    id="productDescription"
                                    title="商品描述"
                                    groupClass="mb-3"
                                    labelClass="form-label"
                                    textareaClass="form-control"
                                    placeholder="請輸入商品的描述"
                                    cols={30}
                                    rows={2}
                                    onChange={handleChangeValue}
                                    value={products.description}
                                />
                                <TextareaGroup
                                    name="content"
                                    id="productContent"
                                    title="商品說明"
                                    groupClass="mb-3"
                                    labelClass="form-label"
                                    textareaClass="form-control"
                                    placeholder="請輸入商品的說明"
                                    cols={30}
                                    rows={2}
                                    onChange={handleChangeValue}
                                    value={products.content}
                                />
                                <div className="row g-2">
                                    <InputGroup
                                        name="category"
                                        id="productCategory"
                                        type="text"
                                        title="商品分類"
                                        groupClass="col-6 mb-3"
                                        labelClass="form-label"
                                        inputClass="form-control"
                                        onChange={handleChangeValue}
                                        value={products.category}
                                    />
                                    <InputGroup
                                        name="unit"
                                        id="productUnit"
                                        type="text"
                                        title="商品單位"
                                        groupClass="col-6 mb-3"
                                        labelClass="form-label"
                                        inputClass="form-control"
                                        onChange={handleChangeValue}
                                        value={products.unit}
                                    />
                                </div>
                                <div className="row g-2">
                                    <InputGroup
                                        name="origin_price"
                                        id="productOriginPrice"
                                        type="number"
                                        title="商品原價"
                                        groupClass="col-6 mb-3"
                                        labelClass="form-label"
                                        inputClass="form-control"
                                        onChange={handleChangeValue}
                                        value={products.origin_price}
                                    />
                                    <InputGroup
                                        name="price"
                                        id="productPrice"
                                        type="number"
                                        title="商品售價"
                                        groupClass="col-6 mb-3"
                                        labelClass="form-label"
                                        inputClass="form-control"
                                        onChange={handleChangeValue}
                                        value={products.price}
                                    />
                                </div>
                                <InputGroup
                                    name="is_enabled"
                                    id="productIsEnabled"
                                    type="checkbox"
                                    title="商品啟用"
                                    groupClass="form-check mb-3"
                                    labelClass="form-check-label"
                                    inputClass="form-check-input"
                                    onChange={handleChangeValue}
                                    checked={Boolean(products.is_enabled)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {
                                setIsAddFile(false);
                                handleRemoveUploadForm();
                                handleCancel();
                                handleCancelProductModal();
                            }}
                        >
                            取消
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleSubmitAddProduct()}
                            disabled={!allFieldsFilled || isCheck}
                        >
                            {isCheck && (
                                <div className="spinner-border spinner-border-sm me-2" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            )}
                            {modalOpenType === 'create' ? (isCheck ? '檢查中' : '新增') : isCheck ? '檢查中' : '儲存'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

ProductModal.propTypes = {
    handleCancelProductModal: PropTypes.func,
    fetchProducts: PropTypes.func,
    modalOpenType: PropTypes.oneOf(['create', 'edit']),
    editProductTarget: PropTypes.object,
};
export default ProductModal;
