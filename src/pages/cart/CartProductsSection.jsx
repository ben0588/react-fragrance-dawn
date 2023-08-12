import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BsCheckCircle, BsCheckCircleFill, BsTrash } from 'react-icons/bs';
import { FaRegTrashAlt } from 'react-icons/fa';
import WishlistButtonGroup from '../../components/WishlistButtonGroup';
import QuantityButtonGroup from '../../components/QuantityButtonGroup';
import { clientDeleteAllCarts, clientDeleteCart, clientPutCart } from '../../api/clientApis';
import usePriceToTw from '../../hooks/usePriceToTw';
import { useDispatch } from 'react-redux';
import { deleteCart, removeCarts } from '../../store/slice/cartSlice';
import useMessage from '../../hooks/useMessage';
import { removeCoupon } from '../../store/slice/couponSlice';
import { updateLoadingState } from '../../store/slice/loadingSlice';

const CartProductsSection = ({ carts, handleFetchCart }) => {
    const dispatch = useDispatch();
    const { handlePriceToTw } = usePriceToTw();
    const [loadingItems, setLoadingItems] = useState([]);
    const { inputToastMessage } = useMessage();

    const handlePutCart = async (cartId, productId, quantity) => {
        try {
            setLoadingItems([...loadingItems, cartId]);
            const data = {
                product_id: productId,
                qty: quantity,
            };
            await clientPutCart(cartId, data);
            setLoadingItems(loadingItems.filter((items) => items !== cartId));
            handleFetchCart();
        } catch (error) {
            inputToastMessage(error?.response?.data);
        }
    };

    const handleDeleteCart = (cartId, title) => {
        Swal.fire({
            title: '刪除商品?',
            text: `確認刪除「${title}」商品請按下確認`,
            icon: 'question',
            confirmButtonColor: '#111c30',
            cancelButtonColor: '#b2bec3',
            confirmButtonText: '確認',
            cancelButtonText: '取消',
            showCancelButton: true,
            showCloseButton: true,
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    return await clientDeleteCart(cartId);
                } catch (error) {
                    Swal.showValidationMessage(`請求失敗： ${error}`);
                }
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('成功', result?.value?.data?.message, 'success');
                dispatch(deleteCart());
                dispatch(removeCoupon());
                handleFetchCart();
            }
        });
    };

    const handleDeleteAllCarts = () => {
        // 嘗試過使用 useHook 但是無法透過 callback 取得按下確認的狀態 Q,Q
        Swal.fire({
            title: '刪除全部商品?',
            text: '確認刪除全部商品請按下確認',
            icon: 'question',
            confirmButtonColor: '#111c30',
            cancelButtonColor: '#b2bec3',
            confirmButtonText: '確認',
            cancelButtonText: '取消',
            showCancelButton: true,
            showCloseButton: true,
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    return await clientDeleteAllCarts();
                } catch (error) {
                    Swal.showValidationMessage(`請求失敗： ${error}`);
                }
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('成功', result?.value?.data?.message, 'success');
                dispatch(removeCarts());
                dispatch(removeCoupon());
                handleFetchCart();
            }
        });
    };

    return (
        <table className='table align-middle '>
            <thead>
                <tr>
                    <th>商品資料</th>
                    <th>單價</th>
                    <th>數量</th>
                    <th>總額</th>
                    <th>
                        <button
                            type='button'
                            className='btn btn-none fw-bolder py-0'
                            onClick={() => handleDeleteAllCarts()}
                        >
                            全部刪除
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody className='table-group-divider'>
                {carts?.map((cart) => (
                    <tr key={cart.id}>
                        <td>
                            <div className='row m-0'>
                                <div className='col-12 col-lg-4 col-xl-3 d-flex justify-content-start align-items-center p-0 '>
                                    <Link
                                        to={`/products/${cart.product_id}`}
                                        onClick={(e) => e.preventDefault()}
                                        className='cart-img-container'
                                    >
                                        <img
                                            src={cart?.product?.imageUrl}
                                            alt={cart?.product?.title}
                                            className='cart-img'
                                            title='回到商品詳情'
                                        />
                                    </Link>
                                </div>
                                <div className='col-12 col-lg-8 col-xl-9 p-0'>
                                    <div className='h-100 d-flex justify-content-center align-items-start flex-column position-relative'>
                                        <h3 className='fs-6 m-0 mt-2 pb-lg-1'>
                                            {cart?.product?.title}
                                            <WishlistButtonGroup
                                                changePosition={` cart-wishlist-icon-position `}
                                                product={cart.product} // 帶入整個商品資訊
                                                id={cart?.product?.id} // 要傳入產品 id
                                                // image={cart?.product?.imageUrl}
                                                // title={cart?.product?.title}
                                                // content={cart?.product?.content}
                                                // price={cart?.product?.price}
                                                // unit={cart?.product?.unit}
                                            />
                                        </h3>
                                        <p className='d-none d-md-block fs-7 text-muted text-ellipsis m-0 '>
                                            {cart?.product?.content}
                                        </p>
                                        <span className='pt-2'>{cart?.product?.unit}</span>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>{handlePriceToTw(cart?.product?.price)}</td>
                        <td>
                            <select
                                className='form-select'
                                value={cart.qty}
                                onChange={(e) => handlePutCart(cart.id, cart.product_id, parseInt(e.target.value))}
                                disabled={loadingItems.includes(cart.id)} // 發送請求 API 時先鎖住
                                style={{ minWidth: `80px` }}
                            >
                                {[...new Array(20)].map((_, i) => (
                                    <option value={i + 1} key={i}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                        </td>
                        <td>{handlePriceToTw(cart?.total)}</td>
                        <td className='ps-4'>
                            <button
                                type='button'
                                className='btn btn-none d-flex justify-content-center align-items-center py-2'
                                onClick={() => handleDeleteCart(cart.id, cart?.product?.title)}
                                title='移除商品'
                            >
                                <FaRegTrashAlt className='cart-icon ' />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default CartProductsSection;
