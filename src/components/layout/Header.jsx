import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { BsBookmarkHeartFill, BsXLg } from 'react-icons/bs';
import { FaBagShopping } from 'react-icons/fa6';

import logoImg from '../../assets/logo/logo_image.png';
import { useDispatch, useSelector } from 'react-redux';
import { createNavbarHeight } from '../../store/slice/navbarSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../../node_modules/swiper/swiper-bundle.css'; // 所有 Swiper 樣式
import { Navigation, Pagination } from 'swiper/modules';
import { updateBulletinState } from '../../store/slice/bulletinSlice';

const bulletinText = [
    '感謝您的支持，我們將在本月底舉行感恩回饋活動，屆時將有更多優惠等待您的到來。',
    '我們最新推出了一批優質商品，品質保證，價格實惠。現在下單還可享受折扣優惠哦！',
    '感謝您的支持，我們的會員人數已突破10萬，會員專屬優惠更多哦！',
    '為了提高客戶滿意度，我們已全面升級物流配送系統，送貨更快更準確。',
    '為了方便客戶購物，我們已全面啟用手機APP購物功能，讓您隨時隨地輕鬆購物！',
];

const Header = () => {
    const navbarRef = useRef(null);
    const headerContainerRef = useRef(null);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const bulletin = useSelector((state) => state.bulletin);

    const navbarToggle = () => {
        navbarRef.current.classList.toggle('show');
        // navbarRef.current.classList.toggle('header-navbar-show');
        dispatch(createNavbarHeight(headerContainerRef.current.offsetHeight));
    };

    useLayoutEffect(() => {
        // 初始紀錄
        dispatch(createNavbarHeight(headerContainerRef.current.offsetHeight));
    }, []);

    useEffect(() => {
        // 監控  navbar 元素高度
        const checkNavbarHeight = () => {
            if (headerContainerRef.current) {
                dispatch(createNavbarHeight(headerContainerRef.current.offsetHeight));
            }
        };
        window.addEventListener('resize', checkNavbarHeight);

        return () => window.removeEventListener('resize', checkNavbarHeight);
    }, [headerContainerRef]);

    return (
        <header className='sticky-top' ref={headerContainerRef}>
            {bulletin.open ? (
                <div className='position-relative bg-dark text-center text-white '>
                    <Swiper
                        autoplay={{
                            delay: 10000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        pagination={{ clickable: true }}
                        modules={[Pagination]}
                        loop={true}
                        grabCursor={true}
                        style={{
                            // height: `40px`,
                            width: `80%`,
                            '--swiper-navigation-color': '#0000000',
                            '--swiper-pagination-color': '#0000000',
                        }}
                    >
                        {bulletinText.map((text, index) => (
                            <SwiperSlide key={index}>
                                <div className='slide-content text-ellipsis fs-7 py-3'>{text}</div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <button
                        type='button'
                        className='d-flex justify-content-center align-items-center position-absolute top-50 end-0 translate-middle-y btn btn-none'
                        title='不再顯示公告'
                        onClick={() => dispatch(updateBulletinState(false))}
                    >
                        <BsXLg className='icon-md mx-2' style={{ fill: 'white' }} />
                    </button>
                </div>
            ) : null}
            <nav className='navbar navbar-expand-lg sticky-top bg-white border-bottom border-2 py-4' role='navigation'>
                <div className='container-fluid '>
                    <Link to='/' className='navbar-brand '>
                        <h1>
                            <span className='d-none'>香氛晨光FragranceDawn</span>
                            <img src={logoImg} alt='香氛晨光FragranceDawn' className='nav-logo-img' />
                        </h1>
                    </Link>
                    <button
                        className='navbar-toggler'
                        type='button'
                        aria-controls='navbarSupportedContent'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => navbarToggle()}
                    >
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className={`collapse navbar-collapse `} id='navbarSupportedContent' ref={navbarRef}>
                        <ul className='navbar-nav fw-bolder me-auto mb-2 mb-lg-0'>
                            {[
                                { title: '首頁', path: '/' },
                                { title: '全部商品', path: '/products' },
                                { title: '香水專欄', path: '/article' },
                                { title: '優惠', path: '/sale' },
                            ].map((item) => (
                                <li className='nav-item' key={item.title}>
                                    <NavLink to={item.path} className='nav-link' onClick={() => navbarToggle()}>
                                        {item.title}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                        <div className='d-flex '>
                            <NavLink
                                to='/cart'
                                role='button'
                                className='nav-link position-relative navbar-link-hover me-2 py-3 px-2'
                                style={({ isActive }) => ({ opacity: isActive ? 1 : 0.8 })}
                                onClick={() => navbarToggle()}
                                aria-label='前往購物車頁面'
                            >
                                <FaBagShopping className='navbar-icon' />
                                {cart.length ? (
                                    <span className='position-absolute top-25 start-75 translate-middle badge rounded-pill bg-danger'>
                                        {cart.length}
                                        <span className='visually-hidden'>當前購物車共有{cart.length}筆</span>
                                    </span>
                                ) : null}
                            </NavLink>
                            <NavLink
                                to='/wishlist'
                                role='button'
                                className='nav-link navbar-link-hover me-2 py-3 px-2'
                                style={({ isActive }) => ({ opacity: isActive ? 1 : 0.8 })}
                                onClick={() => navbarToggle()}
                                aria-label='前往願望追蹤清單頁面'
                            >
                                <BsBookmarkHeartFill className='navbar-icon' />
                            </NavLink>

                            <NavLink
                                to='/account'
                                role='button'
                                className='nav-link navbar-link-hover me-4  py-3 px-2'
                                style={({ isActive }) => ({ opacity: isActive ? 1 : 0.8 })}
                                onClick={() => navbarToggle()}
                                aria-label='前往個人帳戶頁面'
                            >
                                <FaUserCircle className='navbar-icon' />
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};
export default Header;
