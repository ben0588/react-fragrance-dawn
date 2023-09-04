import { useState } from 'react';
import { clientFetchOrder } from '../../api/clientApis';
import useMessage from '../../hooks/useMessage';
import AccountOrderModal from '../../components/account/AccountOrderModal';

const OrderTracking = () => {
    const [orderValue, setOrderValue] = useState('');
    const { inputToastMessage } = useMessage();
    const [order, setOrder] = useState({});
    const [orderShow, setOrderShow] = useState(false);
    const handleOrderClose = () => setOrderShow(false);
    // const handleOrderShow = () => setOrderShow(true);

    const handleSubmitOrder = async () => {
        try {
            if (orderValue === '') {
                inputToastMessage({ success: false, message: '請填寫訂單號後再進行查詢' });
                return;
            }
            const result = await clientFetchOrder(orderValue);
            // -NbnngcYztXb_pGTvnml
            if (result.data.order === null) {
                inputToastMessage({ success: false, message: '訂單不存在，請在確認' });
                setOrderValue('');
            } else {
                setOrder(result.data.order);
                setOrderShow(true);
            }
        } catch (error) {
            inputToastMessage({ ...error.response.data, message: '訂單格式不正確，請重新填寫' });
        }
    };

    return (
        <div className='container py-5'>
            <AccountOrderModal show={orderShow} handleClose={handleOrderClose} order={order} />
            <h2>查詢我的訂單</h2>
            <label htmlFor='order-Tracking' className='form-label'>
                查詢及追蹤您的訂單狀態。輸入您的訂單編號，即可查看訂單狀態！
            </label>
            <br />
            <div className='d-flex align-items-center'>
                <input
                    className='form-control d-inline-block w-50'
                    type='search'
                    placeholder='請輸入您的訂單號'
                    value={orderValue}
                    onChange={(e) => setOrderValue(e.target.value.trim())}
                    id='order-Tracking'
                />
                <button type='button' className='btn btn-primary ms-1' onClick={handleSubmitOrder}>
                    查詢我的訂單
                </button>
            </div>
        </div>
    );
};
export default OrderTracking;
