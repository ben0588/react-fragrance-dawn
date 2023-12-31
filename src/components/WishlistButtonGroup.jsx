import { useDispatch, useSelector } from 'react-redux';
import useMessage from '../hooks/useMessage';
import { addToWishlist, removeWishlist } from '../store/slice/wishListSlice';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { memo } from 'react';
import PropTypes from 'prop-types';

const WishlistButtonGroup = memo(function WishlistButtonGroup({ id, product, changePosition }) {
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
                                role="button"
                                className={`product-card-wishlist-icon ${changePosition ?? ''}`}
                                style={{ zIndex: 20, fill: '#d63031' }}
                                title="移除願望清單"
                                onClick={() => handleRemoveWish(wishData.id)}
                            />
                        );
                    } else {
                        return (
                            <AiOutlineHeart
                                key={wishData.id}
                                role="button"
                                className={`product-card-wishlist-icon ${changePosition ?? ''}`}
                                style={{ display: wishData.id === id ? 'none' : 'block' }}
                                title="加入願望清單"
                                onClick={() => handleAddToWishlist(product)}
                            />
                        );
                    }
                })
            ) : (
                <AiOutlineHeart
                    role="button"
                    className={`product-card-wishlist-icon ${changePosition ?? ''}`}
                    title="加入願望清單"
                    onClick={() => handleAddToWishlist(product)}
                />
            )}
        </span>
    );
});

WishlistButtonGroup.propTypes = {
    id: PropTypes.string.isRequired,
    product: PropTypes.object,
    changePosition: PropTypes.string,
};
export default WishlistButtonGroup;
