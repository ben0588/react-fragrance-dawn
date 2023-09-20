import { Link } from 'react-router-dom';
import CartProductsSection from './CartProductsSection';
import CartOrderSection from './CartOrderSection';
import CartCouponSection from './CartCouponSection';
import bagImg from '../../assets/cart/bag.png';
import { useFetchCartsQuery } from '../../store/store';

const CartPage = () => {
    const { data, isLoading } = useFetchCartsQuery();

    return (
        <>
            {isLoading ? (
                <div className="text-center mb-3 pb-3">資料加載中...</div>
            ) : data?.data?.carts?.length ? (
                <div className="row mb-3 pb-3">
                    <div className="col-lg-8">
                        <CartProductsSection />
                        <div className="border-top border-primary mb-3 mt-4 border-2 pt-3">
                            <CartCouponSection />
                        </div>
                    </div>
                    <div className="col-lg-4  border border-2">
                        <CartOrderSection />
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-center align-items-center flex-column mb-3 py-3">
                    <p className="fs-5 m-0 mb-3 p-0">您的購物車中目前沒有商品。</p>
                    <img src={bagImg} alt="購物車圖片" className="opacity-50" />
                    <Link to="/products" className="link-primary mt-2 py-2">
                        繼續購物
                    </Link>
                </div>
            )}
        </>
    );
};
export default CartPage;
