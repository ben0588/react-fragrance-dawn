import { useEffect, useState } from 'react';
import { adminPutOrder } from '../../api/adminApis';
import InputGroup from '../InputGroup';
import useMessage from '../../hooks/useMessage';
import SelectGroup from '../SelectGroup';
import usePriceToTw from '../../hooks/usePriceToTw';
import { memo } from 'react';
import PropTypes from 'prop-types';

const OrderModal = memo(function OrderModal({ handleCancelOrderModal, fetchOrders, editOrderTarget, checkAdminAuth }) {
    const initialValues = {
        is_paid: '',
        status: 0,
    };
    const [orders, setOrders] = useState({});
    const { inputToastMessage } = useMessage();
    const { handlePriceToTw } = usePriceToTw();
    const [checkAuth, setCheckAuth] = useState(false);

    useEffect(() => {
        setOrders({ ...initialValues, ...editOrderTarget });
    }, [editOrderTarget]);

    const handleCancelOrderModalRemove = () => {
        setOrders({ ...initialValues, ...editOrderTarget });
        handleCancelOrderModal();
    };

    const handleChangeValue = (e) => {
        const { name, value } = e.target;
        if (name === 'is_paid') {
            setOrders({
                ...orders,
                [name]: e.target.checked,
            });
        } else {
            setOrders({
                ...orders,
                [name]: value,
            });
        }
    };

    const handleSubmitPutOrder = async () => {
        try {
            setCheckAuth(true);
            await checkAdminAuth();
            const data = {
                create_at: orders.create_at,
                is_paid: orders.is_paid,
                message: orders.message || '',
                products: orders.products,
                user: orders.user,
                num: orders.num,
                status: orders.status,
            };
            const result = await adminPutOrder(orders.id, { data });
            inputToastMessage(result);
            fetchOrders();
            handleCancelOrderModal();
        } catch (error) {
            inputToastMessage(error?.response?.data);
        } finally {
            handleCancelOrderModal();
            setCheckAuth(false);
        }
    };

    return (
        <div
            className="modal fade"
            id="orderModal" // 與 Bootstrap Modal 綁定
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content py-1 px-3">
                    <div className="modal-header px-0 ">
                        <h5 className="modal-title fw-bolder ">編輯訂單：{editOrderTarget.id}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => handleCancelOrderModalRemove()}
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body fw-bolder">
                        <ul className="list-unstyled p-3">
                            <li className="pb-4">
                                <div className="row">
                                    <span className="col-2 fw-bolder">Email</span>
                                    <span className="col-10">{editOrderTarget?.user?.email}</span>
                                </div>
                            </li>
                            <li className="pb-4">
                                <div className="row">
                                    <span className="col-2 fw-bolder">訂購者</span>
                                    <span className="col-10">{editOrderTarget?.user?.name}</span>
                                </div>
                            </li>
                            <li className="pb-4">
                                <div className="row">
                                    <span className="col-2 fw-bolder">外送地點</span>
                                    <span className="col-10">{editOrderTarget?.user?.address}</span>
                                </div>
                            </li>
                            <li className="pb-4">
                                <div className="row">
                                    <span className="col-2 fw-bolder">留言</span>
                                    <span className="col-10">{editOrderTarget.message}</span>
                                </div>
                            </li>
                        </ul>

                        <div className="table-responsive ">
                            <table className="table mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col">品項名稱</th>
                                        <th scope="col">數量</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    <tr>
                                        <td>
                                            {editOrderTarget.products &&
                                                Object.entries(editOrderTarget.products)[0].map((item) => item)[1]
                                                    .product.title}
                                        </td>
                                        <td>
                                            {editOrderTarget.products &&
                                                Object.entries(editOrderTarget.products)[0].map((item) => item)[1].qty}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <span className="float-end fw-bolder mt-2 ">
                                總金額：NT{handlePriceToTw(editOrderTarget.total)}
                            </span>
                        </div>

                        <div className="">
                            <strong className="fs-5">修改訂單狀態</strong>
                            <InputGroup
                                name="is_paid"
                                id="orderIsPaid"
                                type="checkbox"
                                title={`付款狀態 ${orders.is_paid ? '(已付款)' : '(未付款)'}`}
                                groupClass="form-check mb-3 py-2"
                                labelClass="form-check-label "
                                inputClass="form-check-input"
                                onChange={handleChangeValue}
                                checked={!!orders.is_paid || false}
                            />
                        </div>

                        <SelectGroup
                            name="status"
                            id="orderStatus"
                            title="寄送進度"
                            groupClass="py-2"
                            labelClass="form-label mb-1"
                            selectClass="form-select"
                            onChange={handleChangeValue}
                            value={orders?.status}
                        >
                            <option className="bg-dark text-white" value={0}>
                                未確認
                            </option>
                            <option className="bg-dark text-white" value={1}>
                                已確認
                            </option>
                            <option className="bg-dark text-white" value={2}>
                                寄送中
                            </option>
                            <option className="bg-dark text-white" value={3}>
                                已送達
                            </option>
                        </SelectGroup>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => handleCancelOrderModalRemove()}
                        >
                            關閉
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary "
                            onClick={() => handleSubmitPutOrder()}
                            disabled={checkAuth}
                        >
                            {checkAuth && (
                                <div className="spinner-border spinner-border-sm me-2 " role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            )}
                            {checkAuth ? '檢查中' : '儲存'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

OrderModal.propTypes = {
    handleCancelOrderModal: PropTypes.func,
    fetchOrders: PropTypes.func,
    modalOpenType: PropTypes.oneOf(['create', 'edit']),
    editOrderTarget: PropTypes.object,
    checkAdminAuth: PropTypes.func,
};
export default OrderModal;
