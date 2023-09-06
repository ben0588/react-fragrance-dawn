import usePriceToTw from '../../hooks/usePriceToTw';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const CartOrderSection = ({ carts }) => {
    const { handlePriceToTw } = usePriceToTw();
    const couponRedux = useSelector((state) => state.coupon);

    const orderList = [
        { title: '總量', text: carts?.length },
        { title: '總計', text: handlePriceToTw(couponRedux.total) },
        { title: '優惠碼', text: couponRedux.code ? couponRedux.code : '未使用' },
        { title: '運輸 (滿$1000免運費)', text: '$0' },
    ];

    return (
        <>
            <h5 className="border-bottom border-2 border-primary fs-5 py-2 mb-4">訂單摘要</h5>
            {orderList?.map((item) => (
                <div
                    key={item.title}
                    className={`d-flex justify-content-between align-items-center  ${
                        item.title === '運輸 (滿$1000免運費)' ? 'text-muted text-decoration-line-through' : ''
                    } `}
                >
                    <span>{item.title}</span>
                    <span>{item.text}</span>
                </div>
            ))}
            <h5 className="d-flex justify-content-between align-items-center border-top border-2 border-primary fs-5 mt-4 pt-4 pb-3">
                <span className="d-flex align-items-center">
                    訂單總額
                    {couponRedux.code ? <span className="fs-7 fw-normal badge bg-danger ms-1 px-1">已折扣</span> : null}
                </span>
                <span>
                    {couponRedux.finalTotal < couponRedux.total
                        ? handlePriceToTw(couponRedux.finalTotal)
                        : handlePriceToTw(couponRedux.total)}
                </span>
            </h5>
            <Link
                role="button"
                to="/cart/checkout"
                className={`btn btn-primary btn-primary-hover w-100 mb-2 ${couponRedux.isLoading ? 'disabled' : ''}`}
                title="前往結帳"
                state={{ carts: carts }}
            >
                前往結帳
            </Link>
            <div className="border-top border-2 border-primary mt-3 mb-2 pt-3">
                <h5 className="fs-5 ">更多資訊請參考以下</h5>
                <ul>
                    {[
                        '訂單摘要優惠碼僅提供狀態提示，商品使用代碼請前往結帳，屆時購物車明細將逐一顯示商品代碼。',
                        '在結帳前，請務必仔細核對您的訂單信息，確保一切正確無誤，以免因錯誤信息導致不必要的麻煩。',
                        '如果您在購物過程中遇到任何問題或需要幫助，請隨時聯繫我們的客戶支援團隊。',
                        '我們為您提供全面的售後服務，包括維修、保固等。您可以在購買後放心享受我們的售後支援。',
                    ].map((item) => (
                        <li className="fs-7 text-muted mt-3" key={item}>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

CartOrderSection.propTypes = {
    carts: PropTypes.array,
};
export default CartOrderSection;
