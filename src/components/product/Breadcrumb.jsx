import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { changeCategory } from '../../store/slice/categorySlice';
import { memo } from 'react';

const Breadcrumb = memo(({ category, title, className }) => {
    const dispatch = useDispatch();
    const categoryRedux = useSelector((state) => state.category);

    const handleToCategory = (e) => {
        // e.preventDefault();
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
export default Breadcrumb;
