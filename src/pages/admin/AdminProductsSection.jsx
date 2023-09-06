import { useEffect, useRef, useState } from 'react';
import { adminDeleteProduct, adminFetchAllProducts, adminFetchLimitedProducts } from '../../api/adminApis';
import { Modal } from 'bootstrap';
import ProductModalState from '../../components/admin/ProductModal';
import DeleteModal from '../../components/DeleteModal';
import Pagination from '../../components/Pagination';
import useMessage from '../../hooks/useMessage';
import { useDispatch } from 'react-redux';
import { updateLoadingState } from '../../store/slice/loadingSlice';
import { useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';

const AdminProductsSection = () => {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const productModalRef = useRef(null);
    const deleteModalRef = useRef(null);
    const [modalOpenType, setModalOpenType] = useState('create'); // 判斷新增與編輯模組展開方式
    const [editProductTarget, setEditProductTarget] = useState({}); // 暫存編輯商品的目標
    const [deleteProductTarget, setDeleteProductTarget] = useState({});
    const { inputToastMessage } = useMessage();
    const dispatch = useDispatch();
    const [categoryList, setCategoryList] = useState([]);
    const [category, setCategory] = useState('');
    const { adminCheck } = useOutletContext();

    useEffect(() => {
        productModalRef.current = new Modal('#productModal', {
            backdrop: 'static', // 禁止觸碰元件外背景關閉模組
        });

        deleteModalRef.current = new Modal('#deleteModal', {
            backdrop: 'static', // 禁止觸碰元件外背景關閉模組
        });
    }, []);

    const handleOpenProductModal = (type, value) => {
        setModalOpenType(type);
        setEditProductTarget(value);
        productModalRef.current.show();
    };

    const handleCancelProductModal = () => productModalRef.current.hide();

    const handleOpenDeleteModal = (value) => {
        setDeleteProductTarget(value);
        deleteModalRef.current.show();
    };
    const handleCancelDeleteModal = () => deleteModalRef.current.hide();

    const fetchProducts = useCallback(async (page = 1, category = null) => {
        try {
            dispatch(updateLoadingState(true));
            const result = await adminFetchLimitedProducts(page, category);
            const { products, pagination } = result;
            setProducts(products);
            setPagination(pagination);
            dispatch(updateLoadingState(false));
        } catch (error) {
            inputToastMessage(error.response.data);
            dispatch(updateLoadingState(false));
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const fetchAllProducts = useCallback(async () => {
        try {
            const result = await adminFetchAllProducts();
            const newCategoryList = [...new Set(Object.values(result.products).map((item) => item.category))];
            setCategoryList(newCategoryList);
        } catch (error) {
            inputToastMessage(error.response.data);
        }
    }, []);

    useEffect(() => {
        fetchAllProducts();
    }, [fetchAllProducts]);

    const handleDeleteProduct = async () => {
        try {
            dispatch(updateLoadingState(true));
            await adminCheck();
            const result = await adminDeleteProduct(deleteProductTarget.id);
            inputToastMessage(result);
            fetchProducts();
            setDeleteProductTarget({});
            handleCancelDeleteModal();
        } catch (error) {
            // 不需要再處理這裡的錯誤，因為已經在 adminCheck 中處理
        } finally {
            dispatch(updateLoadingState(false));
            handleCancelDeleteModal();
        }
    };

    const handleFilterCategory = (e) => {
        setCategory(e.target.value);
        fetchProducts(1, e.target.value);
    };

    return (
        <div className="p-3">
            <ProductModalState
                handleCancelProductModal={handleCancelProductModal}
                fetchProducts={fetchProducts}
                modalOpenType={modalOpenType}
                editProductTarget={editProductTarget}
                checkAdminAuth={adminCheck}
            />

            <DeleteModal
                handleCancelDeleteModal={handleCancelDeleteModal}
                handleDelete={handleDeleteProduct}
                title={deleteProductTarget.title}
            />

            <h3>產品列表</h3>
            <hr />
            <div className="row align-items-center">
                <div className="col">
                    <div className="form-floating  ">
                        <select
                            name="category"
                            id="searchCategory"
                            className="form-select w-50"
                            onChange={(e) => handleFilterCategory(e)}
                            value={category}
                        >
                            <option className="bg-dark text-white" value="">
                                預設全部
                            </option>
                            {categoryList?.map((item) => (
                                <option className="bg-dark text-white fs-6" value={item} key={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="searchCategory">使用類別搜尋</label>
                    </div>
                </div>
                <div className="col ">
                    <button
                        type="button"
                        className="btn btn-primary float-end"
                        // data-bs-toggle='modal'
                        // data-bs-target='#productModal'
                        onClick={() => handleOpenProductModal('create', {})}
                    >
                        建立新商品
                    </button>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table align-middle">
                    <thead>
                        <tr>
                            <th scope="col">分類</th>
                            <th scope="col">名稱</th>
                            <th scope="col">售價</th>
                            <th scope="col">啟用狀態</th>
                            <th scope="col">編輯</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.category}</td>
                                <td>{product.title}</td>
                                <td>{product.price}</td>
                                <td className={`${product.is_enabled ? 'text-success ' : ''}`}>
                                    {product.is_enabled ? '啟用' : '未啟用'}
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleOpenProductModal('edit', product)} // 直接帶入產品資訊
                                    >
                                        編輯
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm ms-2"
                                        onClick={() => handleOpenDeleteModal(product)}
                                    >
                                        刪除
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                changePage={fetchProducts}
                totalPage={pagination.total_pages}
                currentPage={pagination.current_page}
                isPre={pagination.has_pre}
                isNext={pagination.has_next}
                category={pagination.category}
            />
        </div>
    );
};
export default AdminProductsSection;
