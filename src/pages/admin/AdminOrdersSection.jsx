import { useEffect, useRef, useState } from 'react';
import { Modal } from 'bootstrap';

import { adminDeleteAllOrders, adminFetchLimitedOrders } from '../../api/adminApis';
import DeleteModal from '../../components/DeleteModal';
import Pagination from '../../components/Pagination';
import useMessage from '../../hooks/useMessage';
import OrderModal from '../../components/admin/OrderModal';
import usePriceToTw from '../../hooks/usePriceToTw';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoadingState } from '../../store/slice/loadingSlice';
import { useCallback } from 'react';

const AdminOrdersSection = () => {
    const [orders, setOrders] = useState([]);
    const [pagination, setPagination] = useState({});
    const orderModalRef = useRef(null);
    const deleteModalRef = useRef(null);
    const [modalOpenType, setModalOpenType] = useState('create'); // 判斷新增與編輯模組展開方式
    const [editOrderTarget, setEditOrderTarget] = useState({}); // 暫存編輯商品的目標
    const [deleteOrderTarget, setDeleteOrderTarget] = useState({});
    const { inputToastMessage } = useMessage();
    const { handlePriceToTw } = usePriceToTw();
    const dispatch = useDispatch();
    const loadingRedux = useSelector((state) => state.loading);

    useEffect(() => {
        orderModalRef.current = new Modal('#orderModal', {
            backdrop: 'static', // 禁止觸碰元件外背景關閉模組
        });

        deleteModalRef.current = new Modal('#deleteModal', {
            backdrop: 'static', // 禁止觸碰元件外背景關閉模組
        });
    }, []);

    const handleOpenOrderModal = (value) => {
        setEditOrderTarget(value);
        orderModalRef.current.show();
    };
    const handleCancelOrderModal = () => orderModalRef.current.hide();
    const handleCancelDeleteModal = () => deleteModalRef.current.hide();

    const fetchOrders = useCallback(async (page = 1) => {
        try {
            dispatch(updateLoadingState(true));
            const result = await adminFetchLimitedOrders(page);
            const { orders, pagination } = result;
            setOrders(orders);
            setPagination(pagination);
            dispatch(updateLoadingState(false));
        } catch (error) {
            inputToastMessage(error.response.data);
            dispatch(updateLoadingState(false));
        }
    }, []);

    useEffect(() => {
        fetchOrders(); // 初始取得訂單
    }, [fetchOrders]);

    const handleDeleteAllOrders = async () => {
        try {
            dispatch(updateLoadingState(true));
            const result = await adminDeleteAllOrders();
            inputToastMessage(result);
            dispatch(updateLoadingState(false));
            fetchOrders();
        } catch (error) {
            inputToastMessage(error.response.data);
        }
    };

    return (
        <div className='p-3'>
            <OrderModal
                handleCancelOrderModal={handleCancelOrderModal}
                fetchOrders={fetchOrders}
                modalOpenType={modalOpenType}
                editOrderTarget={editOrderTarget}
            />
            <DeleteModal handleCancelDeleteModal={handleCancelDeleteModal} title={deleteOrderTarget.title} />

            <h3>訂單列表</h3>
            {/* <button onClick={() => handleDeleteAllOrders()}>刪除所有訂單</button> */}
            <hr />
            <table className='table'>
                <thead>
                    <tr>
                        <th scope='col'>訂單 id</th>
                        <th scope='col'>購買用戶</th>
                        <th scope='col'>訂單金額</th>
                        <th scope='col'>付款狀態</th>
                        <th scope='col'>付款日期</th>
                        <th scope='col'>留言訊息</th>
                        <th scope='col'>編輯</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order?.user?.email}</td>
                            <td>{handlePriceToTw(order.total)}</td>
                            <td>{order.is_paid ? <span className='text-success fw-bold'>付款完成</span> : '未付款'}</td>
                            <td>
                                {order.paid_date ? new Date(order.paid_date).toISOString().split('T')[0] : '未付款'}
                            </td>
                            <td>{order.message}</td>
                            <td>
                                <button
                                    type='button'
                                    className='btn btn-primary btn-sm'
                                    onClick={() => handleOpenOrderModal(order)}
                                >
                                    編輯
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination
                changePage={fetchOrders}
                totalPage={pagination.total_pages}
                currentPage={pagination.current_page}
                isPre={pagination.has_pre}
                isNext={pagination.has_next}
            />
        </div>
    );
};
export default AdminOrdersSection;