import { NavLink, useLocation } from 'react-router-dom';
const AccountBreadcrumb = ({ className }) => {
    const location = useLocation();
    const handleCheckPath = () => location.pathname.match(/\/account\/(.*)/)?.[1];

    return (
        <nav aria-label='breadcrumb py-2'>
            <ol className={`breadcrumb ${className ? className : ''}`}>
                <li className='breadcrumb-item'>
                    <NavLink to='/' className=' '>
                        首頁
                    </NavLink>
                </li>
                {handleCheckPath() === 'orders' ? (
                    <li className='breadcrumb-item active'>我的訂單</li>
                ) : (
                    <li className='breadcrumb-item active'>帳戶中心</li>
                )}
            </ol>
        </nav>
    );
};
export default AccountBreadcrumb;
