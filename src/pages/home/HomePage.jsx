import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useRef } from 'react';
import HomeBanner from './HomeBanner';
import HomeRecommend from './HomeRecommend';
import HomeCategory from './HomeCategory';

import HomeActivity from './HomeActivity';
import HomeBottomBg from './HomeBottomBg';
import HomePopular from './HomePopular';
import HomeConnection from './HomeConnection';
import { motion, useScroll } from 'framer-motion';

const HomePage = () => {
    return (
        <div className='overflow-hidden'>
            <HomeBanner />
            <HomeRecommend />
            <HomeCategory />
            <HomePopular />
            <HomeBottomBg />
            <HomeActivity />
            <HomeConnection />
            <ToastContainer
                position='bottom-right'
                autoClose={5000} // 秒數
                hideProgressBar={false} // 隱藏進度條
                newestOnTop={true} // 新產生的在上面(可堆疊)
                closeOnClick={true} // 支持點擊關閉
                rtl={false} // 內容從左到右
                pauseOnFocusLoss={false} // 畫面切換時暫停
                draggable={true} // 支持左右拖曳關閉
                pauseOnHover={false} // 滑鼠移入時暫停撥放
                theme='light' // light、dark、colored
            />
        </div>
    );
};
export default HomePage;
