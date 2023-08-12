import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../../node_modules/swiper/swiper-bundle.css'; // 所有 Swiper 樣式
// import '../../../node_modules/swiper/modules/navigation.min.css';
// import '../../../node_modules/swiper/modules/pagination.min.css';
// import '../../../node_modules/swiper/modules/scrollbar.min.css';
// import '../../../node_modules/swiper/modules/autoplay.min.css';
// import '../../../node_modules/swiper/modules/free-mode.min.css';
// import '../../../node_modules/swiper/modules/thumbs.min.css';

import { Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import usePriceToTw from '../../hooks/usePriceToTw';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';

import { motion } from 'framer-motion';
import { memo } from 'react';
const RecommendCarousel = memo(({ imagesList, alt }) => {
    const { handlePriceToTw } = usePriceToTw();

    const imagesVariants = {
        hidden: {
            y: 10,
            opacity: 0,
        },
        show: {
            y: -10,
            transition: {
                delay: 0.5,
            },
            opacity: 1,
        },
    };

    return (
        <div className='row flex-row flex-sm-column-reverse flex-lg-row '>
            <div className='col-12'>
                <Swiper
                    slidesPerView={5}
                    slidesPerGroup={5}
                    spaceBetween={20}
                    modules={[Pagination]}
                    autoplay={{
                        delay: 10000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    loop={true}
                    grabCursor={true}
                    pagination={{ clickable: true }}
                    className='mySwiper'
                    style={{
                        '--swiper-navigation-color': '#ffffff0',
                        '--swiper-navigation-size': '0px',
                        '--swiper-pagination-color': '#111c30',
                        '--swiper-pagination-bullet-size': '15px',
                    }}
                    breakpoints={{
                        1200: {
                            slidesPerView: 5,
                            slidesPerGroup: 5,
                            spaceBetween: 10,
                        },
                        992: {
                            slidesPerView: 4,
                            slidesPerGroup: 4,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 3,
                            slidesPerGroup: 3,
                            spaceBetween: 10,
                        },
                        320: {
                            slidesPerView: 2,
                            slidesPerGroup: 2,
                            spaceBetween: 10,
                        },
                    }}
                >
                    {imagesList?.map((item, index) => (
                        <SwiperSlide key={item.id}>
                            <div className='home-swiper-container my-4 py-4'>
                                <motion.div
                                    initial='hidden'
                                    whileInView='show'
                                    custom={index}
                                    variants={imagesVariants}
                                >
                                    <Link to={`/products/${item.id}`} className='d-block'>
                                        <div className='home-swiper-img-container'>
                                            <img src={item.imageUrl} alt={item.title} className='home-swiper-img' />
                                        </div>
                                        <div className='home-swiper-content '>
                                            <h3 className='text-ellipsis text-center fs-5 mb-0'>{item.title}</h3>
                                            <span>NT{handlePriceToTw(item.price)}</span>
                                        </div>
                                    </Link>
                                    <Link to={`/products/${item.id}`} className='home-swiper-icon-button'>
                                        <AiOutlineArrowRight className='icon-md' />
                                    </Link>
                                </motion.div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
});

export default RecommendCarousel;
