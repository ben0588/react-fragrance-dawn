import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaRegTrashAlt } from 'react-icons/fa';
import WishlistButtonGroup from '../../components/WishlistButtonGroup';
import usePriceToTw from '../../hooks/usePriceToTw';
import useMessage from '../../hooks/useMessage';
import {
    useDeleteCartMutation,
    useFetchCartsQuery,
    useRemoveCartsMutation,
    useUpdateCartMutation,
} from '../../store/store';

const CartProductsSection = () => {
    const { handlePriceToTw } = usePriceToTw();
    const [loadingItems, setLoadingItems] = useState([]);
    const { inputToastMessage } = useMessage();
    const [deleteCart] = useDeleteCartMutation();
    const [removeCarts] = useRemoveCartsMutation();
    const [updateCart] = useUpdateCartMutation();
    const { data } = useFetchCartsQuery();

    const handlePutCart = async (cartId, productId, quantity) => {
        try {
            setLoadingItems([...loadingItems, cartId]);
            const data = {
                product_id: productId,
                qty: quantity,
            };
            const result = await updateCart({ id: cartId, data }).unwrap();
            inputToastMessage({
                success: result.success,
                type: 'default',
                message: `✨ ${result.message}`,
                position: 'top-left',
            });
            setLoadingItems(loadingItems.filter((items) => items !== cartId));
        } catch (error) {
            inputToastMessage(error?.data);
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
            reverseButtons: true,
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    return await deleteCart(cartId);
                } catch (error) {
                    Swal.showValidationMessage(`請求失敗： ${error}`);
                }
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result?.value?.data?.success) {
                Swal.fire({
                    icon: 'success',
                    title: '成功',
                    text: `購物車商品${result?.value?.data?.message}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
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
            reverseButtons: true,
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    return await removeCarts();
                } catch (error) {
                    Swal.showValidationMessage(`請求失敗： ${error}`);
                }
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result?.value?.data?.success) {
                Swal.fire({
                    icon: 'success',
                    title: '成功',
                    text: `購物車商品${result?.value?.data?.message}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    };

    return (
        <div className="table-responsive">
            <table className="table align-middle">
                <thead>
                    <tr>
                        <th>商品資料</th>
                        <th>單價</th>
                        <th>數量</th>
                        <th>總額</th>
                        <th>
                            <button
                                type="button"
                                className="btn btn-none fw-bolder py-0"
                                onClick={() => handleDeleteAllCarts()}
                            >
                                全部刪除
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {data?.data?.carts?.map((cart) => (
                        <tr key={cart.id}>
                            <td>
                                <div className="row m-0">
                                    <div className="col-lg-4 col-xl-3 d-flex justify-content-start align-items-center p-0">
                                        <Link to={`/products/${cart.product_id}`} className="cart-img-container">
                                            <img
                                                src={cart?.product?.imageUrl}
                                                alt={cart?.product?.title}
                                                className="cart-img"
                                                title="查看商品詳情"
                                            />
                                        </Link>
                                    </div>
                                    <div className="col-lg-8 col-xl-9 p-0">
                                        <div className="h-100 d-flex justify-content-center align-items-start flex-column position-relative">
                                            <h3 className="fs-6 pb-lg-1 m-0 mt-2">
                                                <Link to={`/products/${cart.product_id}`} title="查看商品詳情">
                                                    {cart?.product?.title}
                                                </Link>
                                                <WishlistButtonGroup
                                                    changePosition={` cart-wishlist-icon-position `}
                                                    product={cart.product} // 帶入整個商品資訊
                                                    id={cart?.product?.id} // 要傳入產品 id
                                                />
                                            </h3>
                                            <p className="d-none d-md-block fs-7 text-muted m-0 text-ellipsis">
                                                {cart?.product?.content}
                                            </p>
                                            <span className="pt-2">{cart?.product?.unit}</span>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>{handlePriceToTw(cart?.product?.price)}</td>
                            <td>
                                <select
                                    className="form-select"
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
                            <td className="ps-4">
                                <button
                                    type="button"
                                    className="btn btn-none d-flex justify-content-center align-items-center py-2"
                                    onClick={() => handleDeleteCart(cart.id, cart?.product?.title)}
                                    title="移除商品"
                                >
                                    <FaRegTrashAlt className="cart-icon" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CartProductsSection;
