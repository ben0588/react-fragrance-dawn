import { useEffect, useState } from 'react';
import { clientFetchCart } from '../../api/clientApis';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useMessage from '../../hooks/useMessage';
import CartProductsSection from './CartProductsSection';
import CartOrderSection from './CartOrderSection';
import CartCouponSection from './CartCouponSection';
import bagImg from '../../assets/cart/bag.png';
import { updateCode, updateTotal } from '../../store/slice/couponSlice';
import { updateLoadingState } from '../../store/slice/loadingSlice';

const CartPage = () => {
    const [carts, setCarts] = useState([]);
    const dispatch = useDispatch();
    const { inputToastMessage } = useMessage();
    const loading = useSelector((state) => state.loading);

    const handleFetchCart = async () => {
        try {
            dispatch(updateLoadingState(true));
            const result = await clientFetchCart();
            const { total, final_total } = result?.data?.data;
            if (final_total < total) {
                dispatch(updateCode(true));
            }
            dispatch(updateTotal({ total, finalTotal: final_total }));
            setCarts(result?.data?.data?.carts);
            dispatch(updateLoadingState(false));
        } catch (error) {
            inputToastMessage(error?.response?.data);
            dispatch(updateLoadingState(false));
        }
    };

    useEffect(() => {
        handleFetchCart();
    }, []);

    return (
        <>
            {loading.isLoading ? (
                <div>isLoading</div>
            ) : carts.length ? (
                <div className='row mb-3 pb-3'>
                    <div className='col-12 col-lg-8 '>
                        <CartProductsSection carts={carts} handleFetchCart={handleFetchCart} />
                        <div className='border-top border-2 border-primary mt-4 pt-3 mb-3'>
                            <CartCouponSection handleFetchCart={handleFetchCart} />
                        </div>
                    </div>

                    <div className='col-12 col-lg-4  border border-2 '>
                        <CartOrderSection carts={carts} />
                    </div>
                </div>
            ) : (
                <div className='d-flex justify-content-center align-items-center flex-column py-3 mb-3'>
                    <p className='fs-5 p-0 m-0 mb-3'>您的購物車中目前沒有商品。</p>
                    <img src={bagImg} alt='購物車圖片' className='opacity-50' />
                    <Link to='/products' className='link-primary py-2 mt-2'>
                        繼續購物
                    </Link>
                </div>
            )}
        </>
    );
};
export default CartPage;
