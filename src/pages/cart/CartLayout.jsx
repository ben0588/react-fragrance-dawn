import { Outlet, useLocation } from 'react-router-dom';
import CartBreadcrumb from '../../components/cart/CartBreadcrumb';

const CartLayout = () => {
    return (
        <div className='container'>
            <CartBreadcrumb className='my-3' />
            <Outlet />
        </div>
    );
};
export default CartLayout;
