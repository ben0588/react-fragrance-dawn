import { useEffect, useRef, useState } from 'react';
import { Modal } from 'bootstrap';

import { adminDeleteCoupon, adminFetchLimitedCoupons } from '../../api/adminApis';
import DeleteModal from '../../components/DeleteModal';
import Pagination from '../../components/Pagination';
import CouponModal from '../../components/admin/CouponModal';
import useMessage from '../../hooks/useMessage';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoadingState } from '../../store/slice/loadingSlice';
import { useCallback } from 'react';

const AdminCouponsSection = () => {
    const [coupons, setCoupons] = useState([]);
    const [pagination, setPagination] = useState({});
    const couponModalRef = useRef(null);
    const deleteModalRef = useRef(null);
    const [modalOpenType, setModalOpenType] = useState('create'); // 判斷新增與編輯模組展開方式
    const [editCouponTarget, setEditCouponTarget] = useState({}); // 暫存編輯商品的目標
    const [deleteCouponTarget, setDeleteCouponTarget] = useState({});
    const { inputToastMessage } = useMessage();
    const dispatch = useDispatch();
    const loadingRedux = useSelector((state) => state.loading);

    useEffect(() => {
        couponModalRef.current = new Modal('#couponModal', {
            backdrop: 'static', // 禁止觸碰元件外背景關閉模組
        });

        deleteModalRef.current = new Modal('#deleteModal', {
            backdrop: 'static', // 禁止觸碰元件外背景關閉模組
        });
    }, []);

    const handleOpenCouponModal = (type, value) => {
        setModalOpenType(type);
        setEditCouponTarget(value);
        couponModalRef.current.show();
    };

    const handleCancelCouponModal = () => couponModalRef.current.hide();

    const handleOpenDeleteModal = (value) => {
        setDeleteCouponTarget(value);
        deleteModalRef.current.show();
    };

    const handleCancelDeleteModal = () => deleteModalRef.current.hide();

    const fetchCoupons = useCallback(async (page = 1) => {
        try {
            dispatch(updateLoadingState(true));
            const result = await adminFetchLimitedCoupons(page);
            const { coupons, pagination } = result;
            setCoupons(coupons);
            setPagination(pagination);
            dispatch(updateLoadingState(false));
        } catch (error) {
            inputToastMessage(error.response.data);
            dispatch(updateLoadingState(false));
        }
    }, []);

    useEffect(() => {
        fetchCoupons(); // 初始取得優惠卷列表
    }, [fetchCoupons]);

    const handleDeleteCoupon = async () => {
        try {
            dispatch(updateLoadingState(true));
            const result = await adminDeleteCoupon(deleteCouponTarget.id);
            // const result = await adminDeleteCoupon('2s');
            inputToastMessage(result);
            fetchCoupons();
            setDeleteCouponTarget({});
            handleCancelDeleteModal();
            dispatch(updateLoadingState(false));
        } catch (error) {
            inputToastMessage(error.response.data);
            handleCancelDeleteModal();
            dispatch(updateLoadingState(false));
        }
    };

    return (
        <div className='p-3'>
            <CouponModal
                handleCancelCouponModal={handleCancelCouponModal}
                fetchCoupons={fetchCoupons}
                modalOpenType={modalOpenType}
                editCouponTarget={editCouponTarget}
            />

            <DeleteModal
                handleCancelDeleteModal={handleCancelDeleteModal}
                handleDelete={handleDeleteCoupon}
                title={deleteCouponTarget.title}
            />

            <h3>優惠卷列表</h3>
            <hr />
            <div className='text-end'>
                <button
                    type='button'
                    className='btn btn-primary'
                    // data-bs-toggle='modal'
                    // data-bs-target='#productModal'
                    onClick={() => handleOpenCouponModal('create', {})}
                >
                    建立新優惠卷
                </button>
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>標題</th>
                        <th scope='col'>折扣比(%)</th>
                        <th scope='col'>到期日</th>
                        <th scope='col'>優惠碼</th>
                        <th scope='col'>啟用狀態</th>
                        <th scope='col'>編輯</th>
                    </tr>
                </thead>
                <tbody>
                    {coupons?.map((coupon) => (
                        <tr key={coupon.id}>
                            <td>{coupon.title}</td>
                            <td>{coupon.percent}</td>
                            <td>{new Date(coupon.due_date).toISOString().split('T')[0]}</td>
                            <td>{coupon.code}</td>
                            <td className={`${coupon.is_enabled ? 'text-success ' : ''}`}>
                                {coupon.is_enabled ? '啟用' : '未啟用'}
                            </td>
                            <td>
                                <button
                                    type='button'
                                    className='btn btn-primary btn-sm'
                                    onClick={() => handleOpenCouponModal('edit', coupon)} // 直接帶入產品資訊
                                >
                                    編輯
                                </button>
                                <button
                                    type='button'
                                    className='btn btn-outline-danger btn-sm ms-2'
                                    onClick={() => handleOpenDeleteModal(coupon)}
                                >
                                    刪除
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination
                changePage={fetchCoupons}
                totalPage={pagination.total_pages}
                currentPage={pagination.current_page}
                isPre={pagination.has_pre}
                isNext={pagination.has_next}
            />
        </div>
    );
};
export default AdminCouponsSection;
