import { useState } from 'react';
import useMessage from '../../hooks/useMessage';
import AccountOrderModal from '../../components/account/AccountOrderModal';
import { useFetchOrderQuery } from '../../store/store';
import { useEffect } from 'react';

const OrderTracking = () => {
    const [orderValue, setOrderValue] = useState('');
    const [orderId, setOrderId] = useState(null);
    const [isSkip, setIsSkip] = useState(true);
    const { inputToastMessage } = useMessage();
    const [order, setOrder] = useState({});
    const [orderShow, setOrderShow] = useState(false);
    const { data, isFetching, requestId } = useFetchOrderQuery(orderId, {
        skip: isSkip,
    });

    const handleOrderClose = () => {
        setOrderShow(false);
        setOrder({});
    };

    useEffect(() => {
        if (requestId && data?.order === null) {
            inputToastMessage({ success: false, message: '訂單不存在，請在確認' });
        } else if (data?.order?.id) {
            setOrder(data?.order);
            setOrderShow(true);
        }
    }, [data]);

    const handleSubmitOrder = async () => {
        if (orderValue === '') {
            inputToastMessage({ success: false, message: '請填寫訂單號後再進行查詢' });
        } else if (data?.order?.id === orderValue) {
            setOrder(data?.order);
            setOrderShow(true);
        } else {
            setIsSkip(false);
            setOrderId(orderValue);
        }
    };

    return (
        <div className="container py-5">
            <AccountOrderModal show={orderShow} handleClose={handleOrderClose} order={order} />
            <h2>查詢我的訂單</h2>
            <label htmlFor="order-Tracking" className="form-label">
                查詢及追蹤您的訂單狀態。輸入您的訂單編號，即可查看訂單狀態！
            </label>
            <br />
            <div className="d-flex align-items-center">
                <input
                    className="form-control d-inline-block w-50"
                    type="search"
                    placeholder="請輸入您的訂單號"
                    value={orderValue}
                    onChange={(e) => setOrderValue(e.target.value.trim())}
                    id="order-Tracking"
                />
                <button
                    type="button"
                    className="btn btn-primary ms-1"
                    onClick={handleSubmitOrder}
                    disabled={isFetching}
                >
                    {isFetching ? (
                        <>
                            <div className="spinner-border spinner-border-sm me-1" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            訂單查詢中
                        </>
                    ) : (
                        '查詢我的訂單'
                    )}
                </button>
            </div>
        </div>
    );
};
export default OrderTracking;
