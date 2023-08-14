import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { FaStar } from 'react-icons/fa';
import { BiCalendarHeart } from 'react-icons/bi';
import { PiWarningCircleBold } from 'react-icons/pi';
import { IoFlameSharp } from 'react-icons/io5';
import useMessage from '../../hooks/useMessage';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useCallback } from 'react';

const HomeActivity = () => {
    const [sales, setSales] = useState([]);
    const [activityTarget, setActivityTarget] = useState({});
    const { inputToastMessage } = useMessage();

    const handleFetchSales = useCallback(async () => {
        try {
            const result = await axios({
                method: 'GET',
                baseURL: null,
                // url: '/src/data/sale.json',
                url: 'https://ben0588.github.io/react-fragrance-dawn/sale.json',
                'Content-Type': 'application/json',
            });
            setSales(result.data.slice(0, 4));
            setActivityTarget(result.data.slice(0, 4)[0]);
        } catch {}
    }, []);

    useEffect(() => {
        handleFetchSales();
    }, [handleFetchSales]);

    const handleCopyCoupon = (code) => {
        navigator.clipboard.writeText(code).then((text) => {
            inputToastMessage({
                success: true,
                type: 'default',
                message: `🌟 成功複製優惠碼：${code}`,
                position: 'top-left',
            });
        });
    };

    const imagesVariants = {
        hidden: (index) => {
            return {
                opacity: 0,
                x: index - 10 * 10,
            };
        },
        show: {
            opacity: 1,
            x: 0,
        },
    };

    return (
        <div className='container py-5 my-5'>
            <h2 className='home-title'>
                熱門活動<span></span>
                <span></span>
            </h2>

            <div className='row'>
                <div className='col-12 col-lg-6 text-center'>
                    <strong className='d-flex align-items-center justify-content-center fs-5 pt-3 pb-2'>
                        <BiCalendarHeart className='icon-md me-1' />
                        期間限定活動
                    </strong>
                    <div className='row border border-3 border-primary'>
                        {sales.map((item, index) => (
                            <motion.div
                                key={item.id}
                                className='home-activity-card-container col-6 p-0 m-0'
                                initial='hidden'
                                whileInView='show'
                                variants={imagesVariants}
                                custom={index}
                            >
                                <Link to='/products'>
                                    <h3 className='home-activity-card-title fs-5 fw-bolder p-2'>
                                        {item.title}
                                        <time className='d-block fs-6'>{item.date}</time>
                                        {item.title === activityTarget?.title ? (
                                            <IoFlameSharp
                                                style={{
                                                    position: 'absolute',
                                                    top: `5px`,
                                                    left: `5px`,
                                                    width: `25px`,
                                                    height: `25px`,
                                                    fill: `#d63031`,
                                                }}
                                            />
                                        ) : null}
                                    </h3>
                                    <img src={item.imageUrl} alt={item.title} className='home-activity-card-image' />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div className='col-12 col-lg-6'>
                    <strong className='d-flex align-items-center justify-content-center fs-5 pt-3 pb-2'>
                        <FaStar className='icon-md me-1' />
                        領取活動優惠碼
                    </strong>
                    <div className='row'>
                        <div className='col-12 d-flex align-items-center justify-content-center flex-column '>
                            <div className='fs-3 pt-4'>活動舉行中：{activityTarget?.title}</div>
                            <div className='fs-3 text-ellipsis text-center'>活動舉行期間：{activityTarget?.date}</div>
                            <div className='d-flex align-items-center justify-content-start fs-4 pt-2 '>
                                優惠碼：<span className='bg-danger text-white px-2'>50%OFF</span>
                                <button
                                    type='button'
                                    className='btn btn-danger ms-2'
                                    onClick={() => handleCopyCoupon('50%OFF')}
                                >
                                    複製代碼
                                </button>
                            </div>
                        </div>
                        <div className='col-12 d-flex align-items-center justify-content-center flex-column pt-5 px-4 '>
                            <div className='d-flex align-items-center justify-content-start fs-5 mb-2 '>
                                <PiWarningCircleBold className='icon-sm pt-1' />
                                <span className='text-ellipsis'>領取優惠碼時，請注意以下注意事項：</span>
                            </div>
                            <ol className='text-ellipsis border border-2 ps-4 py-2 mb-4 '>
                                <li>請在使用期限內使用優惠卷，逾期作廢。</li>
                                <li>請在使用期限內使用優惠卷，逾期作廢。</li>
                                <li>部分優惠卷僅限制特定商品，領取後請注意。</li>
                                <li>請在結帳的時候將代碼填寫完畢，並且按下應用。</li>
                                <li>優惠卷每個帳號限用一次折扣。</li>
                                <li>如有任何疑問，歡迎聯繫客服。</li>
                            </ol>
                            <Link
                                to='/products'
                                role='button'
                                className='btn btn-primary btn-primary-hover border border-3  border-primary w-75 py-1 mt-3 '
                            >
                                前去逛逛
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HomeActivity;
