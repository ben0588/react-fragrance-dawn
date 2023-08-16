import { Link } from 'react-router-dom';
import { BsFacebook, BsYoutube, BsInstagram, BsLine, BsGithub } from 'react-icons/bs';

import ListGroup from '../ListGroup';
import { useState } from 'react';
import Swal from 'sweetalert2';
const Footer = () => {
    const [email, setEmail] = useState('');
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleSubmit = () => {
        if (email !== '' && pattern.test(email)) {
            Swal.fire({
                title: '電子報訂閱成功',
                text: `訂閱成功！稍後將會發送相關優惠通知給您，往後優惠將一併提前通知，謝謝您。`,
                icon: 'success',
                confirmButtonColor: '#111c30',
                cancelButtonColor: '#b2bec3',
                confirmButtonText: '確認',
                cancelButtonText: '取消',
                showCloseButton: true,
            });
            setEmail('');
        } else if (!pattern.test(email)) {
            Swal.fire({
                title: '電子信箱格式錯誤',
                text: `請重新填寫正確的電子信箱格式。`,
                icon: 'error',
                confirmButtonColor: '#111c30',
                cancelButtonColor: '#b2bec3',
                confirmButtonText: '確認',
                cancelButtonText: '取消',
                showCloseButton: true,
            });
        }
    };
    return (
        <footer>
            <div className='text-secondary p-5 ' style={{ backgroundColor: 'black' }}>
                <div className='row mx-auto px-5'>
                    <div className='col-12 col-sm-6 col-lg-2  pt-2'>
                        <ListGroup
                            title='認識我們'
                            titleClass='text-white fw-bolder'
                            list={[
                                { title: '品牌理念', path: '/about/' },
                                { title: '加入我們', path: '/about/joinUs' },
                                { title: '門市資訊', path: '/about/storeInfo' },
                            ]}
                        />
                    </div>
                    <div className='col-12 col-sm-6 col-lg-2  pt-2'>
                        <ListGroup
                            title='我的帳戶'
                            titleClass='text-white fw-bolder'
                            list={[
                                { title: '追蹤訂單', path: '/orderTracking' },
                                { title: '我的訂單', path: '/account/orders' },
                            ]}
                        />
                    </div>
                    <div className='col-12 col-sm-6 col-lg-2  pt-2'>
                        <ListGroup
                            title='顧客服務'
                            titleClass='text-white fw-bolder'
                            list={[
                                { title: '常見問題', path: '/service/' },
                                { title: '運送說明', path: '/service/shipping' },
                                { title: '訂購需知', path: '/service/shop' },
                                { title: '退換貨政策', path: '/service/refund' },
                                { title: '聯絡我們', path: '/service/contactUs' },
                                { title: '隱私權政策', path: '/service/privacy' },
                            ]}
                        />
                    </div>
                    <div className='col-12 col-sm-6 col-lg-2 pt-2'>
                        <ListGroup title='關注我們' titleClass='text-white fw-bolder'>
                            <li>
                                {[
                                    <BsLine className='icon-md' />,
                                    <BsFacebook className='icon-md' />,
                                    <BsInstagram className='icon-md' />,
                                    <BsYoutube className='icon-md' />,
                                ].map((item, i) => (
                                    <span className='footer-text-hover me-2' key={i}>
                                        {item}
                                    </span>
                                ))}
                            </li>
                        </ListGroup>
                        <div className='mt-4'>
                            <ListGroup title='後臺系統' titleClass='text-white fw-bolder'>
                                <li>
                                    <Link to='/admin' className='text-secondary link-primary-hover fs-7 pb-2'>
                                        前往後臺
                                    </Link>
                                </li>
                            </ListGroup>
                        </div>
                    </div>
                    <div className='col-12 col-sm-6 col-lg-4  pt-2 '>
                        <ListGroup title='訂閱電子報' titleClass='text-white fw-bolder'>
                            <li className='fs-7 text-white pb-2'>
                                <label htmlFor='footer-email-input'>輸入電子郵件得最新商品與活動</label>
                            </li>
                            <li className=''>
                                <div className='input-group '>
                                    <input
                                        type='email'
                                        id='footer-email-input'
                                        placeholder='請輸入您的電子信箱地址'
                                        className='form-control py-1 ps-1'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <button
                                    type='button'
                                    className='btn btn-secondary mt-2'
                                    style={{ width: `60px` }}
                                    onClick={() => handleSubmit()}
                                >
                                    訂閱
                                </button>
                            </li>
                        </ListGroup>
                    </div>
                </div>
            </div>
            <small className='d-flex align-items-center justify-content-center flex-column flex-lg-row text-white bg-secondary py-2 '>
                Copyright © 2023
                <Link
                    to='https://github.com/ben0588'
                    target='_blank'
                    rel='noopener noreferrer'
                    title='訪問作者GitHub連結'
                    className='d-flex align-items-center justify-content-center text-white link-primary-hover mx-2'
                >
                    Ben0588
                    <BsGithub className='icon-sm ms-2' />
                </Link>
                本網站僅供個人作品集製作，並無商業用途 !
            </small>
        </footer>
    );
};
export default Footer;
