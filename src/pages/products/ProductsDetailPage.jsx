import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { clientAddToCart, clientFetchProduct } from '../../api/clientApis';
import useMessage from '../../hooks/useMessage';
import QuantityButtonGroup from '../../components/QuantityButtonGroup';
import WishlistButtonGroup from '../../components/WishlistButtonGroup';
import SwiperCarouselProgress from '../../components/product/ImagesSwiperCarousel';
import AccordionCollapse from '../../components/AccordionCollapse';
import descriptionImg1 from '../../assets/productDetailImages/demo001_compressed.webp';
import descriptionImg2 from '../../assets/productDetailImages/demo005_compressed.webp';
import descriptionImg3 from '../../assets/productDetailImages/demo002_compressed.webp';
import descriptionImg4 from '../../assets/productDetailImages/demo006_compressed.webp';
import descriptionImg5 from '../../assets/productDetailImages/demo003_compressed.webp';
import { useDispatch, useSelector } from 'react-redux';
import { changeCategory } from '../../store/slice/categorySlice';
import Breadcrumb from '../../components/product/Breadcrumb';
import { addToCart } from '../../store/slice/cartSlice';
import { updateLoadingState } from '../../store/slice/loadingSlice';
import { useCallback } from 'react';

const ProductsDetailPage = () => {
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const { inputToastMessage } = useMessage();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading);

    const fetchProduct = useCallback(async () => {
        try {
            dispatch(updateLoadingState(true));
            const result = await clientFetchProduct(id);
            setProduct(result?.data?.product);
            dispatch(updateLoadingState(false));
        } catch (error) {
            inputToastMessage(error?.response?.data);
            dispatch(updateLoadingState(false));
        }
    }, []);
    useEffect(() => {
        fetchProduct();
    }, [id, fetchProduct]);

    const handleAddToCart = async () => {
        try {
            setIsLoading(true);
            const data = {
                product_id: product.id,
                qty: quantity,
            };
            const result = await clientAddToCart(data);
            dispatch(addToCart(data));
            setIsLoading(false);
            inputToastMessage(result.data);
        } catch (error) {
            inputToastMessage(error?.response?.data);
        }
    };

    const handlePriceToTw = (value) =>
        new Intl.NumberFormat('zh-TW', { style: 'currency', currency: 'TWD', minimumFractionDigits: 0 }).format(value);

    return (
        <div className='container my-5'>
            <Breadcrumb
                category={product.category}
                title={product.title}
                className='mb-2 ps-ms-0 ps-xl-0 mb-xl-4 ps-xxl-3'
            />
            {loading.isLoading ? (
                <div>isLoading 資料加載中</div>
            ) : (
                <>
                    <div className='row g-3 mb-5'>
                        <div className='col-12 col-lg-6 pe-xl-5'>
                            {product.imagesUrl && (
                                <SwiperCarouselProgress
                                    imagesList={product.imagesUrl}
                                    alt={product.title}
                                    imgWidth={`100%`}
                                    imgHeight={`500px`}
                                />
                            )}
                        </div>

                        <div className='col-12 col-lg-6 position-relative px-3 py-3 '>
                            <WishlistButtonGroup
                                product={product}
                                id={id}
                                changePosition='change-wishlist-icon-position'
                            />
                            <h1 className='d-flex flex-column  mb-0'>
                                <span className='text-primary fw-bolder fs-4'>{product.title}</span>
                                <span className='text-muted fs-5 mt-2'>{product.content}</span>
                            </h1>

                            <div className='fs-4 fw-bolder text-primary mt-4'>NT{handlePriceToTw(product.price)}</div>
                            <span className='text-decoration-line-through text-muted fs-7'>
                                建議售價：${product.origin_price}
                            </span>

                            <div
                                role='button'
                                className='fs-6 border border-2 py-2 text-center my-3'
                                style={{ width: `100%`, maxWidth: `70px` }}
                            >
                                {product.unit}
                            </div>

                            <div className='d-flex align-items-center mb-3'>
                                <QuantityButtonGroup quantity={quantity} setChange={setQuantity} />
                                <button
                                    type='button'
                                    className='btn btn-primary w-75 ms-3'
                                    onClick={handleAddToCart}
                                    disabled={isLoading}
                                >
                                    {isLoading && (
                                        <span
                                            className='spinner-border spinner-border-sm me-2'
                                            role='status'
                                            aria-hidden='true'
                                        ></span>
                                    )}
                                    {isLoading ? '正在加入購物車中' : '加入購物車'}
                                </button>
                            </div>
                            <div className='d-flex flex-column border-start border-5 border-primary ps-2 mb-4 mt-5 '>
                                <span>全店，滿額免運：全店滿$999元免運 (海外地區不適用)</span>
                                <span>全店，滿額贈：消費滿$2000元贈 TEXT 品牌提袋 x1</span>
                            </div>
                            <div className='mt-3'>
                                <AccordionCollapse description={product.description} />
                            </div>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <p className='text-center fs-4 fw-bolder  my-5'>
                            <span className='border-bottom border-3 border-primary'>商品描述</span>
                        </p>
                        <img src={descriptionImg1} alt={product.title} className='d-block w-100 object-fit-cover' />
                        <p className='text-center fs-6 my-5'>
                            這款香水猶如高聳的摩天大樓，散發著獨特而吸引人的魅力。隨著時間的推移，金色的光線灑落在室內，讓整個空間瞬間變得更加迷人。經過精心設計，香水帶來高度的細節表現，讓您感受到無與倫比的品質與品味。
                        </p>
                        <img src={descriptionImg2} alt={product.title} className='d-block w-100 object-fit-cover' />
                        <p className='text-center fs-6 my-5'>
                            每一次使用，這款香水都會帶給您舒適與輕鬆的感受。清新而怡人的香氣，讓您心情愉悅，仿佛置身於一片芬芳的花海之中。它的獨特氛圍，讓您在繁忙的日常生活中找到片刻的寧靜與放鬆。
                        </p>
                        <img src={descriptionImg3} alt={product.title} className='d-block w-100 object-fit-cover' />
                        <p className='text-center fs-6 my-5'>
                            不僅如此，這款香水還散發著自信和魅力。當您使用它時，不僅是香水，更是您個人風格的代表。這款香水將成為您的獨有標誌，讓您在人群中脫穎而出，成為吸引眼球的焦點。
                        </p>
                        <img src={descriptionImg4} alt={product.title} className='d-block w-100 object-fit-cover' />
                        <p className='text-center fs-6 my-5'>
                            這款香水產品將帶給您一場美妙的感官之旅。它的清新、乾淨與愉悅，將為您打造舒適的居家環境，同時散發出自信和魅力，讓您在每一個時刻都散發出獨特的光芒。無論是工作還是休閒，這款香水將成為您不可或缺的陪伴，讓您感受到生活的美好和滿足。
                        </p>
                        <img src={descriptionImg5} alt={product.title} className='d-block w-100 object-fit-cover' />
                    </div>
                </>
            )}
        </div>
    );
};
export default ProductsDetailPage;
