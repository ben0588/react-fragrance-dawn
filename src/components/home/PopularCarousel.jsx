import { Swiper, SwiperSlide } from 'swiper/react';
import '../../../node_modules/swiper/swiper-bundle.css'; // 所有 Swiper 樣式
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import usePriceToTw from '../../hooks/usePriceToTw';
import { useDispatch } from 'react-redux';
import { updatePopular } from '../../store/slice/popularSlice';
import { memo } from 'react';
import PropTypes from 'prop-types';

const PopularCarousel = memo(function PopularCarousel({ imagesList }) {
    const { handlePriceToTw } = usePriceToTw();

    const dispatch = useDispatch();

    const handleSlideChange = (swiper) => {
        const target = imagesList[swiper.realIndex];
        dispatch(
            updatePopular({
                id: target.id,
                content: target.content,
                description: target.description,
                title: target.title,
            }),
        );
    };

    return (
        <div className="pb-3">
            <Swiper
                direction="vertical"
                slidesPerView={1}
                slidesPerGroup={1}
                spaceBetween={15}
                modules={[Pagination]}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                loop={true}
                centeredSlides={true}
                grabCursor={true}
                pagination={{ clickable: true }}
                className="popularSwiper"
                style={{
                    '--swiper-navigation-color': '#ffffff0',
                    '--swiper-navigation-size': '0px',
                    '--swiper-pagination-color': '#111c30',
                    '--swiper-pagination-bullet-size': '10px',
                }}
                onSlideChange={handleSlideChange} // 監聽輪播切換事件
            >
                {imagesList?.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="popular-card-container my-4 py-4">
                            <Link to={`/products/${item.id}`} className="d-block ">
                                <img src={item.imageUrl} alt={item.title} className="popular-card-img" />
                                <h3 className="popular-card-title text-ellipsis text-center fw-bolder fs-5 ">
                                    {item.title}
                                </h3>
                                <span className="popular-card-price py-2">NT{handlePriceToTw(item.price)}</span>
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
});

PopularCarousel.propTypes = {
    imagesList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            category: PropTypes.string,
            content: PropTypes.string,
            description: PropTypes.string,
            imageUrl: PropTypes.string,
            imagesUrl: PropTypes.arrayOf(PropTypes.string),
            origin_price: PropTypes.number,
            price: PropTypes.number,
            title: PropTypes.string,
            unit: PropTypes.string,
        }).isRequired,
    ),
};
export default PopularCarousel;
