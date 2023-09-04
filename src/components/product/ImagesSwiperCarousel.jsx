import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import '../../../node_modules/swiper/swiper-bundle.css'; // 所有 Swiper 樣式
import { Pagination } from 'swiper/modules';
import { memo } from 'react';
import PropTypes from 'prop-types';

const ImagesSwiperCarousel = memo(function ImagesSwiperCarousel({ imagesList, alt }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div className='row flex-row flex-sm-column-reverse flex-lg-row '>
            <div className='d-none d-sm-block col-md-12 col-lg-12 col-xl-3  ps-sm-2 ps-lg-1 ps-xl-4 ps-xxl-0 '>
                <Swiper
                    onSwiper={setThumbsSwiper} // 使用 onSwiper 綁定
                    slidesPerView={5}
                    spaceBetween={10}
                    freeMode={true}
                    watchSlidesProgress={true}
                    className='thumbs-swiper-container ms-sm-1 ms-lg-0' // 直接修改此樣式
                    breakpoints={{
                        768: {
                            //  >= width
                            slidesPerView: 5,
                        },
                    }}
                >
                    {imagesList?.map((item, index) => (
                        <SwiperSlide key={index} className='thumbs-swiper my-sm-2 my-xl-0 mb-xl-2 ms-xl-2 ms-xxl-4  '>
                            <img src={item} alt={alt} className='thumbs-swiper-img d-block object-fit-cover' />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className='col-md-12 col-lg-12 col-xl-9 px-lg-1'>
                <Swiper
                    slidesPerView={1}
                    slidesPerGroup={1}
                    modules={[Pagination]}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    grabCursor={true}
                    pagination={{ clickable: true }}
                    className='mySwiper'
                    thumbs={{ swiper: thumbsSwiper }}
                    style={{
                        '--swiper-navigation-color': '#111c30',
                        '--swiper-navigation-size': '35px',
                        '--swiper-pagination-color': '#111c30',
                        '--swiper-pagination-bullet-size': '10px',
                    }}
                    onInit={(swiper) => {
                        // 因原本前後會連觸發兩次，故改成 Ref 方式觸發
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                        swiper.navigation.init();
                        swiper.navigation.update();
                    }}
                >
                    {imagesList?.map((item, index) => (
                        <SwiperSlide key={item}>
                            <img src={item} alt={alt} className='swiper-img' />
                        </SwiperSlide>
                    ))}
                    <div ref={prevRef} className='swiper-button-prev'></div>
                    <div ref={nextRef} className='swiper-button-next'></div>
                </Swiper>
            </div>
        </div>
    );
});

ImagesSwiperCarousel.propTypes = {
    imagesList: PropTypes.arrayOf(PropTypes.string),
    alt: PropTypes.string,
};
export default ImagesSwiperCarousel;
