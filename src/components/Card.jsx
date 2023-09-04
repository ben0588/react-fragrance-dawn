import { Link } from 'react-router-dom';
import { BsBag } from 'react-icons/bs';
import { clientAddToCart } from '../api/clientApis';
import useMessage from '../hooks/useMessage';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addToCart } from '../store/slice/cartSlice';
import WishlistButtonGroup from './WishlistButtonGroup';
import { memo } from 'react';
import PropTypes from 'prop-types';
import { useAddToCartMutation } from '../store/store';

const Card = memo(function Card({ product }) {
    const [isLoading, setIsLoading] = useState(false);
    const { inputToastMessage } = useMessage();
    const dispatch = useDispatch();
    const [addToCart, addToCartResult] = useAddToCartMutation();

    const handleAddToCart = async () => {
        try {
            setIsLoading(true);
            const data = {
                product_id: product.id,
                qty: 1,
            };
            const result = await addToCart(data);
            // const result = await clientAddToCart(data);
            // dispatch(addToCart(data));
            inputToastMessage(result.data);
        } catch (error) {
            inputToastMessage(error?.response?.data);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='card border-light h-100 '>
            <div className='product-card-img-container '>
                <Link to={`/products/${product.id}`}>
                    <img
                        src={product.imageUrl}
                        className='card-img-top product-card-img object-fit-cover'
                        alt={product.title}
                        style={{ height: `300px` }}
                    />
                </Link>

                <button
                    role='button'
                    className='product-card-button-container'
                    onClick={handleAddToCart}
                    title='加入購物車'
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div
                            className='spinner-grow product-card-icon'
                            role='status'
                            style={{ backgroundColor: 'white' }}
                        ></div>
                    ) : (
                        <BsBag className='product-card-icon' />
                    )}
                </button>
            </div>

            <div className='card-body position-relative'>
                <h5 className='card-title fs-6 text-break '>
                    <Link to={`/products/${product.id}`} className='link-primary-hover text-dark'>
                        {product.title}
                    </Link>
                </h5>
                <WishlistButtonGroup product={product} id={product.id} />
                <p className='card-text text-muted fs-6 my-1 '>
                    <Link to={`/products/${product.id}`} className='link-primary-hover text-muted fs-7'>
                        {product.content}
                    </Link>
                </p>
                <p className='card-text fs-6 text-muted text-decoration-line-through user-select-none opacity-50 mt-3 mb-0'>
                    NT$ {product.origin_price}
                </p>
                <span className='card-text fs-6 fw-bolder user-select-none text-danger'>NT$ {product.price}</span>
            </div>
        </div>
    );
});

Card.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        origin_price: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
    }),
};
export default Card;
