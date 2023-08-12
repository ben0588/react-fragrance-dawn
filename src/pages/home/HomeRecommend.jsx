import recommendImg from '../../assets/home/recommend-8.png';
import { useEffect, useState } from 'react';
import { clientFetchCategoryProduct } from '../../api/clientApis';
import RecommendCarousel from '../../components/home/RecommendCarousel';
import { useCallback } from 'react';

const HomeRecommend = () => {
    const [products, setProducts] = useState([]);

    const handleFetchProducts = useCallback(async () => {
        try {
            const result = await clientFetchCategoryProduct(1, '香水');
            setProducts(result?.data?.products);
        } catch {} // 因為是首頁狀態，不希望跳提示
    }, []);

    useEffect(() => {
        handleFetchProducts();
    }, [handleFetchProducts]);

    return (
        <div className='container py-5 my-5'>
            <h2 className='home-title my-4 '>
                <span></span>專屬推薦<span></span>
            </h2>
            <img src={recommendImg} alt={'專屬推薦香水'} className='home-recommend-image ' />
            <RecommendCarousel imagesList={products} />
        </div>
    );
};
export default HomeRecommend;
