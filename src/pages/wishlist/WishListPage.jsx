import { useDispatch, useSelector } from 'react-redux';
import { removeAllWishlist, removeWishlist } from '../../store/slice/wishListSlice';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useMessage from '../../hooks/useMessage';
import listImage from '../../assets/account/list.png';
import { useState } from 'react';
import { useAddToCartMutation } from '../../store/store';

const AccountWishListPage = () => {
    const [isLoadingId, setIsLoadingId] = useState('');
    const wishlistRedux = useSelector((state) => state.wishlist);
    const { inputToastMessage } = useMessage();
    const dispatch = useDispatch();
    const [addToCart] = useAddToCartMutation();

    const handleDeleteWish = (cartId, title) => {
        Swal.fire({
            title: '移除追蹤?',
            text: `確定移除「${title}」追蹤請按下確認`,
            icon: 'question',
            confirmButtonColor: '#111c30',
            cancelButtonColor: '#b2bec3',
            confirmButtonText: '確認',
            cancelButtonText: '取消',
            showCancelButton: true,
            showCloseButton: true,
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(removeWishlist(cartId));
                inputToastMessage({
                    success: true,
                    type: 'default',
                    message: '🌠 移除願望清單成功',
                    position: 'top-left',
                });
            }
        });
    };

    const handleDeleteAllWishList = () => {
        Swal.fire({
            title: '移除全部追蹤?',
            text: '確認移除全部追蹤請按下確認',
            icon: 'question',
            confirmButtonColor: '#111c30',
            cancelButtonColor: '#b2bec3',
            confirmButtonText: '確認',
            cancelButtonText: '取消',
            showCancelButton: true,
            showCloseButton: true,
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(removeAllWishlist());
                inputToastMessage({
                    success: true,
                    type: 'default',
                    message: '🌌 移除所有願望清單成功',
                    position: 'top-left',
                });
            }
        });
    };

    const handleAddToCart = async (id) => {
        try {
            setIsLoadingId(id);
            const data = {
                product_id: id,
                qty: 1,
            };
            const result = await addToCart(data);
            inputToastMessage(result.data);
        } catch (error) {
            inputToastMessage(error?.response?.data);
        } finally {
            setIsLoadingId('');
        }
    };

    return (
        <div className="container py-3 mb-3">
            {wishlistRedux.length ? (
                <div className="table-responsive">
                    <table className="table align-middle">
                        <thead>
                            <tr>
                                <th colSpan={2}>追蹤商品資訊</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th colSpan={2} className="text-center">
                                    <button onClick={() => handleDeleteAllWishList()} className="btn btn-none">
                                        清除所有追蹤
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {wishlistRedux?.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <div className="cart-img-container">
                                            <Link to={`/products/${product.id}`}>
                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.title}
                                                    style={{ width: `100%` }}
                                                    className="cart-img"
                                                    title="查看商品詳情"
                                                />
                                            </Link>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content-center align-items-start flex-column">
                                            <span>{product.title}</span>
                                            <span className="text-muted fs-7">{product.content}</span>
                                            <span className="text-muted fs-7">{product.unit}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content-center align-items-start flex-column">
                                            <span className="text-muted fs-7 text-decoration-line-through">
                                                NT{product.origin_price}
                                            </span>
                                            <span className="text-primary fs-7 fw-bolder">NT{product.price}</span>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-primary btn-primary-hover"
                                            title="加入購物車"
                                            onClick={() => handleAddToCart(product.id)}
                                            disabled={product.id === isLoadingId}
                                        >
                                            {product.id === isLoadingId ? (
                                                <>
                                                    <span
                                                        className="spinner-grow product-card-icon me-1"
                                                        aria-hidden="true"
                                                    ></span>
                                                    <span role="status">正在加入</span>
                                                </>
                                            ) : (
                                                <span>加入購物車</span>
                                            )}
                                        </button>
                                    </td>
                                    <td className="text-center">
                                        <Link
                                            to={`/products/${product.id}`}
                                            className="link-primary"
                                            title="查看商品詳情"
                                        >
                                            查看商品詳情
                                        </Link>
                                    </td>

                                    <td>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <button
                                                type="button"
                                                className="btn btn-none d-flex justify-content-center align-items-center py-2"
                                                onClick={() => handleDeleteWish(product.id, product.title)}
                                                title="移除追蹤"
                                            >
                                                <FaRegTrashAlt className="cart-icon" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="d-flex justify-content-center align-items-center flex-column text-center pt-5">
                    <p className="fs-5 p-0 m-0 mb-4">暫時無追蹤商品</p>
                    <img src={listImage} alt="追蹤清單圖片" className="opacity-50" />
                    <Link to="/products" className="link-primary py-2 mt-2">
                        去逛逛
                    </Link>
                </div>
            )}
        </div>
    );
};
export default AccountWishListPage;
