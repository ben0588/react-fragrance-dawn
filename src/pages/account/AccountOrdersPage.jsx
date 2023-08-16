import { useCallback, useEffect, useState } from 'react';
import { clientFetchLimitedOrders, clientPaymentOrder } from '../../api/clientApis';
import Pagination from '../../components/Pagination';
import usePriceToTw from '../../hooks/usePriceToTw';
import Button from 'react-bootstrap/Button';
import AccountOrderModal from '../../components/account/AccountOrderModal';
import AccountPaymentModal from '../../components/account/AccountPaymentModal';
import useMessage from '../../hooks/useMessage';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoadingState } from '../../store/slice/loadingSlice';

const AccountOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [pagination, setPagination] = useState({});
    const { handlePriceToTw } = usePriceToTw();
    const { inputToastMessage } = useMessage();
    const [orderShow, setOrderShow] = useState(false);
    const loading = useSelector((state) => state.loading);
    const dispatch = useDispatch();

    const [targetData, setTargetData] = useState([]);
    const handleOrderClose = () => setOrderShow(false);
    const handleOrderShow = (data) => {
        setTargetData(data);
        setOrderShow(true);
    };
    const [paymentShow, setPaymentShow] = useState(false);
    const handlePaymentClose = () => setPaymentShow(false);
    const handlePaymentShow = (data) => {
        setTargetData(data);
        setPaymentShow(true);
    };

    const handleFetchOrders = useCallback(async (page = 0) => {
        try {
            dispatch(updateLoadingState(true));
            const result = await clientFetchLimitedOrders(page);
            setOrders(result?.data?.orders);
            setPagination(result?.data?.pagination);
            dispatch(updateLoadingState(false));
        } catch (error) {
            inputToastMessage(error?.response?.data);
            dispatch(updateLoadingState(false));
        }
    }, []);

    useEffect(() => {
        handleFetchOrders();
    }, [handleFetchOrders]);

    const handlePaymentOrder = async (id, formData) => {
        try {
            dispatch(updateLoadingState(true));
            const result = await clientPaymentOrder(id);
            inputToastMessage(result.data);
            handleFetchOrders();
            setPaymentShow(false);
            dispatch(updateLoadingState(false));
        } catch (error) {
            inputToastMessage(error?.response?.data);
            dispatch(updateLoadingState(false));
        }
    };

    return (
        <div className='container  '>
            <AccountOrderModal show={orderShow} handleClose={handleOrderClose} order={targetData} />
            <AccountPaymentModal
                show={paymentShow}
                handleClose={handlePaymentClose}
                order={targetData}
                handlePaymentOrder={handlePaymentOrder}
            />
            {loading.isLoading ? (
                <div>isLoading 加載中</div>
            ) : orders.length ? (
                <>
                    <div className='table-responsive my-3'>
                        <h4 className='fw-bolder'>訂單列表</h4>
                        <hr />
                        <table className='table align-middle'>
                            <thead>
                                <tr>
                                    <th>訂單日期</th>
                                    <th>訂單編號</th>
                                    <th>訂單金額</th>
                                    <th>付款狀態</th>
                                    <th>付款日期</th>
                                    <th>訂單資訊</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length &&
                                    orders.map((order) => (
                                        <tr key={order.id}>
                                            <td>
                                                {new Date(order.create_at * 1000).toLocaleString(undefined, {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </td>
                                            <td>{order.id}</td>
                                            <td>NT{handlePriceToTw(order.total)}</td>
                                            <td className={`${Boolean(order.is_paid) ? 'text-success ' : ''}`}>
                                                {Boolean(order.is_paid) ? '已付款' : '未付款'}
                                            </td>
                                            <td>
                                                {order.paid_date
                                                    ? new Date(order.paid_date * 1000).toLocaleString(undefined, {
                                                          year: 'numeric',
                                                          month: 'long',
                                                          day: 'numeric',
                                                      })
                                                    : '未付款'}
                                            </td>

                                            <td>
                                                <Button variant='light' onClick={() => handleOrderShow(order)}>
                                                    查看
                                                </Button>
                                            </td>
                                            <td
                                                className={`${
                                                    Boolean(order.is_paid)
                                                        ? order?.status === '1'
                                                            ? 'text-dark'
                                                            : order?.status === '2'
                                                            ? 'text-warning'
                                                            : order?.status === '3'
                                                            ? 'text-success'
                                                            : 'text-secondary'
                                                        : ''
                                                }`}
                                            >
                                                {Boolean(order.is_paid) ? (
                                                    order?.status === '1' ? (
                                                        '已確認'
                                                    ) : order?.status === '2' ? (
                                                        '寄送中'
                                                    ) : order?.status === '3' ? (
                                                        '已送達'
                                                    ) : (
                                                        '未確認'
                                                    )
                                                ) : (
                                                    <Button variant='primary' onClick={() => handlePaymentShow(order)}>
                                                        付款
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        changePage={handleFetchOrders}
                        totalPage={pagination.total_pages}
                        currentPage={pagination.current_page}
                        isPre={pagination.has_pre}
                        isNext={pagination.has_next}
                    />
                </>
            ) : (
                <div>尚無訂單</div>
            )}
        </div>
    );
};
export default AccountOrdersPage;
