import recommendImg from '../../assets/home/recommend-8.png';
import { useEffect, useState } from 'react';
import { clientFetchCategoryProduct } from '../../api/clientApis';
import RecommendCarousel from '../../components/home/RecommendCarousel';
import { useCallback } from 'react';
import useMessage from '../../hooks/useMessage';

const HomeRecommend = () => {
    const [products, setProducts] = useState([]);
    const { inputToastMessage } = useMessage();

    const handleFetchProducts = useCallback(async () => {
        try {
            const result = await clientFetchCategoryProduct(1, '香水');
            setProducts(result?.data?.products);
        } catch (error) {
            inputToastMessage({ success: false, message: '發生錯誤，請重新整理或尋求客服處理' });
        }
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
