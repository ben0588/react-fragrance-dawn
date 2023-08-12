import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineArrowUp } from 'react-icons/ai';
import Loading from '../Loading';
import Header from './Header';

const Layout = () => {
    const location = useLocation();
    const [btnShow, setBtnShow] = useState(true);
    const category = useSelector((state) => state.category);
    const search = useSelector((state) => state.search);
    const sorting = useSelector((state) => state.sorting);
    const page = useSelector((state) => state.page);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [location, category, search, sorting, page]);

    useEffect(() => {
        const showTopButton = () => (window.scrollY > 300 ? setBtnShow(true) : setBtnShow(false));
        window.addEventListener('scroll', showTopButton);

        return () => {
            window.removeEventListener('scroll', showTopButton);
        };
    }, [window.scrollY]);

    const handleGoToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <div className='container-fluid position-relative px-0' style={{ maxWidth: `100%`, width: `100%` }}>
            <Header />
            <Outlet />
            <ToastContainer bodyClassName='text-lg fw-bolder' />
            <Footer />
            <button
                type='button'
                className='top-btn position-fixed'
                style={{
                    bottom: `20px`,
                    right: `20px`,
                    display: btnShow ? 'block' : 'none',
                }}
                title='回首頂端'
                onClick={() => handleGoToTop()}
            >
                <AiOutlineArrowUp style={{ width: `20px`, height: `20px`, fill: 'white' }} />
            </button>
            <Loading />
        </div>
    );
};
export default Layout;
