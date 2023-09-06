import { Outlet } from 'react-router-dom';
import CartBreadcrumb from '../../components/cart/CartBreadcrumb';

const CartLayout = () => {
    return (
        <div className="container">
            <CartBreadcrumb className="my-5" />
            <Outlet />
        </div>
    );
};
export default CartLayout;
