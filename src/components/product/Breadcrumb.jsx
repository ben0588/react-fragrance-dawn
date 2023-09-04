import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { changeCategory } from '../../store/slice/categorySlice';
import { memo } from 'react';
import PropTypes from 'prop-types';

const Breadcrumb = memo(function Breadcrumb({ category, title, className }) {
    const dispatch = useDispatch();

    const handleToCategory = (e) => {
        dispatch(changeCategory(category));
    };

    return (
        <nav aria-label='breadcrumb py-2'>
            <ol className={`breadcrumb ${className ? className : ''}`}>
                <li className='breadcrumb-item'>
                    <NavLink to='/products'>全部商品</NavLink>
                </li>
                {category && (
                    <li className={`breadcrumb-item `}>
                        <NavLink to={`/products`} onClick={(e) => handleToCategory(e)}>
                            {category}
                        </NavLink>
                    </li>
                )}
                {title && (
                    <li className={`breadcrumb-item active`} aria-current='page'>
                        {title}
                    </li>
                )}
            </ol>
        </nav>
    );
});

Breadcrumb.propTypes = {
    category: PropTypes.string,
    title: PropTypes.string,
    className: PropTypes.string,
};
export default Breadcrumb;
