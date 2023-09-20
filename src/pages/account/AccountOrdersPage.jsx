import { useState } from 'react';
import Pagination from '../../components/Pagination';
import usePriceToTw from '../../hooks/usePriceToTw';
import Button from 'react-bootstrap/Button';
import AccountOrderModal from '../../components/account/AccountOrderModal';
import AccountPaymentModal from '../../components/account/AccountPaymentModal';
import useMessage from '../../hooks/useMessage';
import { useFetchOrdersQuery, usePaymentOrderMutation } from '../../store/store';

const AccountOrdersPage = () => {
    const { handlePriceToTw } = usePriceToTw();
    const { inputToastMessage } = useMessage();
    const [orderShow, setOrderShow] = useState(false);
    const [page, setPage] = useState(1);
    const { data, isLoading } = useFetchOrdersQuery(page);
    const [payOrder, payOrderResult] = usePaymentOrderMutation();
    const [targetData, setTargetData] = useState({});
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

    const handleChangePage = (page) => setPage(page); // 自動偵測有變化重新呼叫訂單資料

    const handlePaymentOrder = async (id) => {
        try {
            const result = await payOrder(id);
            inputToastMessage(result.data);
            setPaymentShow(false);
        } catch (error) {
            inputToastMessage(error?.response?.data);
        }
    };

    return (
        <div className="container  pb-5">
            <AccountOrderModal show={orderShow} handleClose={handleOrderClose} order={targetData} />
            <AccountPaymentModal
                show={paymentShow}
                handleClose={handlePaymentClose}
                order={targetData}
                handlePaymentOrder={handlePaymentOrder}
                payLoading={payOrderResult.isLoading}
            />
            {isLoading ? (
                <div>訂單資料加載中...</div>
            ) : data?.orders.length ? (
                <>
                    <div className="table-responsive my-3">
                        <h4 className="fw-bolder">訂單列表</h4>
                        <hr />
                        <table className="table align-middle">
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
                                {data.orders.map((order) => (
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
                                        <td className={`${order.is_paid ? 'text-success ' : ''}`}>
                                            {order.is_paid ? '已付款' : '未付款'}
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
                                            <Button variant="light" onClick={() => handleOrderShow(order)}>
                                                查看
                                            </Button>
                                        </td>
                                        <td
                                            className={`${
                                                order.is_paid
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
                                            {order.is_paid ? (
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
                                                <Button variant="primary" onClick={() => handlePaymentShow(order)}>
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
                        changePage={handleChangePage}
                        totalPage={data?.pagination.total_pages}
                        currentPage={data?.pagination.current_page}
                        isPre={data?.pagination.has_pre}
                        isNext={data?.pagination.has_next}
                    />
                </>
            ) : (
                <div>尚無訂單</div>
            )}
        </div>
    );
};
export default AccountOrdersPage;
