import perfumeGif from '../../assets/home/perfume-min.gif';
import { Link } from 'react-router-dom';
import { RxDoubleArrowDown } from 'react-icons/rx';
import { motion } from 'framer-motion';

const HomeBanner = () => {
    const sloganVariants = {
        hidden: {
            y: 100,
            opacity: 0,
        },
        show: {
            y: 0,
            opacity: 1,
        },
    };

    return (
        <div className='container position-relative py-5 mt-5'>
            <div className='home-bg-start-container '></div>
            <motion.div
                className='home-bg-end-container '
                initial={{
                    y: -100,
                    opacity: 0,
                }}
                whileInView={{
                    y: 0,
                    opacity: 1,
                }}
            ></motion.div>
            <motion.div
                className='home-hint-icon-container'
                initial={{
                    y: -30,
                    opacity: 0,
                }}
                animate={{ y: 30, opacity: 1 }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                }}
            >
                <RxDoubleArrowDown className='icon' />
            </motion.div>

            <div className='row position-relative'>
                <div className='col-md-4 '>
                    <div className='position-absolute translate-middle-y' style={{ top: `43%`, left: `1%` }}>
                        <motion.h2
                            className=' border-bottom border-5 border-primary fw-border fs-3 pb-2'
                            initial='hidden'
                            whileInView='show'
                            variants={sloganVariants}
                        >
                            從香氛晨光開始，探索無盡的香氛世界
                        </motion.h2>

                        <motion.h3 initial='hidden' whileInView='show' variants={sloganVariants}>
                            Now begins
                        </motion.h3>
                        <motion.button
                            initial='hidden'
                            whileInView='show'
                            variants={sloganVariants}
                            className='btn btn-dark btn-lg mt-1'
                        >
                            <Link to='/products ' role='button' className='text-white text-decoration-none'>
                                一探精彩
                            </Link>
                        </motion.button>
                    </div>
                </div>

                <div className='col-md-4 px-0'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <img src={perfumeGif} alt={'香氛晨光香水相關購物中心'} className='home-banner-image' />
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='home-activity-container p-3'>
                        <p>
                            「香氛晨光」的理念是希望透過香氛，為每個人帶來美好的晨光，我們的產品不只是單純的香水，更是一種能夠為您帶來美好情感體驗的產品。
                        </p>
                        <p>我們希望透過「香氛晨光」，讓每個人都能夠在生活中找到屬於自己的美好晨光。</p>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HomeBanner;
