import { useState } from 'react';
import PopularCarousel from '../../components/home/PopularCarousel';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clientFetchCategoryProduct } from '../../api/clientApis';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCallback } from 'react';
import useMessage from '../../hooks/useMessage';

const HomePopular = () => {
    const [products, setProducts] = useState([]);
    const { inputToastMessage } = useMessage();

    const handleFetchProducts = useCallback(async () => {
        try {
            const result = await clientFetchCategoryProduct(1, '香水');
            setProducts(result?.data?.products);
        } catch (error) {
            inputToastMessage({ success: false, message: '發生錯誤，請重新整理或尋求客服處理' });
        }
    }, [inputToastMessage]);

    useEffect(() => {
        handleFetchProducts();
    }, [handleFetchProducts]);

    const popular = useSelector((state) => state.popular);

    return (
        <div className="container py-5 my-5">
            <h2 className="home-title ">
                熱賣商品<span></span>
                <span></span>
            </h2>
            <div className="row position-relative mt-4">
                <div className="col-lg-6">
                    <motion.div
                        className="home-popular-start-bg p-5"
                        initial={{ y: -100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                    >
                        <div className="row">
                            {Object.keys(popular).length === 0 ? null : (
                                <div className="col-md-8 bg-light rounded-3 p-3 h-100">
                                    <h3 className="fw-bolder py-2">{popular.title}</h3>
                                    <p className="text-muted py-2">{popular.content}</p>
                                    <p className="py-1">{popular.description}</p>
                                    <Link
                                        to={`/products/${popular.id}`}
                                        role="button"
                                        className="btn btn-dark btn-primary-hover w-100 mt-1 mb-5"
                                    >
                                        前去逛逛
                                    </Link>
                                </div>
                            )}
                            <div className="col-md-4"></div>
                        </div>
                    </motion.div>
                </div>
                <div className="col-lg-6">
                    <div className="home-popular-end-bg px-2">
                        <div className="row">
                            <div className="col-md-4"></div>
                            <motion.div
                                className="col-md-8 bg-light rounded-3 p-3 "
                                initial={{ y: 100, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ ease: 'easeOut', duration: 1 }}
                            >
                                <p className="fw-bolder fs-5 py-2 ">
                                    熱賣商品採用天然植物精華，不含任何有害物質，讓您放心使用
                                </p>
                                <p className="text-muted py-2">
                                    熱賣商品都有不同的香調和風格，能夠滿足不同人群的需求，無論是甜美、清新還是性感、陽剛，都能找到適合自己的香水。
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
                <div className="home-popular-card-container">
                    <PopularCarousel imagesList={products} />
                </div>
            </div>
        </div>
    );
};
export default HomePopular;
