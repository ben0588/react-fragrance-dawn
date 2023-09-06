import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { AiOutlineCheck } from 'react-icons/ai';
import { memo } from 'react';
import PropTypes from 'prop-types';

const Inner = styled.div`
    position: absolute;
    left: 50%;
    top: 37%;
    transform: translate(-50%, -50%);
    height: 3px;
    width: 155%;
    transition: all 0.3s ease-in-out;
    background-color: ${(props) => (props.$page === 'yes' ? '#000' : '#b2bec3')};
`;

const Round = styled.div`
    border-radius: 50%;
    transition: all 0.3s ease-in-out;
    background-color: ${(props) => (props.$page === 'yes' ? '#111c30' : '#fff')};
    color: ${(props) => (props.$page === 'yes' ? '#fff' : '#111c30')};
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    position: relative;
    border: 2px solid #111c30a2;
    box-shadow: 0 0 5px #111c30a2;
    font-size: 1.3rem;
    font-weight: bolder;
    opacity: ${(props) => (props.$page === 'yes' ? 1 : 0.6)};
`;

const CartBreadcrumb = memo(function CartBreadcrumb({ className }) {
    const location = useLocation();
    const [pages, setPages] = useState('1');
    const navbarList = [
        { title: '購物車', link: '/cart', page: '1' },
        { title: 'inner', page: '2' },
        { title: '建立訂單', link: '/checkout', page: '2' },
        { title: 'inner', page: '3' },
        { title: '結帳', link: '/payment', page: '3' },
    ];

    useEffect(() => {
        const check = location.pathname.match(/\/cart\/(.*)/)?.[1];
        check === 'checkout' ? setPages('2') : check === 'payment' ? setPages('3') : setPages('1');
    }, [location]);

    return (
        <nav className={className}>
            <div className="row row-cols-5">
                {navbarList.map((item, index) => (
                    <div key={index} className={`${index % 2 === 1 ? '' : 'px-0'}`}>
                        <div className="d-flex flex-column justify-content-center align-items-center position-relative h-100">
                            {index % 2 === 1 ? (
                                <>
                                    <Inner $page={item.page <= pages ? 'yes' : 'no'} />
                                </>
                            ) : (
                                <>
                                    <Round $page={item.page <= pages ? 'yes' : 'no'}>
                                        {item.page < pages ? (
                                            <AiOutlineCheck style={{ fill: item.page <= pages ? '#fff' : '#111c30' }} />
                                        ) : (
                                            item.page
                                        )}
                                    </Round>
                                    {item.title}
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </nav>
    );
});

CartBreadcrumb.propTypes = {
    className: PropTypes.string,
};
export default CartBreadcrumb;
