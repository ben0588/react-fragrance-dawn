import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { clientFetchProduct } from '../../api/clientApis';
import useMessage from '../../hooks/useMessage';
import QuantityButtonGroup from '../../components/QuantityButtonGroup';
import WishlistButtonGroup from '../../components/WishlistButtonGroup';
import SwiperCarouselProgress from '../../components/product/ImagesSwiperCarousel';
import AccordionCollapse from '../../components/AccordionCollapse';
import Breadcrumb from '../../components/product/Breadcrumb';
import { updateLoadingState } from '../../store/slice/loadingSlice';
import { useAddToCartMutation } from '../../store/store';
import usePriceToTw from '../../hooks/usePriceToTw';

const ProductsDetailPage = () => {
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const { inputToastMessage } = useMessage();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading);
    const [categoryList, setCategoryList] = useState([]);
    const [addToCart] = useAddToCartMutation();
    const { handlePriceToTw } = usePriceToTw();

    const fetchCategory = useCallback(
        async (category) => {
            try {
                const result = await axios({
                    method: 'GET',
                    baseURL: null,
                    url: 'https://ben0588.github.io/react-fragrance-dawn/detail.json',
                    'Content-Type': 'application/json',
                });
                const newList = result?.data?.filter((item) => item.category === category);
                setCategoryList(newList[0].contents);
            } catch (error) {
                inputToastMessage(error?.response?.data);
            }
        },
        [inputToastMessage],
    );

    const fetchProduct = useCallback(async () => {
        try {
            dispatch(updateLoadingState(true));
            const result = await clientFetchProduct(id);
            fetchCategory(result.data.product.category);
            setProduct(result?.data?.product);
            dispatch(updateLoadingState(false));
        } catch (error) {
            inputToastMessage(error?.response?.data);
            dispatch(updateLoadingState(false));
        }
    }, [fetchCategory, dispatch, inputToastMessage, id]);

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
            const result = await addToCart(data);
            inputToastMessage(result.data);
        } catch (error) {
            inputToastMessage(error?.response?.data);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container my-5">
            <Breadcrumb
                category={product.category}
                title={product.title}
                className="ps-ms-0 ps-xl-0 mb-xl-4 ps-xxl-3 mb-2"
            />
            {loading.isLoading ? (
                <div>isLoading 資料加載中</div>
            ) : (
                <>
                    <div className="row g-3 mb-5">
                        <div className="col-lg-6 pe-xl-5">
                            {product.imagesUrl && (
                                <SwiperCarouselProgress
                                    imagesList={product.imagesUrl}
                                    alt={product.title}
                                    imgWidth={`100%`}
                                    imgHeight={`500px`}
                                />
                            )}
                        </div>

                        <div className="col-lg-6 position-relative px-3 py-3">
                            <WishlistButtonGroup
                                product={product}
                                id={id}
                                changePosition="change-wishlist-icon-position"
                            />
                            <h1 className="d-flex flex-column  mb-0">
                                <span className="text-primary fw-bolder fs-4">{product.title}</span>
                                <span className="text-muted fs-5 mt-2">{product.content}</span>
                            </h1>

                            <div className="fs-4 fw-bolder text-primary mt-4">NT{handlePriceToTw(product.price)}</div>
                            <span className="text-decoration-line-through text-muted fs-7">
                                建議售價：${product.origin_price}
                            </span>

                            <div
                                role="button"
                                className="fs-6 my-3 border border-2 py-2 text-center"
                                style={{ width: `100%`, maxWidth: `70px` }}
                            >
                                {product.unit}
                            </div>

                            <div className="d-flex align-items-center mb-3">
                                <QuantityButtonGroup quantity={quantity} setChange={setQuantity} />
                                <button
                                    type="button"
                                    className="btn btn-primary w-75 ms-3"
                                    onClick={handleAddToCart}
                                    disabled={isLoading}
                                >
                                    {isLoading && (
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                            aria-hidden="true"
                                        ></span>
                                    )}
                                    {isLoading ? '正在加入購物車中' : '加入購物車'}
                                </button>
                            </div>
                            <div className="d-flex flex-column border-start border-5 border-primary mb-4 mt-5 ps-2">
                                <span className="text-ellipsis">全店，滿額免運：全店滿$999元免運 (海外地區不適用)</span>
                                <span className="text-ellipsis">全店，滿額贈：消費滿$2000元贈 TEXT 品牌提袋 x1</span>
                            </div>
                            <div className="mt-3">
                                <AccordionCollapse
                                    list={[
                                        { title: '產品介紹', text: product.description },
                                        { title: '用法&用途', text: '適量噴灑於雙手脈搏處、及耳後。' },
                                        { title: '主要成分', text: '如包裝所示。' },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 mx-auto">
                        <div className="fs-4 fw-bolder my-5 text-center">
                            <span className="border-bottom border-3 border-primary">商品描述</span>
                        </div>

                        {categoryList?.map((items, index) => (
                            <div key={index}>
                                <img
                                    src={items.imageUrl}
                                    alt={items.content}
                                    className="d-block object-fit-cover mx-auto w-50"
                                />
                                <p className="fs-6 my-5">{items.content}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
export default ProductsDetailPage;
