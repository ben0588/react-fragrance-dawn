import { NavLink, Outlet } from 'react-router-dom';
import AccountBreadcrumb from '../../components/account/AccountBreadcrumb';

const AccountLayout = () => {
    return (
        <div className='container'>
            <AccountBreadcrumb className='mt-3 pb-1' />
            <div className='row'>
                <div className='col-lg-2'>
                    <ul className='nav flex-column'>
                        <li className='nav-item navbar-bg-hover '>
                            <NavLink
                                to='/account/'
                                className='d-block text-decoration-none fw-bolder ps-2 py-1'
                                style={({ isActive }) => ({ color: isActive ? '#111c30' : '#111c30ae' })}
                            >
                                帳戶中心
                            </NavLink>
                        </li>
                        <li className='nav-item navbar-bg-hover'>
                            <NavLink
                                to='/account/orders'
                                className='d-block text-decoration-none fw-bolder ps-2 py-2'
                                style={({ isActive }) => ({ color: isActive ? '#111c30' : '#111c30ae' })}
                            >
                                我的訂單
                            </NavLink>
                        </li>
                        <li className='nav-item navbar-bg-hover'>
                            <NavLink
                                to='/'
                                className='d-block text-decoration-none fw-bolder ps-2 py-2'
                                style={({ isActive }) => ({ color: isActive ? '#111c30' : '#111c30ae' })}
                            >
                                登出
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className='col-lg-10 '>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
export default AccountLayout;
