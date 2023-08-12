import { useEffect, useRef, useState } from 'react';
import { AdminFetchAllProducts, adminDeleteProduct, adminFetchLimitedProducts } from '../../api/adminApis';
import axios from 'axios';
import { Modal } from 'bootstrap';
import ProductModalState from '../../components/admin/ProductModal';
import DeleteModal from '../../components/DeleteModal';
import Pagination from '../../components/Pagination';
import useMessage from '../../hooks/useMessage';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoadingState } from '../../store/slice/loadingSlice';
import { useCallback } from 'react';

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
    const loadingRedux = useSelector((state) => state.loading);

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

    const fetchProducts = useCallback(async (page = 1) => {
        try {
            dispatch(updateLoadingState(true));
            const result = await adminFetchLimitedProducts(page);
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

    const handleDeleteProduct = async () => {
        try {
            dispatch(updateLoadingState(true));
            const result = await adminDeleteProduct(deleteProductTarget.id);
            inputToastMessage(result);
            fetchProducts();
            setDeleteProductTarget({});
            handleCancelDeleteModal();
            dispatch(updateLoadingState(false));
        } catch (error) {
            inputToastMessage(error.response.data);
            dispatch(updateLoadingState(false));
            handleCancelDeleteModal();
        }
    };

    return (
        <div className='p-3'>
            <ProductModalState
                handleCancelProductModal={handleCancelProductModal}
                fetchProducts={fetchProducts}
                modalOpenType={modalOpenType}
                editProductTarget={editProductTarget}
            />

            <DeleteModal
                handleCancelDeleteModal={handleCancelDeleteModal}
                handleDelete={handleDeleteProduct}
                title={deleteProductTarget.title}
            />

            <h3>產品列表</h3>
            <hr />
            <div className='text-end'>
                <button
                    type='button'
                    className='btn btn-primary'
                    // data-bs-toggle='modal'
                    // data-bs-target='#productModal'
                    onClick={() => handleOpenProductModal('create', {})}
                >
                    建立新商品
                </button>
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>分類</th>
                        <th scope='col'>名稱</th>
                        <th scope='col'>售價</th>
                        <th scope='col'>啟用狀態</th>
                        <th scope='col'>編輯</th>
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
                                    type='button'
                                    className='btn btn-primary btn-sm'
                                    onClick={() => handleOpenProductModal('edit', product)} // 直接帶入產品資訊
                                >
                                    編輯
                                </button>
                                <button
                                    type='button'
                                    className='btn btn-outline-danger btn-sm ms-2'
                                    onClick={() => handleOpenDeleteModal(product)}
                                >
                                    刪除
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination
                changePage={fetchProducts}
                totalPage={pagination.total_pages}
                currentPage={pagination.current_page}
                isPre={pagination.has_pre}
                isNext={pagination.has_next}
            />
        </div>
    );
};
export default AdminProductsSection;
