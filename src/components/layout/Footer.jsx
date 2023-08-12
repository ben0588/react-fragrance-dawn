import { Link } from 'react-router-dom';
import { BsFacebook, BsYoutube, BsInstagram, BsLine, BsGithub } from 'react-icons/bs';

import ListGroup from '../ListGroup';
const Footer = () => {
    return (
        <footer>
            <div className='text-secondary p-5 ' style={{ backgroundColor: 'black' }}>
                <div className='row mx-auto px-5'>
                    <div className='col-12 col-sm-6 col-lg-2  pt-2'>
                        <ListGroup
                            title='認識我們'
                            titleClass='text-white fw-bolder'
                            list={['品牌理念', '加入我們', '門市資訊']}
                        />
                    </div>
                    <div className='col-12 col-sm-6 col-lg-2  pt-2'>
                        <ListGroup title='我的帳戶' titleClass='text-white fw-bolder' list={['追蹤訂單', '訂單紀錄']} />
                    </div>
                    <div className='col-12 col-sm-6 col-lg-2  pt-2'>
                        <ListGroup
                            title='顧客服務'
                            titleClass='text-white fw-bolder'
                            list={['常見問題', '運送說明', '訂購需知', '退換貨政策', '聯絡我們', '隱私權政策']}
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
                                    />
                                </div>
                                <button type='button' className='btn btn-secondary mt-2' style={{ width: `60px` }}>
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
