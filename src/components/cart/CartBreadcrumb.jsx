import { NavLink, useLocation } from 'react-router-dom';

const CartBreadcrumb = ({ className }) => {
    const location = useLocation();
    const handleCheckPath = () => location.pathname.match(/\/cart\/(.*)/)?.[1];

    return (
        <nav aria-label='breadcrumb py-2'>
            <ol className={`breadcrumb ${className ? className : ''}`}>
                <li className='breadcrumb-item'>
                    <NavLink to='/products'>繼續購物</NavLink>
                </li>
                <li className='breadcrumb-item'>
                    <NavLink to='/cart'>購物車</NavLink>
                </li>
                {handleCheckPath() === 'checkout' ? (
                    <li className='breadcrumb-item active'>填寫寄送資料</li>
                ) : handleCheckPath() === 'payment' ? (
                    <>
                        <li className='breadcrumb-item active'>填寫寄送資料</li>
                        <li className='breadcrumb-item active'>訂單確認 & 付款</li>
                    </>
                ) : null}
            </ol>
        </nav>
    );
};
export default CartBreadcrumb;
