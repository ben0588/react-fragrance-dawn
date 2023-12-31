import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { BiCalendarHeart } from 'react-icons/bi';
import { PiWarningCircleBold } from 'react-icons/pi';
import { IoFlameSharp } from 'react-icons/io5';
import useMessage from '../../hooks/useMessage';
import { motion } from 'framer-motion';
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
                url: 'https://ben0588.github.io/react-fragrance-dawn/sale.json',
                'Content-Type': 'application/json',
            });
            setSales(result.data.slice(0, 4));
            setActivityTarget(result.data.slice(0, 4)[0]);
        } catch (error) {
            inputToastMessage({ success: false, message: '發生錯誤，請重新整理或尋求客服處理' });
        }
    }, [inputToastMessage]);

    useEffect(() => {
        handleFetchSales();
    }, [handleFetchSales]);

    const handleCopyCoupon = (code) => {
        navigator.clipboard.writeText(code).then(() => {
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
        <div className="container my-5 py-5">
            <h2 className="home-title">
                熱門活動<span></span>
                <span></span>
            </h2>

            <div className="row align-items-center">
                <div className="col-6">
                    <strong className="d-flex align-items-center justify-content-center fs-6 pb-2 pt-3">
                        <FaStar className="icon-md me-1" />
                        領取活動優惠碼
                    </strong>
                </div>
                <div className="col-6">
                    <strong className="d-flex align-items-center justify-content-center fs-6 pb-2 pt-3">
                        <BiCalendarHeart className="icon-md me-1" />
                        期間限定活動
                    </strong>
                </div>
            </div>
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <div className="row border-3 border-primary border">
                        {sales.map((item, index) => (
                            <motion.div
                                key={item.id}
                                className="col-6 m-0 p-0"
                                initial="hidden"
                                whileInView="show"
                                variants={imagesVariants}
                                custom={index}
                            >
                                <Link to="/products" className="home-activity-card-container">
                                    <h3 className="home-activity-card-title fs-6 fw-bolder p-2">
                                        <div className="d-flex align-items-center justify-content-center fs-5">
                                            {item.title}
                                            {item.title === activityTarget?.title ? (
                                                <IoFlameSharp
                                                    style={{
                                                        width: `1.2rem`,
                                                        height: `1.2rem`,
                                                        fill: '#d63031',
                                                        display: 'inline-block',
                                                    }}
                                                />
                                            ) : null}
                                        </div>

                                        <time className="d-block fs-6">{item.date}</time>
                                    </h3>
                                    <img src={item.imageUrl} alt={item.title} className="home-activity-card-image" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="row align-items-stretch">
                        <div className="d-flex align-items-center justify-content-center flex-column h-100">
                            <div className="px-4 py-4">
                                <div className="fs-3 text-center">活動舉行中：{activityTarget?.title}</div>
                                <div className="fs-3 text-ellipsis text-center">
                                    活動舉行期間：{activityTarget?.date}
                                </div>
                                <div className="d-flex align-items-center justify-content-center fs-4">
                                    優惠碼：<span className="bg-danger px-2 text-white">50%OFF</span>
                                    <button
                                        type="button"
                                        className="btn btn-danger ms-2"
                                        onClick={() => handleCopyCoupon('50%OFF')}
                                    >
                                        複製代碼
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center flex-column h-100">
                            <div className="px-4 py-4">
                                <div className="d-flex align-items-center justify-content-start mb-2">
                                    <p className="fs-5">
                                        <PiWarningCircleBold className="icon-sm" />
                                        領取優惠碼時，請注意以下注意事項：
                                    </p>
                                </div>
                                <ol className="text-ellipsis border border-2 p-3 ps-5">
                                    <li>請在使用期限內使用優惠卷，逾期作廢。</li>
                                    <li>請在使用期限內使用優惠卷，逾期作廢。</li>
                                    <li>部分優惠卷僅限制特定商品，領取後請注意。</li>
                                    <li>請在結帳的時候將代碼填寫完畢，並且按下應用。</li>
                                    <li>優惠卷每個帳號限用一次折扣。</li>
                                    <li>如有任何疑問，歡迎聯繫客服。</li>
                                </ol>
                                <Link
                                    to="/products"
                                    role="button"
                                    className="btn btn-primary btn-primary-hover border-3 border-primary  w-100 py- border"
                                >
                                    前去逛逛
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HomeActivity;
