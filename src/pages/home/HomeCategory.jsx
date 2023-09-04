import { useEffect, useState } from 'react';
import bgImage from '../../assets/home/bg-2.webp';
import { clientFetchAllProducts } from '../../api/clientApis';
import allImage from '../../assets/home/all-3.webp';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeCategory } from '../../store/slice/categorySlice';
import { motion } from 'framer-motion';
import { useCallback } from 'react';
import useMessage from '../../hooks/useMessage';

const HomeCategory = () => {
    const [categoryList, setCategoryList] = useState([]);
    const dispatch = useDispatch();
    const { inputToastMessage } = useMessage();

    const handleFetchAllProducts = useCallback(async () => {
        try {
            const result = await clientFetchAllProducts();
            const filterCategory = result?.data?.products?.map((product) => [product.category, product.imageUrl]);
            const uniqueTexts = [];
            const filteredData = filterCategory.filter((item) => {
                if (!uniqueTexts.includes(item[0])) {
                    uniqueTexts.push(item[0]);
                    return true;
                }
                return false;
            });

            setCategoryList([...filteredData, ['全部', allImage]]);
        } catch (error) {
            inputToastMessage({ success: false, message: '發生錯誤，請重新整理或尋求客服處理' });
        }
    }, []);

    useEffect(() => {
        handleFetchAllProducts(); // 初始取得全部商品類型
    }, [handleFetchAllProducts]);

    const categoryVariants = {
        hidden: (index) => {
            return {
                x: index < 3 ? -50 : 50,
                y: index < 3 ? -50 : 50,
                opacity: 0,
            };
        },
        show: {
            opacity: 1,
            x: 0,
            y: 0,
        },
    };

    return (
        <div className='w-100 py-5 my-5' style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' }}>
            <div className='container'>
                <h2 className='home-title'>
                    更多種類<span></span>
                    <span></span>
                </h2>
            </div>

            <div className='container py-4'>
                <div className='row'>
                    {categoryList?.map((items, index) => (
                        <motion.div
                            className='col-6 col-md-4 col-xl-2 p-0'
                            key={items[0]}
                            initial='hidden'
                            whileInView='show'
                            variants={categoryVariants}
                            custom={index}
                            transition={{ duration: 0.5, delay: 0.25 }}
                        >
                            <Link
                                to={`/products`}
                                onClick={(e) => (items[0] === '全部' ? null : dispatch(changeCategory(items[0])))}
                                className='home-category-card'
                            >
                                <h4 className='home-category-card-title'>{items[0]}</h4>
                                <img
                                    src={items[1]}
                                    alt={items[0]}
                                    style={{ width: `100%`, height: `200px` }}
                                    className='object-fit-cover'
                                />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default HomeCategory;
