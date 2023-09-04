import { NavLink, Outlet } from 'react-router-dom';

const AboutLayout = () => {
    return (
        <div className='container mt-5 py-3 mb-3'>
            <ul className='nav nav-tabs '>
                {[
                    { title: '品牌理念', path: '/about/' },
                    { title: '加入我們', path: '/about/joinUs' },
                    { title: '門市資訊', path: '/about/storeInfo' },
                ].map((item, index) => (
                    <li key={index} className='nav-item'>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                            style={({ isActive }) => ({ color: isActive ? 'black' : 'gray' })}
                        >
                            {item.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div className='py-4'>
                <Outlet />
            </div>
        </div>
    );
};
export default AboutLayout;
