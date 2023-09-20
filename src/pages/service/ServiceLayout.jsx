import { NavLink, Outlet } from 'react-router-dom';

const ServiceLayout = () => {
    return (
        <div className="container py-3">
            <div className="row max-auto">
                <div className="col-md-3 pb-3">
                    <ul className="nav d-flex justify-content-center align-items-center justify-content-md-start pb-3">
                        {[
                            { title: '常見問題', path: '/service/' },
                            { title: '運送說明', path: '/service/shipping' },
                            { title: '訂購需知', path: '/service/shop' },
                            { title: '退換貨政策', path: '/service/refund' },
                            { title: '聯絡我們', path: '/service/contactUs' },
                            { title: '隱私權政策', path: '/service/privacy' },
                        ].map((item, index) => (
                            <li key={index} className="nav-item w-100">
                                <NavLink
                                    to={item.path}
                                    className="nav-link link-hover"
                                    style={({ isActive }) => ({
                                        backgroundColor: isActive ? 'black' : 'white',
                                        color: isActive ? 'white' : 'black',
                                    })}
                                >
                                    {item.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-9">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
export default ServiceLayout;
