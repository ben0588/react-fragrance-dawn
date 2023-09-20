import { useEffect, useRef, useState } from 'react';
import { Modal } from 'bootstrap';

import { adminDeleteAllOrders, adminDeleteOrder, adminFetchLimitedOrders } from '../../api/adminApis';
import DeleteModal from '../../components/DeleteModal';
import Pagination from '../../components/Pagination';
import useMessage from '../../hooks/useMessage';
import OrderModal from '../../components/admin/OrderModal';
import usePriceToTw from '../../hooks/usePriceToTw';
import { useDispatch } from 'react-redux';
import { updateLoadingState } from '../../store/slice/loadingSlice';
import { useCallback } from 'react';
import Swal from 'sweetalert2';

const AdminOrdersSection = () => {
    const [orders, setOrders] = useState([]);
    const [pagination, setPagination] = useState({});
    const orderModalRef = useRef(null);
    const deleteModalRef = useRef(null);
    const [editOrderTarget, setEditOrderTarget] = useState({}); // 暫存編輯商品的目標
    const { inputToastMessage } = useMessage();
    const { handlePriceToTw } = usePriceToTw();
    const dispatch = useDispatch();

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

    const fetchOrders = useCallback(
        async (page = 1) => {
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
        },
        [dispatch, inputToastMessage],
    );

    useEffect(() => {
        fetchOrders(); // 初始取得訂單
    }, [fetchOrders]);

    const handleDeleteOrder = async (orderId) => {
        try {
            Swal.fire({
                title: '確認刪除訂單?',
                text: '注意：刪除訂單後無法再復原，請謹慎操作',
                icon: 'question',
                confirmButtonColor: '#111c30',
                cancelButtonColor: '#b2bec3',
                confirmButtonText: '確認',
                cancelButtonText: '取消',
                showCancelButton: true,
                showCloseButton: true,
                reverseButtons: true,
                showLoaderOnConfirm: true,
                preConfirm: async () => {
                    try {
                        return await adminDeleteOrder(orderId);
                    } catch (error) {
                        Swal.showValidationMessage(`請求失敗： ${error}`);
                    }
                },
                allowOutsideClick: () => !Swal.isLoading(),
            }).then((result) => {
                if (result?.value?.success) {
                    Swal.fire({
                        icon: 'success',
                        title: '刪除成功',
                        text: `訂單刪除成功`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    fetchOrders();
                }
            });
        } catch (error) {
            inputToastMessage(error.response.data);
        }
    };

    const handleDeleteAllOrders = async () => {
        try {
            Swal.fire({
                title: '確認刪除全部訂單?',
                text: '注意：刪除全部訂單後無法再復原，請謹慎操作',
                icon: 'question',
                confirmButtonColor: '#d63031',
                cancelButtonColor: '#b2bec3',
                confirmButtonText: '確認',
                cancelButtonText: '取消',
                showCancelButton: true,
                showCloseButton: true,
                reverseButtons: true,
                showLoaderOnConfirm: true,
                preConfirm: async () => {
                    try {
                        return await adminDeleteAllOrders();
                    } catch (error) {
                        Swal.showValidationMessage(`請求失敗： ${error}`);
                    }
                },
                allowOutsideClick: () => !Swal.isLoading(),
            }).then((result) => {
                if (result?.value?.success) {
                    Swal.fire({
                        icon: 'success',
                        title: '刪除成功',
                        text: `訂單刪除成功`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    fetchOrders();
                }
            });
        } catch (error) {
            inputToastMessage(error.response.data);
        }
    };

    return (
        <div className="p-3">
            <OrderModal
                handleCancelOrderModal={handleCancelOrderModal}
                fetchOrders={fetchOrders}
                editOrderTarget={editOrderTarget}
            />
            <DeleteModal handleCancelDeleteModal={handleCancelDeleteModal} />

            <h3>訂單列表</h3>
            <button onClick={() => handleDeleteAllOrders()} type="button" className="btn btn-outline-danger">
                刪除所有訂單
            </button>
            <hr />
            <div className="table-responsive">
                <table className="table align-middle">
                    <thead>
                        <tr>
                            <th scope="col">訂單 id</th>
                            <th scope="col">購買用戶</th>
                            <th scope="col">訂單金額</th>
                            <th scope="col">付款狀態</th>
                            <th scope="col">付款日期</th>
                            <th scope="col">留言訊息</th>
                            <th scope="col">編輯</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order?.user?.email}</td>
                                <td>{handlePriceToTw(order.total)}</td>
                                <td>
                                    {order.is_paid ? <span className="text-success fw-bold">付款完成</span> : '未付款'}
                                </td>
                                <td>
                                    {order.paid_date
                                        ? new Date(order.paid_date * 1000).toISOString().split('T')[0]
                                        : '未付款'}
                                </td>
                                <td>{order.message}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleOpenOrderModal(order)}
                                    >
                                        編輯
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm ms-2"
                                        onClick={() => handleDeleteOrder(order.id)}
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
