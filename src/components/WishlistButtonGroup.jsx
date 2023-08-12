import { useDispatch, useSelector } from 'react-redux';
import useMessage from '../hooks/useMessage';
import { addToWishlist, removeWishlist } from '../store/slice/wishListSlice';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { memo } from 'react';

const WishlistButtonGroup = memo(({ id, product, changePosition }) => {
    /*
    # 使用注意：
        - 必須帶入參數：id, title, imageUrl, content, origin_price, price, unit
        - 使用此元件的時候，外層容器記得加上 position-relative
    */
    const { inputToastMessage } = useMessage();
    const wishlist = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();

    const handleAddToWishlist = (product) => {
        dispatch(addToWishlist({ ...product }));
        inputToastMessage({ success: true, type: 'default', message: '✨ 添加願望清單成功', position: 'top-left' });
    };
    const handleRemoveWish = (id) => {
        dispatch(removeWishlist(id));
        inputToastMessage({ success: true, type: 'default', message: '🌠 移除願望清單成功', position: 'top-left' });
    };

    return (
        <span>
            {wishlist?.length ? (
                wishlist?.map?.((wishData) => {
                    if (wishData.id === id) {
                        return (
                            <AiFillHeart
                                key={wishData.id}
                                role='button'
                                className={`product-card-wishlist-icon ${changePosition ?? ''}`}
                                style={{ zIndex: 20, fill: '#d63031' }}
                                title='移除願望清單'
                                onClick={() => handleRemoveWish(wishData.id)}
                            />
                        );
                    } else {
                        return (
                            <AiOutlineHeart
                                key={wishData.id}
                                role='button'
                                className={`product-card-wishlist-icon ${changePosition ?? ''}`}
                                style={{ display: wishData.id === id ? 'none' : 'block' }}
                                title='加入願望清單'
                                onClick={() => handleAddToWishlist(product)}
                            />
                        );
                    }
                })
            ) : (
                <AiOutlineHeart
                    role='button'
                    className={`product-card-wishlist-icon ${changePosition ?? ''}`}
                    title='加入願望清單'
                    onClick={() => handleAddToWishlist(product)}
                />
            )}
        </span>
    );
});
export default WishlistButtonGroup;
